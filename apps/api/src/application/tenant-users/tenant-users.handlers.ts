import { platformDb } from '../../prisma/platform-db';
import { syncSubscriptionUsedSeats } from '../../modules/tenant-rbac/tenant-seat.service';
import {
  activateTenantUser,
  assignUserRoles,
  deactivateTenantUser,
  inviteTenantUser,
  listTenantUsers,
  patchTenantUser,
} from '../../modules/tenant-users/tenant-users.service';

const CANONICAL_DEMO_TENANT_ID = '11111111-1111-4111-8111-111111111111';

/** پنل دمو UUID ثابت می‌فرستد؛ اگر آن ردیف نباشد، مستأجر slug=demo-company همان شرکت نمونه است. */
async function liveDemoTenantId(tenantId: string): Promise<string> {
  if (tenantId !== CANONICAL_DEMO_TENANT_ID) return tenantId;
  try {
    const exact = await platformDb.tenant.findUnique({ where: { id: tenantId }, select: { id: true } });
    if (exact) return tenantId;
    const named = await platformDb.tenant.findUnique({
      where: { slug: 'demo-company' },
      select: { id: true },
    });
    return named?.id ?? tenantId;
  } catch {
    return tenantId;
  }
}

export async function listTenantUsersQuery(tenantId: string) {
  const liveTenantId = await liveDemoTenantId(tenantId);
  const users = await listTenantUsers(liveTenantId);
  const seatsUsed = await syncSubscriptionUsedSeats(liveTenantId);
  const sub = await platformDb.subscription.findUnique({ where: { tenantId: liveTenantId } });
  return { users, seatsUsed, seatsTotal: sub?.seats ?? users.length };
}

export async function inviteTenantUserCommand(
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
) {
  const liveTenantId = await liveDemoTenantId(tenantId);
  const user = await inviteTenantUser(liveTenantId, input, actorPermissions);
  return { user };
}

export async function patchTenantUserCommand(tenantId: string, userId: string, fullName?: string) {
  const liveTenantId = await liveDemoTenantId(tenantId);
  const user = await patchTenantUser(liveTenantId, userId, { fullName });
  return { user };
}

export async function activateTenantUserCommand(tenantId: string, userId: string) {
  const liveTenantId = await liveDemoTenantId(tenantId);
  const user = await activateTenantUser(liveTenantId, userId);
  return { user };
}

export async function deactivateTenantUserCommand(tenantId: string, userId: string, actorPermissions: string[]) {
  const liveTenantId = await liveDemoTenantId(tenantId);
  const user = await deactivateTenantUser(liveTenantId, userId, actorPermissions);
  return { user };
}

export async function assignTenantUserRolesCommand(
  tenantId: string,
  userId: string,
  roleIds: string[],
  actorPermissions: string[],
) {
  const liveTenantId = await liveDemoTenantId(tenantId);
  const user = await assignUserRoles(liveTenantId, userId, roleIds, actorPermissions);
  return { user };
}
