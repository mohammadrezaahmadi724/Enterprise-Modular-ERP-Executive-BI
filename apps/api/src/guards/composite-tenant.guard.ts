import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TenantContext } from '@repo/domain';
import { IS_PUBLIC_KEY } from '../decorators/access.decorator';
import type { JwtPayload } from '../modules/auth/auth.types';

/** Tenant guard سراسری — سوپرادمین معاف؛ dev با JWT tenantId */
@Injectable()
export class CompositeTenantGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic =
      this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? false;
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<{ user?: JwtPayload }>();
    const user = req.user;
    if (!user) return false;
    if (user.isSuperAdmin) return true;
    if (!user.tenantId) throw new ForbiddenException('Tenant required');
    const ctx = TenantContext.getOrNull();
    if (!ctx) return user.isSuperAdmin;
    return ctx.tenantId === user.tenantId || user.isSuperAdmin;
  }
}
