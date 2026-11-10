import {
  BadRequestException,
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TenantContext, IdempotencyConflictError } from '@repo/domain';
import {
  hashRequestBody,
  hashUploadMetadata,
  idempotencyService,
} from '../idempotency/idempotency.service';

const MUTATING = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
    const http = context.switchToHttp();
    const req = http.getRequest<{
      method: string;
      path: string;
      body: unknown;
      file?: Express.Multer.File;
      headers: Record<string, string | string[] | undefined>;
    }>();
    const res = http.getResponse<{ status: (code: number) => void }>();

    if (!MUTATING.has(req.method)) {
      return next.handle();
    }

    let idempotencyKey = req.headers['idempotency-key'];
    if (!idempotencyKey || Array.isArray(idempotencyKey)) {
      const fallback = req.headers['x-correlation-id'];
      if (typeof fallback === 'string' && fallback.length > 0) {
        idempotencyKey = fallback;
      } else {
        throw new BadRequestException('Idempotency-Key header is required');
      }
    }

    const tenantId = TenantContext.requireTenantId();
    const endpoint = req.path;
    const requestHash = req.file
      ? hashUploadMetadata({
          filename: req.file.originalname,
          size: req.file.size,
          mimetype: req.file.mimetype,
        })
      : hashRequestBody(req.body);

    let state: 'proceed' | 'cached' | 'conflict' | 'processing';
    try {
      state = await idempotencyService.begin(tenantId, idempotencyKey, endpoint, requestHash);
    } catch (err) {
      if (err instanceof IdempotencyConflictError) {
        throw new ConflictException(err.message);
      }
      throw err;
    }

    if (state === 'processing') {
      throw new ConflictException('Processing in progress');
    }

    if (state === 'cached') {
      const cached = idempotencyService.getCached(tenantId, idempotencyKey, endpoint);
      if (cached?.responseStatus) {
        res.status(cached.responseStatus);
        return of(cached.responseBody ?? { referenceId: cached.responseReferenceId });
      }
    }

    return next.handle().pipe(
      tap(async (body) => {
        const status = (res as { statusCode?: number }).statusCode ?? 200;
        await idempotencyService.complete(tenantId, idempotencyKey, endpoint, status, body);
      }),
    );
  }
}
