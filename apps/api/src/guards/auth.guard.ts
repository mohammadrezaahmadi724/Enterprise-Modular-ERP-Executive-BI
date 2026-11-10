import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { authService } from '../modules/auth/auth.service';
import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request & { user?: unknown }>();
    const auth = req.headers.authorization;
    const cookieToken = (req as Request & { cookies?: Record<string, string> }).cookies?.access_token;
    const token = auth?.startsWith('Bearer ') ? auth.slice(7) : cookieToken;
    if (
      !token &&
      process.env.NODE_ENV === 'development' &&
      req.headers['x-super-admin'] === 'true'
    ) {
      req.user = { isSuperAdmin: true, sub: 'dev-admin' };
      return true;
    }
    if (!token) throw new UnauthorizedException();
    try {
      req.user = authService.verifyAccessToken(token);
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
