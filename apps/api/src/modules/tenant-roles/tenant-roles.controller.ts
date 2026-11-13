import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { TENANT_ROLES_READ, TENANT_ROLES_WRITE } from '@repo/contracts';
import { RequirePermission } from '../../decorators/access.decorator';
import { TenantGuard } from '../../guards/tenant.guard';
import type { JwtPayload } from '../auth/auth.types';
import { resolveTenantIdFromRequest } from '../tenant-users/tenant-users.controller';
import {
  createTenantRoleCommand,
  deleteTenantRoleCommand,
  listTenantRolesQuery,
  updateTenantRoleCommand,
} from '../../application/tenant-roles/tenant-roles.handlers';

@Controller('api/v1/tenant/roles')
@UseGuards(TenantGuard)
export class TenantRolesController {
  @Get()
  @RequirePermission(TENANT_ROLES_READ)
  async list(@Req() req: Request & { user?: JwtPayload }) {
    return listTenantRolesQuery(resolveTenantIdFromRequest(req));
  }

  @Post()
  @RequirePermission(TENANT_ROLES_WRITE)
  async create(@Req() req: Request & { user?: JwtPayload }, @Body() body: Record<string, unknown>) {
    const tenantId = resolveTenantIdFromRequest(req);
    const permissions = Array.isArray(body.permissions)
      ? (body.permissions as string[])
      : String(body.permissions ?? '')
          .split(',')
          .map((p) => p.trim())
          .filter(Boolean);
    return createTenantRoleCommand(tenantId, {
      code: String(body.code ?? 'ROLE'),
      name: String(body.name ?? 'نقش جدید'),
      permissions,
    });
  }

  @Patch(':id')
  @RequirePermission(TENANT_ROLES_WRITE)
  async patch(
    @Req() req: Request & { user?: JwtPayload },
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
  ) {
    const tenantId = resolveTenantIdFromRequest(req);
    const permissions = body.permissions
      ? Array.isArray(body.permissions)
        ? (body.permissions as string[])
        : String(body.permissions)
            .split(',')
            .map((p) => p.trim())
            .filter(Boolean)
      : undefined;
    return updateTenantRoleCommand(tenantId, id, {
      name: body.name ? String(body.name) : undefined,
      permissions,
    });
  }

  @Delete(':id')
  @RequirePermission(TENANT_ROLES_WRITE)
  async remove(@Req() req: Request & { user?: JwtPayload }, @Param('id') id: string) {
    return deleteTenantRoleCommand(resolveTenantIdFromRequest(req), id);
  }
}
