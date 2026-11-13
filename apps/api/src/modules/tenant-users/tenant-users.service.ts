import { randomUUID } from 'node:crypto';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { PLATFORM_EVENTS, TENANT_USERS_DEACTIVATE, TENANT_USERS_INVITE } from '@repo/contracts';
import { TenantContext } from '@repo/domain';
import { platformDb } from '../../prisma/platform-db';
import { recordDomainEvent } from '../../outbox/record-domain-event';
import { assertSeatAvailable, syncSubscriptionUsedSeats } from '../tenant-rbac/tenant-seat.service';
import { createTenantRole } from '../tenant-roles/tenant-roles.service';

function inviteEmailFromPhone(phone: string, tenantId: string): string {
  const digits = phone.replace(/\D/g, '');
  return `invite+${digits}@${tenantId.slice(0, 8)}.tenant.local`;
}

export type TenantUserRow = {
  id: string;
  email: string;
  fullName: string;
  roles: string;
  roleIds: string[];
  lastLogin: string;
  status: string;
  accountStatus: string;
  invitePending: boolean;
};

function mapUser(u: {
  id: string;
  email: string;
  fullName: string;
  lastLoginAt: Date | null;
  accountStatus: string;
  userRoles: { roleId: string; role: { name: string } }[];
}): TenantUserRow {
  return {
    id: u.id,
    email: u.email,
    fullName: u.fullName,
    roles: u.userRoles.map((ur) => ur.role.name).join('، ') || '—',
    roleIds: u.userRoles.map((ur) => ur.roleId),
    lastLogin: u.lastLoginAt?.toISOString().slice(0, 10) ?? '—',
    status:
      (u.accountStatus ?? 'Active') === 'Active'
        ? u.email.includes('.tenant.local') || u.email.startsWith('invite+')
          ? 'دعوت ارسال‌شده'
          : 'فعال'
        : 'معلق',
    accountStatus: u.accountStatus ?? 'Active',
    invitePending: u.email.includes('.tenant.local') || u.email.startsWith('invite+'),
  };
}

const includeRoles = { userRoles: { include: { role: true } } };

export async function listTenantUsers(tenantId: string): Promise<TenantUserRow[]> {
  const rows = await platformDb.user.findMany({
    where: { tenantId, isSuperAdmin: false },
    include: includeRoles,
    orderBy: { fullName: 'asc' },
    take: 500,
  });
  return rows.map(mapUser);
}

export async function inviteTenantUser(
  tenantId: string,
  input: {
    email?: string;
    fullName?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    jobTitle?: string;
    roleIds?: string[];
    customPermissions?: string[];
  },
  actorPermissions: string[],
): Promise<TenantUserRow> {
  if (!actorPermissions.includes('*') && !actorPermissions.includes(TENANT_USERS_INVITE)) {
    throw new ForbiddenException('tenant.users.invite required');
  }
  await assertSeatAvailable(tenantId);
  const fullName =
    input.fullName?.trim() ||
    [input.firstName, input.lastName].filter(Boolean).join(' ').trim() ||
    'کاربر جدید';
  const email = (input.email?.trim() || (input.phone ? inviteEmailFromPhone(input.phone, tenantId) : ''))
    .toLowerCase();
  if (!email) throw new BadRequestException('ایمیل یا شماره همراه الزامی است.');
  const phoneDigits = input.phone?.replace(/\D/g, '');
  const existing = await platformDb.user.findUnique({ where: { email } });
  if (existing) {
    if (existing.tenantId !== tenantId) throw new BadRequestException('ایمیل در سازمان دیگر ثبت است.');
    throw new BadRequestException('کاربر از قبل وجود دارد.');
  }
  if (phoneDigits) {
    const phoneDup = await platformDb.user.findFirst({
      where: {
        tenantId,
        OR: [
          { email: { contains: `invite+${phoneDigits}@` } },
          { email: { contains: `invite+0${phoneDigits.slice(-10)}@` } },
        ],
      },
    });
    if (phoneDup) throw new BadRequestException('این شماره همراه قبلاً دعوت شده است.');
  }
  const passwordHash = await bcrypt.hash(randomUUID(), 12);
  const user = await platformDb.user.create({
    data: {
      tenant: { connect: { id: tenantId } },
      email,
      fullName: input.jobTitle ? `${fullName} — ${input.jobTitle}` : fullName,
      passwordHash,
      accountStatus: 'Active',
      isSuperAdmin: false,
    },
    include: includeRoles,
  });
  let roleIds = [...(input.roleIds ?? [])];
  if (input.customPermissions?.length) {
    const custom = await createTenantRole(tenantId, {
      code: `INV_${Date.now().toString(36).toUpperCase()}`,
      name: input.jobTitle || fullName,
      permissions: input.customPermissions,
    });
    roleIds.push(custom.id);
  }
  if (roleIds.length) {
    await assignUserRoles(tenantId, user.id, roleIds, actorPermissions, true);
  }
  await syncSubscriptionUsedSeats(tenantId);
  await recordDomainEvent({
    eventType: PLATFORM_EVENTS.TENANT_USER_INVITED,
    aggregateId: user.id,
    tenantId,
    sourceSchema: 'platform',
    payload: { email, fullName, phone: input.phone ?? null, roleIds },
  });
  const ctx = TenantContext.getOrNull();
  try {
    await platformDb.auditLog.create({
      data: {
        tenantId,
        userId: ctx?.userId ?? 'system',
        action: 'tenant.user.invite',
        entityType: 'user',
        entityId: user.id,
        newValue: { email, fullName },
        ip: '127.0.0.1',
        correlationId: ctx?.correlationId ?? randomUUID(),
      },
    });
  } catch {
    // audit must not block invite in dev
  }
  const fresh = await platformDb.user.findUnique({ where: { id: user.id }, include: includeRoles });
  return mapUser(fresh!);
}

export async function patchTenantUser(
  tenantId: string,
  userId: string,
  patch: { fullName?: string },
): Promise<TenantUserRow> {
  const user = await platformDb.user.findFirst({ where: { id: userId, tenantId } });
  if (!user) throw new NotFoundException('کاربر یافت نشد.');
  const updated = await platformDb.user.update({
    where: { id: userId },
    data: { fullName: patch.fullName?.trim() ?? undefined },
    include: includeRoles,
  });
  return mapUser(updated);
}

export async function deactivateTenantUser(
  tenantId: string,
  userId: string,
  actorPermissions: string[],
): Promise<TenantUserRow> {
  if (!actorPermissions.includes('*') && !actorPermissions.includes(TENANT_USERS_DEACTIVATE)) {
    throw new ForbiddenException('tenant.users.deactivate required');
  }
  const user = await platformDb.user.findFirst({ where: { id: userId, tenantId } });
  if (!user) throw new NotFoundException('کاربر یافت نشد.');
  const updated = await platformDb.user.update({
    where: { id: userId },
    data: { accountStatus: 'Suspended' },
    include: includeRoles,
  });
  await syncSubscriptionUsedSeats(tenantId);
  return mapUser(updated);
}

export async function activateTenantUser(tenantId: string, userId: string): Promise<TenantUserRow> {
  await assertSeatAvailable(tenantId);
  const user = await platformDb.user.findFirst({ where: { id: userId, tenantId } });
  if (!user) throw new NotFoundException('کاربر یافت نشد.');
  const updated = await platformDb.user.update({
    where: { id: userId },
    data: { accountStatus: 'Active' },
    include: includeRoles,
  });
  await syncSubscriptionUsedSeats(tenantId);
  return mapUser(updated);
}

export async function assignUserRoles(
  tenantId: string,
  userId: string,
  roleIds: string[],
  _actorPermissions: string[],
  skipUserCheck = false,
): Promise<TenantUserRow> {
  if (!skipUserCheck) {
    const user = await platformDb.user.findFirst({ where: { id: userId, tenantId } });
    if (!user) throw new NotFoundException('کاربر یافت نشد.');
  }
  const roles = await platformDb.role.findMany({
    where: { id: { in: roleIds }, OR: [{ tenantId }, { tenantId: null }] },
  });
  if (roles.length !== roleIds.length) throw new BadRequestException('نقش نامعتبر یا خارج از سازمان.');
  await platformDb.userRoleAssignment.deleteMany({ where: { userId } });
  if (roleIds.length) {
    await platformDb.userRoleAssignment.createMany({
      data: roleIds.map((roleId) => ({ id: randomUUID(), userId, roleId })),
    });
  }
  const updated = await platformDb.user.findUnique({ where: { id: userId }, include: includeRoles });
  return mapUser(updated!);
}
