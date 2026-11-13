import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ModuleEntitlementGuard, RequireModule } from '@repo/module-sdk';
import { AuthGuard } from '../../guards/auth.guard';
import { TenantGuard } from '../../guards/tenant.guard';
import {
  dashboardKpisQuery,
  evaluateRisksCommand,
  listRiskFindingsQuery,
} from '../../application/bi/bi.handlers';

@Controller('api/v1/bi')
@UseGuards(AuthGuard, TenantGuard, ModuleEntitlementGuard)
export class BiController {
  @Get('kpis/:tenantId')
  @RequireModule('bi-risk-base')
  kpis(@Param('tenantId') tenantId: string) {
    return dashboardKpisQuery(tenantId);
  }

  @Get('risk/:tenantId')
  @RequireModule('bi-risk-base')
  risk(@Param('tenantId') tenantId: string) {
    return listRiskFindingsQuery(tenantId);
  }

  @Post('risk/evaluate')
  @RequireModule('bi-risk-base')
  evaluate(@Body() body: { tenantId?: string; inputs: { ruleCode: string; value?: number }[] }) {
    return evaluateRisksCommand(body.inputs ?? [], body.tenantId);
  }
}
