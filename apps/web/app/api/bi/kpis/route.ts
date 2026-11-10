import { queryDashboardKpis, seedMetric, seedProjection } from '@repo/db-erp-bi-risk';

const DEMO_TENANT = '11111111-1111-4111-8111-111111111111';

let seeded = false;

function seedDemo(tenantId: string) {
  if (seeded) return;
  seeded = true;
  const day = new Date().toISOString().slice(0, 10);
  seedMetric(tenantId, 'monthly_sales', 42_800_000_000, day);
  seedMetric(tenantId, 'cash_flow', 8_200_000_000, day);
  seedMetric(tenantId, 'overdue_ar', 6_100_000_000, day);
  seedMetric(tenantId, 'inventory_turnover', 2.4, day);
  seedMetric(tenantId, 'open_orders', 214, day);
  seedMetric(tenantId, 'sales_team_score', 74, day);
  seedProjection(tenantId, 'projection_sales_summary', 'month', {
    totalRevenue: 42_800_000_000,
    openOrders: 214,
  });
  seedProjection(tenantId, 'projection_financial_summary', 'cash', {
    netCash: 8_200_000_000,
    overdueAr: 6_100_000_000,
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const tenantId = url.searchParams.get('tenantId') ?? DEMO_TENANT;
  seedDemo(tenantId);
  return Response.json({ kpis: queryDashboardKpis(tenantId) });
}
