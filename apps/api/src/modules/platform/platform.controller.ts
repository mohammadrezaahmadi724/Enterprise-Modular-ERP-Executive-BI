import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { TenantGuard } from '../../guards/tenant.guard';
import { ModuleEntitlementGuard } from '@repo/module-sdk';
import { buildMenuForTenant, setTenantModules } from './menu.service';
import {
  approveBreakGlass,
  requestBreakGlass,
} from './break-glass.service';

@Controller('api/v1/platform')
export class PlatformController {
  @Get('menu')
  @UseGuards(AuthGuard, TenantGuard)
  menu(@Param() _p: unknown, @Body() body: { tenantId?: string }) {
    const tenantId = body.tenantId ?? '11111111-1111-4111-8111-111111111111';
    return { items: buildMenuForTenant(tenantId) };
  }

  @Get('tenants/:tenantId/menu')
  @UseGuards(AuthGuard, TenantGuard)
  tenantMenu(@Param('tenantId') tenantId: string) {
    return { items: buildMenuForTenant(tenantId) };
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
  setModules(@Param('tenantId') tenantId: string, @Body() body: { codes: string[] }) {
    setTenantModules(tenantId, body.codes);
    return { tenantId, modules: body.codes };
  }
}

void ModuleEntitlementGuard;
