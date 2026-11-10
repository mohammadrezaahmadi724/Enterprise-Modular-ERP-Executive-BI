import { context, propagation, trace, SpanStatusCode, type Span } from '@opentelemetry/api';
import { TenantContext } from '@repo/domain';

/** راه‌اندازی سبک tracing — exporter واقعی در محیط با OTEL_EXPORTER_OTLP_ENDPOINT */
export function initTracing(serviceName = process.env.OTEL_SERVICE_NAME ?? 'erp-platform'): void {
  void serviceName;
  // در Wave 0 فقط API span استفاده می‌شود؛ SDK کامل در deploy pipeline تنظیم می‌شود.
}

export function startSpan(name: string, attributes: Record<string, string> = {}): Span {
  const tracer = trace.getTracer('erp');
  const ctx = TenantContext.getOrNull();
  const attrs = {
    ...attributes,
    ...(ctx
      ? {
          'erp.correlation_id': ctx.correlationId,
          'erp.trace_id': ctx.traceId,
          'erp.tenant_id': ctx.tenantId,
        }
      : {}),
  };
  return tracer.startSpan(name, { attributes: attrs });
}

export function injectTraceHeaders(carrier: Record<string, string>): void {
  propagation.inject(context.active(), carrier);
}

export function extractTraceHeaders(carrier: Record<string, string>): void {
  const extracted = propagation.extract(context.active(), carrier);
  context.with(extracted, () => undefined);
}

export function getActiveTraceId(): string | undefined {
  const span = trace.getActiveSpan();
  return span?.spanContext().traceId;
}

export function recordSpanError(span: Span, err: unknown): void {
  span.setStatus({ code: SpanStatusCode.ERROR });
  span.recordException(err instanceof Error ? err : new Error(String(err)));
}

/** شبیه‌ساز زنجیره HTTP → Queue → Worker → Event Bus برای تست propagation */
export function propagateTraceThroughPipeline(initialTraceId: string): string {
  const carrier: Record<string, string> = { traceparent: `00-${initialTraceId}-0000000000000001-01` };
  extractTraceHeaders(carrier);
  const workerCarrier: Record<string, string> = {};
  injectTraceHeaders(workerCarrier);
  const eventCarrier: Record<string, string> = {};
  extractTraceHeaders(workerCarrier);
  injectTraceHeaders(eventCarrier);
  const match = eventCarrier.traceparent?.match(/^00-([a-f0-9]+)-/i);
  return match?.[1] ?? initialTraceId;
}
