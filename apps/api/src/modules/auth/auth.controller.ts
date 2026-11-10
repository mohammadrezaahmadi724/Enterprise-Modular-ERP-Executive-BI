import { Body, Controller, Get, Post, Query, Res, Req } from '@nestjs/common';
import type { Request, Response } from 'express';
import { authService } from './auth.service';
import { issueCsrfToken, validateCsrf } from './csrf.service';
import { exchangeGoogleAuthCode } from './google-oauth';
import { Public } from '../../decorators/access.decorator';

@Public()
@Controller('api/v1/auth')
export class AuthController {
  @Post('register')
  async register(
    @Body() body: { email: string; password: string; fullName: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await authService.register(body);
    const tokens = authService.issueTokens(user, '0.0.0.0', 'register');
    this.setCookies(res, tokens.accessToken, tokens.refreshToken, user.id);
    return { userId: user.id, email: user.email };
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string; totp?: string },
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await authService.login(
      body.email,
      body.password,
      req.ip ?? '0.0.0.0',
      req.headers['user-agent'] ?? 'unknown',
      body.totp,
    );
    this.setCookies(res, tokens.accessToken, tokens.refreshToken, tokens.user.id);
    return { userId: tokens.user.id };
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cookies = (req as Request & { cookies?: Record<string, string> }).cookies;
    const refresh = cookies?.refresh_token;
    if (!refresh) throw new Error('No refresh token');
    const tokens = await authService.refresh(refresh, req.ip ?? '0.0.0.0', req.headers['user-agent'] ?? 'unknown');
    this.setCookies(res, tokens.accessToken, tokens.refreshToken, tokens.user.id);
    return { ok: true };
  }

  @Post('2fa/setup')
  setup2fa(@Body() body: { userId: string }) {
    return authService.setup2fa(body.userId);
  }

  @Post('2fa/verify')
  verify2fa(@Body() body: { userId: string; code: string }) {
    authService.verify2fa(body.userId, body.code);
    return { enabled: true };
  }

  @Get('google')
  googleStart() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI ?? 'http://127.0.0.1:3000/api/v1/auth/google/callback';
    if (!clientId) {
      return { configured: false, message: 'GOOGLE_CLIENT_ID در .env تنظیم نشده' };
    }
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
    });
    return { configured: true, authorizeUrl: `https://accounts.google.com/o/oauth2/v2/auth?${params}` };
  }

  @Get('google/callback')
  async googleCallback(
    @Query('code') code: string | undefined,
    @Query('error') oauthError: string | undefined,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const webBase = process.env.WEB_APP_URL ?? 'http://127.0.0.1:3001';
    const redirectUri = process.env.GOOGLE_REDIRECT_URI ?? 'http://127.0.0.1:3000/api/v1/auth/google/callback';
    if (oauthError || !code) {
      res.redirect(`${webBase}/login?error=google_oauth`);
      return;
    }
    try {
      const profile = await exchangeGoogleAuthCode(code, redirectUri);
      const user = authService.findOrRegisterGoogleUser(profile);
      const tokens = authService.issueTokens(user, req.ip ?? '0.0.0.0', req.headers['user-agent'] ?? 'google');
      this.setCookies(res, tokens.accessToken, tokens.refreshToken, user.id);
      res.redirect(`${webBase}/dashboard`);
    } catch {
      res.redirect(`${webBase}/login?error=google_token`);
    }
  }

  private setCookies(res: Response, access: string, refresh: string, sessionKey: string) {
    const secure = process.env.NODE_ENV === 'production';
    res.cookie('access_token', access, {
      httpOnly: true,
      sameSite: 'strict',
      secure,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie('refresh_token', refresh, {
      httpOnly: true,
      sameSite: 'strict',
      secure,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const csrf = issueCsrfToken(sessionKey);
    res.cookie('csrf_token', csrf, { sameSite: 'strict', secure, httpOnly: false });
  }
}

export function assertCsrf(req: Request): void {
  const cookies = (req as Request & { cookies?: Record<string, string> }).cookies ?? {};
  const sessionKey = cookies.access_token?.slice(0, 16) ?? 'anon';
  const ok = validateCsrf(sessionKey, cookies.csrf_token ?? '', req.headers['x-csrf-token'] as string);
  if (!ok) throw new Error('CSRF validation failed');
}
