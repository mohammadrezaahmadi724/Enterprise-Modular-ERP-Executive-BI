import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TenantContext } from '@repo/domain';
import { platformDb } from '../prisma/platform-db';

const MUTATING = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const req = http.getRequest<{
      method: string;
      path: string;
      body?: unknown;
      ip?: string;
      route?: { path?: string };
    }>();

    if (!MUTATING.has(req.method)) return next.handle();

    const before = structuredClone(req.body ?? {});

    return next.handle().pipe(
      tap(async (responseBody) => {
        try {
          const ctx = TenantContext.getOrNull();
          if (!ctx) return;
          await platformDb.auditLog.create({
            data: {
              tenantId: ctx.tenantId,
              userId: ctx.userId,
              action: `${req.method} ${req.route?.path ?? req.path}`,
              entityType: 'http',
              entityId: req.path,
              oldValue: before as object,
              newValue: (responseBody ?? {}) as object,
              ip: req.ip ?? '0.0.0.0',
              correlationId: ctx.correlationId,
            },
          });
        } catch {
          // audit must not break primary flow in dev
        }
      }),
    );
  }
}
