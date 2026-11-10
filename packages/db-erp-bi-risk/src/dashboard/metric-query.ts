/**
 * Metric & Read-Model Query Invariant — فقط projection_* و metric_snapshots.
 */

const ALLOWED_SOURCES = new Set([
  'metric_snapshots',
  'projection_financial_summary',
  'projection_sales_summary',
  'projection_in_memory',
]);

const FORBIDDEN_OLTP = [
  'sales_orders',
  'journal_entries',
  'gl_entries',
  'employees',
  'purchase_orders',
  'stock_movements',
];

const metricStore = new Map<string, { metricCode: string; value: number; snapshotDate: string }>();
const projectionStore = new Map<string, Record<string, number>>();

export type QueryAuditEntry = { source: string; at: number };

const auditLog: QueryAuditEntry[] = [];

export function resetMetricQueryStore(): void {
  metricStore.clear();
  projectionStore.clear();
  auditLog.length = 0;
}

export function getQueryAuditLog(): QueryAuditEntry[] {
  return [...auditLog];
}

export function seedMetric(tenantId: string, metricCode: string, value: number, snapshotDate: string): void {
  metricStore.set(`${tenantId}:${metricCode}:${snapshotDate}`, { metricCode, value, snapshotDate });
}

export function seedProjection(tenantId: string, projection: string, partKey: string, value: Record<string, number>) {
  projectionStore.set(`${tenantId}:${projection}:${partKey}`, value);
}

function assertAllowedSource(source: string): void {
  if (FORBIDDEN_OLTP.some((t) => source.includes(t))) {
    throw new Error(`OLTP query forbidden for dashboard: ${source}`);
  }
  if (!ALLOWED_SOURCES.has(source) && !source.startsWith('projection_')) {
    throw new Error(`Dashboard must use read models only: ${source}`);
  }
  auditLog.push({ source, at: Date.now() });
}

export function queryDashboardKpis(tenantId: string): Record<string, number> {
  assertAllowedSource('metric_snapshots');
  const keys = [...metricStore.keys()].filter((k) => k.startsWith(`${tenantId}:`));
  const kpis: Record<string, number> = {};
  for (const k of keys) {
    const row = metricStore.get(k)!;
    kpis[row.metricCode] = row.value;
  }
  const sales = projectionStore.get(`${tenantId}:projection_sales_summary:month`);
  if (sales) {
    assertAllowedSource('projection_sales_summary');
    kpis.monthly_sales = sales.totalRevenue ?? 0;
    kpis.open_orders = sales.openOrders ?? 0;
  }
  const fin = projectionStore.get(`${tenantId}:projection_financial_summary:cash`);
  if (fin) {
    assertAllowedSource('projection_financial_summary');
    kpis.cash_flow = fin.netCash ?? 0;
    kpis.overdue_ar = fin.overdueAr ?? 0;
  }
  return kpis;
}

/** تست: شبیه‌سازی کوئری اشتباه OLTP */
export function unsafeOltpQuery(table: string): never {
  assertAllowedSource(table);
  throw new Error('unreachable');
}
