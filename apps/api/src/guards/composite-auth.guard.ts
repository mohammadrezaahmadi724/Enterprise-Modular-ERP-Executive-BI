import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/access.decorator';
import { authService } from '../modules/auth/auth.service';
import type { JwtPayload } from '../modules/auth/auth.types';
import { resolveDevUserFromHeaders } from '../modules/auth/permission-resolver.service';

const DEMO_TENANT = '11111111-1111-4111-8111-111111111111';

@Injectable()
export class CompositeAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic =
      this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? false;
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request & { user?: JwtPayload }>();
    const auth = req.headers.authorization;
    const cookieToken = (req as Request & { cookies?: Record<string, string> }).cookies?.access_token;
    const token = auth?.startsWith('Bearer ') ? auth.slice(7) : cookieToken;

    if (!token && process.env.NODE_ENV === 'development') {
      const userId = req.headers['x-user-id'] as string | undefined;
      const tenantId = (req.headers['x-tenant-id'] as string) || DEMO_TENANT;
      const superAdminHeader = req.headers['x-super-admin'] === 'true';
      if (!userId && !superAdminHeader) {
        // dev بدون هدر — رد
      } else if (userId || superAdminHeader) {
      const resolvedUserId = userId || '00000000-0000-4000-8000-000000000001';
      const { permissions, isSuperAdmin } = await resolveDevUserFromHeaders({
        userId: resolvedUserId,
        tenantId,
        superAdminHeader,
      });
      req.user = {
        sub: resolvedUserId,
        email: 'dev@local',
        isSuperAdmin,
        permissions,
        tenantId,
      };
      return true;
      }
    }
    if (!token) throw new UnauthorizedException();
    try {
      const payload = authService.verifyAccessToken(token);
      req.user = await authService.hydrateTokenPermissions(payload);
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
