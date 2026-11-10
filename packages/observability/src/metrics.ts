import client from 'prom-client';

client.collectDefaultMetrics({ prefix: 'erp_' });

export const httpRequestDuration = new client.Histogram({
  name: 'erp_http_request_duration_seconds',
  help: 'مدت زمان درخواست HTTP',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.05, 0.1, 0.25, 0.5, 1, 2, 5],
});

export const outboxPendingGauge = new client.Gauge({
  name: 'erp_outbox_pending_events',
  help: 'تعداد رویدادهای Pending در Outbox',
});

export function getMetricsText(): Promise<string> {
  return client.register.metrics();
}
