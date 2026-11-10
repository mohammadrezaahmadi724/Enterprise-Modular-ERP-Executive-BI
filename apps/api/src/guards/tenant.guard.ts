import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import type { JwtPayload } from '../modules/auth/auth.types';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<{ user?: JwtPayload }>();
    const user = req.user;
    if (!user) return false;
    if (user.isSuperAdmin) return true;
    if (!user.tenantId) throw new ForbiddenException('Tenant required');
    return true;
  }
}
