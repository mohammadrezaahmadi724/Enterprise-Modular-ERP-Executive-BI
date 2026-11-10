import { createHash, randomBytes, randomUUID } from 'node:crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticator } from 'otplib';
import type { JwtPayload, SessionRecord } from './auth.types';
import { authDbLoginEnabled, authenticateDbUser } from './db-auth.service';
import { resolvePermissionsForUser } from './permission-resolver.service';

const BCRYPT_ROUNDS = 12;
const ACCESS_TTL_SEC = 15 * 60;
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type UserRecord = {
  id: string;
  tenantId: string | null;
  email: string;
  passwordHash: string;
  fullName: string;
  isSuperAdmin: boolean;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  permissions: string[];
};

const users = new Map<string, UserRecord>();
const sessions = new Map<string, SessionRecord>();
const revokedRefreshHashes = new Set<string>();
let reuseAlertFired = false;

export function resetAuthStores(): void {
  users.clear();
  sessions.clear();
  revokedRefreshHashes.clear();
  reuseAlertFired = false;
}

export function wasReuseAlertFired(): boolean {
  return reuseAlertFired;
}

function jwtSecret(): string {
  return process.env.JWT_SECRET ?? 'dev-only-change-in-production';
}

function hashRefresh(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export class AuthService {
  async register(input: {
    email: string;
    password: string;
    fullName: string;
    tenantId?: string;
  }): Promise<UserRecord> {
    const existing = [...users.values()].find((u) => u.email === input.email);
    if (existing) throw new Error('Email already registered');
    const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);
    const user: UserRecord = {
      id: randomUUID(),
      tenantId: input.tenantId ?? null,
      email: input.email,
      passwordHash,
      fullName: input.fullName,
      isSuperAdmin: false,
      twoFactorEnabled: false,
      permissions: ['platform.read'],
    };
    users.set(user.id, user);
    return user;
  }

  async login(
    email: string,
    password: string,
    ip: string,
    userAgent: string,
    totp?: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: UserRecord }> {
    if (authDbLoginEnabled()) {
      const dbUser = await authenticateDbUser(email, password);
      if (dbUser) {
        const user: UserRecord = {
          id: dbUser.id,
          tenantId: dbUser.tenantId,
          email: dbUser.email,
          passwordHash: '',
          fullName: dbUser.fullName,
          isSuperAdmin: dbUser.isSuperAdmin,
          twoFactorEnabled: false,
          permissions: dbUser.permissions,
        };
        users.set(user.id, user);
        return this.issueTokens(user, ip, userAgent);
      }
    }
    const user = [...users.values()].find((u) => u.email === email);
    if (!user) throw new Error('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new Error('Invalid credentials');
    if (user.twoFactorEnabled) {
      if (!totp || !authenticator.check(totp, user.twoFactorSecret!)) {
        throw new Error('2FA required');
      }
    }
    return this.issueTokens(user, ip, userAgent);
  }

  issueTokens(
    user: UserRecord,
    ip: string,
    userAgent: string,
  ): { accessToken: string; refreshToken: string; user: UserRecord } {
    const payload: JwtPayload = {
      sub: user.id,
      tenantId: user.tenantId ?? '',
      email: user.email,
      isSuperAdmin: user.isSuperAdmin,
      permissions: user.permissions,
    };
    const accessToken = jwt.sign(payload, jwtSecret(), { expiresIn: ACCESS_TTL_SEC });
    const refreshToken = randomBytes(48).toString('base64url');
    const session: SessionRecord = {
      id: randomUUID(),
      userId: user.id,
      refreshTokenHash: hashRefresh(refreshToken),
      expiresAt: new Date(Date.now() + REFRESH_TTL_MS),
      ip,
      userAgent,
    };
    sessions.set(session.id, session);
    return { accessToken, refreshToken, user };
  }

  verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, jwtSecret()) as JwtPayload;
  }

  async hydrateTokenPermissions(payload: JwtPayload): Promise<JwtPayload> {
    if (payload.isSuperAdmin) return payload;
    const live = await resolvePermissionsForUser(payload.sub);
    if (live.length) return { ...payload, permissions: live };
    return payload;
  }

  async refresh(refreshToken: string, ip: string, userAgent: string) {
    const hash = hashRefresh(refreshToken);
    if (revokedRefreshHashes.has(hash)) {
      for (const s of sessions.values()) {
        s.revokedAt = new Date();
      }
      reuseAlertFired = true;
      throw new Error('Refresh token reuse detected');
    }
    const session = [...sessions.values()].find(
      (s) => s.refreshTokenHash === hash && !s.revokedAt,
    );
    if (!session || session.expiresAt < new Date()) {
      throw new Error('Invalid refresh token');
    }
    session.revokedAt = new Date();
    revokedRefreshHashes.add(hash);
    const user = users.get(session.userId);
    if (!user) throw new Error('User not found');
    return this.issueTokens(user, ip, userAgent);
  }

  logout(refreshToken: string): void {
    const hash = hashRefresh(refreshToken);
    const session = [...sessions.values()].find((s) => s.refreshTokenHash === hash);
    if (session) session.revokedAt = new Date();
  }

  setup2fa(userId: string): { secret: string; otpauth: string } {
    const user = users.get(userId);
    if (!user) throw new Error('User not found');
    const secret = authenticator.generateSecret();
    user.twoFactorSecret = secret;
    return {
      secret,
      otpauth: authenticator.keyuri(user.email, 'ERP Platform', secret),
    };
  }

  verify2fa(userId: string, code: string): void {
    const user = users.get(userId);
    if (!user?.twoFactorSecret) throw new Error('2FA not configured');
    if (!authenticator.check(code, user.twoFactorSecret)) {
      throw new Error('Invalid 2FA code');
    }
    user.twoFactorEnabled = true;
  }

  getUser(userId: string): UserRecord | undefined {
    return users.get(userId);
  }

  findOrRegisterGoogleUser(profile: { email: string; name?: string; sub: string }): UserRecord {
    const existing = [...users.values()].find((u) => u.email === profile.email);
    if (existing) return existing;
    const user: UserRecord = {
      id: randomUUID(),
      tenantId: '11111111-1111-4111-8111-111111111111',
      email: profile.email,
      passwordHash: bcrypt.hashSync(randomBytes(16).toString('hex'), BCRYPT_ROUNDS),
      fullName: profile.name ?? profile.email,
      isSuperAdmin: false,
      twoFactorEnabled: false,
      permissions: ['platform.read', 'finance.read'],
    };
    users.set(user.id, user);
    return user;
  }

  seedSuperAdmin(email: string, password: string): UserRecord {
    const id = randomUUID();
    const user: UserRecord = {
      id,
      tenantId: null,
      email,
      passwordHash: bcrypt.hashSync(password, BCRYPT_ROUNDS),
      fullName: 'Super Admin',
      isSuperAdmin: true,
      twoFactorEnabled: false,
      permissions: ['*'],
    };
    users.set(id, user);
    return user;
  }
}

export const authService = new AuthService();
