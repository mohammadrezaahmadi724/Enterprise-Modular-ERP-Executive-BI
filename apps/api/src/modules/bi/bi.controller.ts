import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { TenantGuard } from '../../guards/tenant.guard';
import {
  evaluateRisks,
  listFindings,
  queryDashboardKpis,
  seedMetric,
  seedProjection,
} from '@repo/db-erp-bi-risk';

const TENANT_DEFAULT = '11111111-1111-4111-8111-111111111111';

let metricsSeeded = false;
function ensureDemoMetrics(tenantId: string) {
  if (metricsSeeded) return;
  metricsSeeded = true;
  seedMetric(tenantId, 'monthly_sales', 42_800_000_000, new Date().toISOString().slice(0, 10));
  seedMetric(tenantId, 'cash_flow', 8_200_000_000, new Date().toISOString().slice(0, 10));
  seedMetric(tenantId, 'overdue_ar', 6_100_000_000, new Date().toISOString().slice(0, 10));
  seedMetric(tenantId, 'inventory_turnover', 2.4, new Date().toISOString().slice(0, 10));
  seedMetric(tenantId, 'open_orders', 214, new Date().toISOString().slice(0, 10));
  seedMetric(tenantId, 'sales_team_score', 74, new Date().toISOString().slice(0, 10));
  seedProjection(tenantId, 'projection_sales_summary', 'month', {
    totalRevenue: 42_800_000_000,
    openOrders: 214,
  });
  seedProjection(tenantId, 'projection_financial_summary', 'cash', {
    netCash: 8_200_000_000,
    overdueAr: 6_100_000_000,
  });
}

@Controller('api/v1/bi')
@UseGuards(AuthGuard, TenantGuard)
export class BiController {
  @Get('kpis/:tenantId')
  kpis(@Param('tenantId') tenantId: string) {
    ensureDemoMetrics(tenantId);
    return { kpis: queryDashboardKpis(tenantId) };
  }

  @Get('risk/:tenantId')
  risk(@Param('tenantId') tenantId: string) {
    evaluateRisks(tenantId, [
      { ruleCode: 'cash_pressure', value: 0.22 },
      { ruleCode: 'ar_overdue_90', value: 2_000_000_000 },
    ]);
    return { findings: listFindings(tenantId) };
  }

  @Post('risk/evaluate')
  evaluate(@Body() body: { tenantId?: string; inputs: { ruleCode: string; value?: number }[] }) {
    const tenantId = body.tenantId ?? TENANT_DEFAULT;
    return { findings: evaluateRisks(tenantId, body.inputs) };
  }
}
