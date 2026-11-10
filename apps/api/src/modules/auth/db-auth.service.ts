import bcrypt from 'bcrypt';
import { platformDb } from '../../prisma/platform-db';
import { resolvePermissionsForUser } from './permission-resolver.service';

export type DbUserAuth = {
  id: string;
  tenantId: string | null;
  email: string;
  fullName: string;
  isSuperAdmin: boolean;
  permissions: string[];
};

export async function authenticateDbUser(
  email: string,
  password: string,
): Promise<DbUserAuth | null> {
  if (!process.env.DATABASE_URL) return null;
  const user = await platformDb.user.findUnique({ where: { email } });
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  const permissions = user.isSuperAdmin ? ['*'] : await resolvePermissionsForUser(user.id);
  return {
    id: user.id,
    tenantId: user.tenantId,
    email: user.email,
    fullName: user.fullName,
    isSuperAdmin: user.isSuperAdmin,
    permissions,
  };
}
