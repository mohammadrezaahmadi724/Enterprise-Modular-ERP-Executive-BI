import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import {
  TENANT_USERS_DEACTIVATE,
  TENANT_USERS_INVITE,
  TENANT_USERS_READ,
  TENANT_USERS_WRITE,
} from '@repo/contracts';
import { RequirePermission } from '../../decorators/access.decorator';
import { TenantGuard } from '../../guards/tenant.guard';
import type { JwtPayload } from '../auth/auth.types';
import {
  activateTenantUserCommand,
  assignTenantUserRolesCommand,
  deactivateTenantUserCommand,
  inviteTenantUserCommand,
  listTenantUsersQuery,
  patchTenantUserCommand,
} from '../../application/tenant-users/tenant-users.handlers';

const DEMO_TENANT = '11111111-1111-4111-8111-111111111111';

export function resolveTenantIdFromRequest(req: Request & { user?: JwtPayload }): string {
  const user = req.user;
  const headerTenant = req.headers['x-tenant-id'] as string | undefined;
  if (!user?.tenantId && !headerTenant) throw new ForbiddenException('Tenant required');
  if (user && !user.isSuperAdmin && user.tenantId) {
    if (headerTenant && headerTenant !== user.tenantId) {
      throw new ForbiddenException('Cross-tenant users denied');
    }
    return user.tenantId;
  }
  return headerTenant ?? DEMO_TENANT;
}

@Controller('api/v1/tenant/users')
@UseGuards(TenantGuard)
export class TenantUsersController {
  @Get()
  @RequirePermission(TENANT_USERS_READ)
  async list(@Req() req: Request & { user?: JwtPayload }) {
    const tenantId = resolveTenantIdFromRequest(req);
    return listTenantUsersQuery(tenantId);
  }

  @Post('invite')
  @RequirePermission(TENANT_USERS_INVITE)
  async invite(@Req() req: Request & { user?: JwtPayload }, @Body() body: Record<string, unknown>) {
    const tenantId = resolveTenantIdFromRequest(req);
    const perms = req.user?.permissions ?? [];
    const roleIds = Array.isArray(body.roleIds) ? (body.roleIds as string[]) : undefined;
    const customPermissions = Array.isArray(body.customPermissions)
      ? (body.customPermissions as string[])
      : undefined;
    const { user } = await inviteTenantUserCommand(
      tenantId,
      {
        email: body.email ? String(body.email) : undefined,
        fullName: body.fullName ? String(body.fullName) : undefined,
        firstName: body.firstName ? String(body.firstName) : undefined,
        lastName: body.lastName ? String(body.lastName) : undefined,
        phone: body.phone ? String(body.phone) : undefined,
        jobTitle: body.jobTitle ? String(body.jobTitle) : undefined,
        roleIds,
        customPermissions,
      },
      perms,
    );
    return { user };
  }

  @Patch(':id')
  @RequirePermission(TENANT_USERS_WRITE)
  async patch(
    @Req() req: Request & { user?: JwtPayload },
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
  ) {
    const tenantId = resolveTenantIdFromRequest(req);
    const { user } = await patchTenantUserCommand(tenantId, id, body.fullName ? String(body.fullName) : undefined);
    return { user };
  }

  @Post(':id/activate')
  @RequirePermission(TENANT_USERS_WRITE)
  async activate(@Req() req: Request & { user?: JwtPayload }, @Param('id') id: string) {
    const tenantId = resolveTenantIdFromRequest(req);
    const { user } = await activateTenantUserCommand(tenantId, id);
    return { user };
  }

  @Post(':id/deactivate')
  @RequirePermission(TENANT_USERS_DEACTIVATE)
  async deactivate(@Req() req: Request & { user?: JwtPayload }, @Param('id') id: string) {
    const tenantId = resolveTenantIdFromRequest(req);
    const perms = req.user?.permissions ?? [];
    const { user } = await deactivateTenantUserCommand(tenantId, id, perms);
    return { user };
  }

  @Patch(':id/roles')
  @RequirePermission(TENANT_USERS_WRITE)
  async roles(
    @Req() req: Request & { user?: JwtPayload },
    @Param('id') id: string,
    @Body() body: { roleIds?: string[] },
  ) {
    const tenantId = resolveTenantIdFromRequest(req);
    const perms = req.user?.permissions ?? [];
    const roleIds = body.roleIds ?? [];
    const { user } = await assignTenantUserRolesCommand(tenantId, id, roleIds, perms);
    return { user };
  }
}
