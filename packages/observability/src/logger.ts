import pino from 'pino';
import { TenantContext } from '@repo/domain';

export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  serializers: {
    err: pino.stdSerializers.err,
  },
  mixin() {
    const ctx = TenantContext.getOrNull();
    if (!ctx) return {};
    return {
      correlationId: ctx.correlationId,
      traceId: ctx.traceId,
      tenantId: ctx.tenantId,
    };
  },
});
