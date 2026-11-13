import { Controller, Get, UseGuards } from '@nestjs/common';
import { ModuleEntitlementGuard, RequireModule } from '@repo/module-sdk';
import { RequirePermission } from '../../decorators/access.decorator';
import { TenantGuard } from '../../guards/tenant.guard';
import { qcInspectionsQuery, qcOverviewQuery } from '../../application/qc/qc.handlers';

@Controller('api/v1/qc')
@UseGuards(TenantGuard, ModuleEntitlementGuard)
export class QcController {
  @Get('overview')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  overview() {
    return qcOverviewQuery();
  }

  @Get('inspections')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  inspections() {
    return qcInspectionsQuery();
  }
}
