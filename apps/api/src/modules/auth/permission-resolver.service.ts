import { TENANT_ADMIN_PERMISSIONS } from '@repo/contracts';
import { platformDb } from '../../prisma/platform-db';

/** همان کاربری که پنل مستأجر در حالت دمو با هدر x-user-id می‌فرستد. */
const DEMO_COMPANY_ADMIN_USER_ID = '00000000-0000-4000-8000-000000000099';

function permissionsDbEnabled(): boolean {
  return process.env.AUTH_PERMISSIONS_DB === '1' || process.env.AUTH_PERMISSIONS_DB === 'true';
}

export async function resolvePermissionsForUser(userId: string): Promise<string[]> {
  if (!permissionsDbEnabled() || !process.env.DATABASE_URL) {
    return [];
  }
  try {
    const assignments = await platformDb.userRoleAssignment.findMany({
      where: { userId },
      include: { role: true },
    });
    const set = new Set<string>();
    for (const a of assignments) {
      const raw = a.role.permissions;
      if (Array.isArray(raw)) {
        for (const p of raw) {
          if (typeof p === 'string') set.add(p);
        }
      } else if (raw && typeof raw === 'object' && 'list' in raw && Array.isArray((raw as { list: unknown }).list)) {
        for (const p of (raw as { list: string[] }).list) set.add(p);
      }
    }
    return [...set];
  } catch {
    return [];
  }
}

export async function resolveDevUserFromHeaders(input: {
  userId: string;
  tenantId: string;
  superAdminHeader: boolean;
}): Promise<{ permissions: string[]; isSuperAdmin: boolean }> {
  if (input.superAdminHeader && !permissionsDbEnabled()) {
    return { permissions: ['*'], isSuperAdmin: true };
  }
  const dbUser = await platformDb.user.findUnique({ where: { id: input.userId } });
  if (dbUser?.isSuperAdmin) {
    return { permissions: ['*'], isSuperAdmin: true };
  }
  const permissions = await resolvePermissionsForUser(input.userId);
  if (permissions.length) {
    if (input.userId === DEMO_COMPANY_ADMIN_USER_ID && !permissions.includes('operations.write')) {
      return { permissions: [...permissions, 'operations.write'], isSuperAdmin: false };
    }
    return { permissions, isSuperAdmin: false };
  }
  if (input.superAdminHeader) {
    return { permissions: ['*'], isSuperAdmin: true };
  }
  if (input.userId === DEMO_COMPANY_ADMIN_USER_ID) {
    return {
      permissions: [
        ...TENANT_ADMIN_PERMISSIONS,
        'erp.read',
        'erp.write',
        'finance.read',
        'finance.write',
        'operations.read',
        'operations.write',
        'crm.read',
        'crm.write',
      ],
      isSuperAdmin: false,
    };
  }
  return { permissions: ['erp.read', 'erp.write'], isSuperAdmin: false };
}

export function authDbLoginEnabled(): boolean {
  return process.env.AUTH_DB_ENABLED === '1' || process.env.AUTH_DB_ENABLED === 'true';
}
