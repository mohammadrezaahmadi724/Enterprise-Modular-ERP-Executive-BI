import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import {
  TENANT_ROLES_READ,
  TENANT_USERS_READ,
} from '@repo/contracts';
import { RequirePermission } from '../../decorators/access.decorator';
import { TenantGuard } from '../../guards/tenant.guard';
import type { JwtPayload } from '../auth/auth.types';
import { resolveTenantIdFromRequest } from '../tenant-users/tenant-users.controller';
import { rbacCatalogQuery } from '../../application/tenant-rbac/tenant-rbac.handlers';

@Controller('api/v1/tenant/rbac')
@UseGuards(TenantGuard)
export class TenantRbacController {
  @Get('catalog')
  @RequirePermission(TENANT_ROLES_READ)
  async catalog(@Req() req: Request & { user?: JwtPayload }) {
    const tenantId = resolveTenantIdFromRequest(req);
    return rbacCatalogQuery(tenantId);
  }

  @Get('me')
  @RequirePermission(TENANT_USERS_READ)
  async me(@Req() req: Request & { user?: JwtPayload }) {
    const user = req.user;
    return {
      userId: user?.sub,
      permissions: user?.permissions ?? [],
      tenantId: resolveTenantIdFromRequest(req),
    };
  }
}
