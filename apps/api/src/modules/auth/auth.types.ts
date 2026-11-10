export type JwtPayload = {
  sub: string;
  tenantId: string;
  email: string;
  isSuperAdmin: boolean;
  permissions: string[];
};

export type SessionRecord = {
  id: string;
  userId: string;
  refreshTokenHash: string;
  expiresAt: Date;
  revokedAt?: Date;
  ip: string;
  userAgent: string;
};
