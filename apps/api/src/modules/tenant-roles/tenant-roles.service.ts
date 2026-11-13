import { randomUUID } from 'node:crypto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TenantContext } from '@repo/domain';
import { platformDb } from '../../prisma/platform-db';
import { assertPermissionsSubset, grantablePermissionsForTenant } from '../tenant-rbac/tenant-rbac.service';

export type TenantRoleRow = {
  id: string;
  code: string;
  name: string;
  permissions: string[];
  assignees: number;
};

export async function listTenantRoles(tenantId: string): Promise<TenantRoleRow[]> {
  const rows = await platformDb.role.findMany({
    where: { tenantId },
    include: { _count: { select: { assignments: true } } },
    orderBy: { code: 'asc' },
  });
  return rows.map((r) => ({
    id: r.id,
    code: r.code,
    name: r.name,
    permissions: Array.isArray(r.permissions) ? (r.permissions as string[]) : [],
    assignees: r._count.assignments,
  }));
}

export async function createTenantRole(
  tenantId: string,
  input: { code: string; name: string; permissions: string[] },
): Promise<TenantRoleRow> {
  const grantable = await grantablePermissionsForTenant(tenantId);
  assertPermissionsSubset(input.permissions, grantable);
  const code = input.code.trim().toUpperCase();
  const row = await platformDb.role.create({
    data: {
      id: randomUUID(),
      tenantId,
      code,
      name: input.name.trim(),
      permissions: input.permissions,
    },
    include: { _count: { select: { assignments: true } } },
  });
  const ctx = TenantContext.getOrNull();
  try {
    await platformDb.auditLog.create({
      data: {
        tenantId,
        userId: ctx?.userId ?? 'system',
        action: 'tenant.role.create',
        entityType: 'role',
        entityId: row.id,
        newValue: { code, name: input.name.trim(), permissions: input.permissions },
        ip: '127.0.0.1',
        correlationId: ctx?.correlationId ?? randomUUID(),
      },
    });
  } catch {
    // audit must not block role create in dev
  }
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    permissions: input.permissions,
    assignees: row._count.assignments,
  };
}

export async function updateTenantRole(
  tenantId: string,
  roleId: string,
  patch: { name?: string; permissions?: string[] },
): Promise<TenantRoleRow> {
  const role = await platformDb.role.findFirst({ where: { id: roleId, tenantId } });
  if (!role) throw new NotFoundException('نقش یافت نشد.');
  if (patch.permissions) {
    const grantable = await grantablePermissionsForTenant(tenantId);
    assertPermissionsSubset(patch.permissions, grantable);
  }
  const updated = await platformDb.role.update({
    where: { id: roleId },
    data: {
      name: patch.name?.trim(),
      permissions: patch.permissions ?? undefined,
    },
    include: { _count: { select: { assignments: true } } },
  });
  return {
    id: updated.id,
    code: updated.code,
    name: updated.name,
    permissions: Array.isArray(updated.permissions) ? (updated.permissions as string[]) : [],
    assignees: updated._count.assignments,
  };
}

export async function deleteTenantRole(tenantId: string, roleId: string): Promise<void> {
  const role = await platformDb.role.findFirst({
    where: { id: roleId, tenantId },
    include: { _count: { select: { assignments: true } } },
  });
  if (!role) throw new NotFoundException('نقش یافت نشد.');
  if (role._count.assignments > 0) {
    throw new BadRequestException('نقش دارای انتساب است — ابتدا کاربران را تغییر دهید.');
  }
  await platformDb.role.delete({ where: { id: roleId } });
}

export async function seedRolesFromPlanTemplates(tenantId: string): Promise<number> {
  const sub = await platformDb.subscription.findUnique({
    where: { tenantId },
    include: { planVersion: true },
  });
  if (!sub?.planVersion?.features) return 0;
  const features = sub.planVersion.features as { roleTemplates?: { code: string; nameFa: string; permissions: string[] }[] };
  const templates = features.roleTemplates ?? [];
  let created = 0;
  for (const t of templates) {
    const exists = await platformDb.role.findFirst({ where: { tenantId, code: t.code } });
    if (exists) continue;
    await platformDb.role.create({
      data: {
        id: randomUUID(),
        tenantId,
        code: t.code,
        name: t.nameFa,
        permissions: t.permissions,
      },
    });
    created += 1;
  }
  return created;
}
