import type { NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { TenantContext } from '@repo/domain';
import { randomUUID } from 'node:crypto';

export class TenantContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const tenantId =
      (req.headers['x-tenant-id'] as string) ||
      '11111111-1111-4111-8111-111111111111';
    const userId = (req.headers['x-user-id'] as string) || '00000000-0000-4000-8000-000000000001';
  const correlationId = (req.headers['x-correlation-id'] as string) || randomUUID();
    const traceId = (req.headers['traceparent'] as string)?.split('-')[1] || randomUUID();

    const data = {
      tenantId,
      userId,
      correlationId,
      traceId,
      isSuperAdmin: req.headers['x-super-admin'] === 'true',
    };
    TenantContext.run(data, () => next());
  }
}
