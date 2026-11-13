import { ForbiddenException } from '@nestjs/common';
import { TenantContext } from '@repo/domain';
import {
  evaluateRisks,
  listFindings,
  queryDashboardKpis,
  seedMetric,
  seedProjection,
} from '@repo/db-erp-bi-risk';

const seededTenants = new Set<string>();

export function tenantIdForBi(requested?: string): string {
  const ctx = TenantContext.get();
  if (!requested || requested === ctx.tenantId) return ctx.tenantId;
  if (ctx.isSuperAdmin) return requested;
  throw new ForbiddenException('Cross-tenant BI access denied');
}

export function ensureDemoMetrics(tenantId: string) {
  if (seededTenants.has(tenantId)) return;
  seededTenants.add(tenantId);
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

export function dashboardKpisQuery(requested?: string) {
  const tenantId = tenantIdForBi(requested);
  ensureDemoMetrics(tenantId);
  return { tenantId, kpis: queryDashboardKpis(tenantId), source: 'metric_snapshots' };
}

export function listRiskFindingsQuery(requested?: string) {
  const tenantId = tenantIdForBi(requested);
  return { tenantId, findings: listFindings(tenantId), source: 'projection_in_memory' };
}

export function evaluateRisksCommand(inputs: { ruleCode: string; value?: number }[], requested?: string) {
  const tenantId = tenantIdForBi(requested);
  return { tenantId, findings: evaluateRisks(tenantId, inputs) };
}
