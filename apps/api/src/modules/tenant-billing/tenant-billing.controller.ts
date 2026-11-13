import { Controller, ForbiddenException, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { TenantContext } from '@repo/domain';
import { AuthGuard } from '../../guards/auth.guard';
import { TenantGuard } from '../../guards/tenant.guard';
import type { JwtPayload } from '../auth/auth.types';
import { tenantInvoicesQuery, tenantSubscriptionQuery } from '../../application/tenant-billing/tenant-billing.handlers';

function resolveTenantId(req: Request & { user?: JwtPayload }): string {
  const user = req.user;
  const ctx = TenantContext.getOrNull();
  const headerTenant = req.headers['x-tenant-id'] as string | undefined;
  const tenantId = user?.tenantId ?? ctx?.tenantId ?? headerTenant;
  if (!tenantId) throw new ForbiddenException('Tenant required');
  if (user && !user.isSuperAdmin && user.tenantId && tenantId !== user.tenantId) {
    throw new ForbiddenException('Cross-tenant billing access denied');
  }
  return tenantId;
}

@Controller('api/v1/tenant/billing')
@UseGuards(AuthGuard, TenantGuard)
export class TenantBillingController {
  @Get('subscription')
  async subscription(@Req() req: Request & { user?: JwtPayload }) {
    const tenantId = resolveTenantId(req);
    return tenantSubscriptionQuery(tenantId);
  }

  @Get('invoices')
  async invoices(@Req() req: Request & { user?: JwtPayload }) {
    const tenantId = resolveTenantId(req);
    return tenantInvoicesQuery(tenantId);
  }
}
