import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { TenantGuard } from '../../guards/tenant.guard';
import { SuperAdminGuard } from '../../guards/super-admin.guard';
import { ModuleEntitlementGuard } from '@repo/module-sdk';
import {
  approveBreakGlass,
  requestBreakGlass,
} from './break-glass.service';
import {
  activateTenantModulesCommand,
  menuForTenantQuery,
} from '../../application/platform/platform-menu.handlers';

@Controller('api/v1/platform')
export class PlatformController {
  @Get('menu')
  @UseGuards(AuthGuard, TenantGuard)
  menu() {
    return menuForTenantQuery();
  }

  @Get('tenants/:tenantId/menu')
  @UseGuards(AuthGuard, TenantGuard)
  tenantMenu(@Param('tenantId') tenantId: string) {
    return menuForTenantQuery(tenantId);
  }

  @Post('break-glass/request')
  @UseGuards(AuthGuard)
  breakGlassRequest(@Body() body: { tenantId: string; requesterId: string; reason: string }) {
    return requestBreakGlass(body.tenantId, body.requesterId, body.reason);
  }

  @Post('break-glass/approve/:id')
  @UseGuards(AuthGuard)
  breakGlassApprove(
    @Param('id') id: string,
    @Body() body: { approverId: string; requesterId: string },
  ) {
    return approveBreakGlass(id, body.approverId, body.requesterId);
  }

  /** تست/ادمین: فعال‌سازی ماژول برای tenant */
  @Post('tenants/:tenantId/modules/test-active')
  @UseGuards(AuthGuard, SuperAdminGuard)
  setModules(@Param('tenantId') tenantId: string, @Body() body: { codes: string[] }) {
    return activateTenantModulesCommand(tenantId, body.codes ?? []);
  }
}

void ModuleEntitlementGuard;
