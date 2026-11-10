import { describe, expect, it, beforeEach } from 'vitest';
import {
  getQueryAuditLog,
  queryDashboardKpis,
  resetMetricQueryStore,
  seedMetric,
  seedProjection,
  unsafeOltpQuery,
} from '@repo/db-erp-bi-risk';

const TENANT = '11111111-1111-4111-8111-111111111111';

beforeEach(() => resetMetricQueryStore());

describe('Metric no OLTP invariant', () => {
  it('Dashboard فقط projection_* و metric_snapshots', () => {
    seedMetric(TENANT, 'inventory_turnover', 4.2, '2025-11-01');
    seedProjection(TENANT, 'projection_sales_summary', 'month', { totalRevenue: 1_200_000_000, openOrders: 3 });
    seedProjection(TENANT, 'projection_financial_summary', 'cash', { netCash: 300_000_000, overdueAr: 90_000_000 });
    const kpis = queryDashboardKpis(TENANT);
    expect(kpis.monthly_sales).toBe(1_200_000_000);
    const sources = getQueryAuditLog().map((e) => e.source);
    expect(sources.every((s) => s.includes('projection_') || s === 'metric_snapshots')).toBe(true);
    expect(sources.some((s) => s.includes('sales_orders'))).toBe(false);
  });

  it('کوئری مستقیم OLTP ممنوع', () => {
    expect(() => unsafeOltpQuery('sales_orders')).toThrow(/OLTP/);
  });
});
