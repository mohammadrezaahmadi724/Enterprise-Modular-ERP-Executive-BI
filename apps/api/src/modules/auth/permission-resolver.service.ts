import { platformDb } from '../../prisma/platform-db';

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
    return { permissions, isSuperAdmin: false };
  }
  if (input.superAdminHeader) {
    return { permissions: ['*'], isSuperAdmin: true };
  }
  return { permissions: ['erp.read', 'erp.write'], isSuperAdmin: false };
}

export function authDbLoginEnabled(): boolean {
  return process.env.AUTH_DB_ENABLED === '1' || process.env.AUTH_DB_ENABLED === 'true';
}
