import { randomUUID } from 'node:crypto';
import { BreakGlassRequiredError } from '@repo/domain';
import { PLATFORM_EVENTS } from '@repo/contracts';

export type BreakGlassRequest = {
  id: string;
  tenantId: string;
  requesterId: string;
  approverId?: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Expired';
  breakGlassSessionId?: string;
  expiresAt?: Date;
};

const requests = new Map<string, BreakGlassRequest>();
const auditLog: Array<{ action: string; requestId: string; userId: string }> = [];
const tenantNotifications: Array<{ tenantId: string; event: string }> = [];

export function resetBreakGlassStore(): void {
  requests.clear();
  auditLog.length = 0;
  tenantNotifications.length = 0;
}

export function getBreakGlassAudit() {
  return [...auditLog];
}

export function getTenantNotifications() {
  return [...tenantNotifications];
}

function ttlHours(): number {
  return Number(process.env.BREAK_GLASS_TTL_HOURS ?? 4);
}

export function requestBreakGlass(
  tenantId: string,
  requesterId: string,
  reason: string,
): BreakGlassRequest {
  // Two-person rule: دسترسی فقط پس از approve توسط شخص دوم
  const req: BreakGlassRequest = {
    id: randomUUID(),
    tenantId,
    requesterId,
    reason,
    status: 'Pending',
  };
  requests.set(req.id, req);
  auditLog.push({ action: 'REQUEST', requestId: req.id, userId: requesterId });
  tenantNotifications.push({ tenantId, event: PLATFORM_EVENTS.BREAK_GLASS_REQUESTED });
  persistBreakGlassAudit({
    tenantId,
    userId: requesterId,
    action: 'break_glass.request',
    entityId: req.id,
    newValue: { reason, status: 'Pending' },
  });
  return req;
}

export function approveBreakGlass(
  requestId: string,
  approverId: string,
  requesterId: string,
): BreakGlassRequest {
  const req = requests.get(requestId);
  if (!req) throw new Error('Request not found');
  if (req.status !== 'Pending') throw new Error('Request not pending');
  if (approverId === requesterId) {
    throw new BreakGlassRequiredError();
  }
  req.approverId = approverId;
  req.status = 'Approved';
  const sessionId = randomUUID();
  const expiresAt = new Date(Date.now() + ttlHours() * 60 * 60 * 1000);
  req.breakGlassSessionId = sessionId;
  req.expiresAt = expiresAt;
  auditLog.push({ action: 'APPROVE', requestId, userId: approverId });
  tenantNotifications.push({ tenantId: req.tenantId, event: PLATFORM_EVENTS.BREAK_GLASS_APPROVED });
  persistBreakGlassAudit({
    tenantId: req.tenantId,
    userId: approverId,
    action: 'break_glass.approve',
    entityId: requestId,
    newValue: { breakGlassSessionId: sessionId, expiresAt: expiresAt.toISOString() },
  });
  persistSensitiveAccess({
    tenantId: req.tenantId,
    superAdminId: requesterId,
    approverId,
    reason: req.reason,
    breakGlassSessionId: sessionId,
    grantedAt: new Date(),
    expiresAt,
  });
  return req;
}

export function getActiveSession(requesterId: string): string | null {
  const approved = [...requests.values()].find(
    (r) =>
      r.requesterId === requesterId &&
      r.status === 'Approved' &&
      r.breakGlassSessionId &&
      r.expiresAt &&
      r.expiresAt > new Date() &&
      r.approverId &&
      r.approverId !== requesterId,
  );
  return approved?.breakGlassSessionId ?? null;
}

function persistBreakGlassAudit(input: {
  tenantId: string;
  userId: string;
  action: string;
  entityId: string;
  newValue: object;
}): void {
  void import('../../prisma/platform-db')
    .then(({ platformDb }) =>
      platformDb.auditLog.create({
        data: {
          tenantId: input.tenantId,
          userId: input.userId,
          action: input.action,
          entityType: 'break_glass',
          entityId: input.entityId,
          newValue: input.newValue,
          ip: 'break-glass',
          correlationId: input.entityId,
        },
      }),
    )
    .catch(() => undefined);
}

function persistSensitiveAccess(input: {
  tenantId: string;
  superAdminId: string;
  approverId: string;
  reason: string;
  breakGlassSessionId: string;
  grantedAt: Date;
  expiresAt: Date;
}): void {
  void import('../../prisma/platform-db')
    .then(({ platformDb }) =>
      platformDb.sensitiveAccessLog.create({
        data: {
          tenantId: input.tenantId,
          superAdminId: input.superAdminId,
          approverId: input.approverId,
          reason: input.reason,
          breakGlassSessionId: input.breakGlassSessionId,
          grantedAt: input.grantedAt,
          expiresAt: input.expiresAt,
          accessedResources: ['erp'],
        },
      }),
    )
    .catch(() => undefined);
}

/** Super Admin بدون Break-Glass به erp_* دسترسی ندارد */
export function assertErpTenantDataAccess(opts: { isSuperAdmin: boolean; breakGlassSessionId: string | null }): void {
  if (opts.isSuperAdmin && !opts.breakGlassSessionId) {
    throw new Error('ERP_TENANT_DATA_DENIED_WITHOUT_BREAK_GLASS');
  }
}
