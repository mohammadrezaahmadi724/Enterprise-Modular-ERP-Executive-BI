import * as Sentry from '@sentry/node';
import { TenantContext } from '@repo/domain';

export function initSentry(): void {
  const dsn = process.env.SENTRY_DSN;
  if (!dsn) return;
  Sentry.init({ dsn, tracesSampleRate: 0.1 });
}

export function captureException(error: unknown): void {
  const ctx = TenantContext.getOrNull();
  Sentry.withScope((scope) => {
    if (ctx) {
      scope.setTag('tenant_id', ctx.tenantId);
      scope.setTag('correlation_id', ctx.correlationId);
    }
    Sentry.captureException(error);
  });
}
