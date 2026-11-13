import {
  createTenantRole,
  deleteTenantRole,
  listTenantRoles,
  seedRolesFromPlanTemplates,
  updateTenantRole,
} from '../../modules/tenant-roles/tenant-roles.service';

export async function listTenantRolesQuery(tenantId: string) {
  await seedRolesFromPlanTemplates(tenantId);
  return { roles: await listTenantRoles(tenantId) };
}

export async function createTenantRoleCommand(
  tenantId: string,
  input: { code: string; name: string; permissions: string[] },
) {
  return { role: await createTenantRole(tenantId, input) };
}

export async function updateTenantRoleCommand(
  tenantId: string,
  roleId: string,
  patch: { name?: string; permissions?: string[] },
) {
  return { role: await updateTenantRole(tenantId, roleId, patch) };
}

export async function deleteTenantRoleCommand(tenantId: string, roleId: string) {
  await deleteTenantRole(tenantId, roleId);
  return { ok: true as const };
}
