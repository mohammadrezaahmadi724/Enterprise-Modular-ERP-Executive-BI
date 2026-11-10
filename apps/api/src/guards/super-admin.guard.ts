import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { TenantContext } from '@repo/domain';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
  const header = req.headers['x-super-admin'] === 'true';
  const ctxAdmin = TenantContext.get()?.isSuperAdmin === true;
  const user = (req as Request & { user?: { isSuperAdmin?: boolean } }).user;
  if (header || ctxAdmin || user?.isSuperAdmin) return true;
  throw new ForbiddenException('Super Admin required');
  }
}
