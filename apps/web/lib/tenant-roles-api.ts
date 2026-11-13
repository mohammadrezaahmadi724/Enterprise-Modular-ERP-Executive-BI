import type { PermissionCatalogEntry } from '@repo/contracts';
import { DEFAULT_TENANT_ADMIN_USER_ID, apiBase, tenantApiHeaders } from './tenant-api-headers';

export type TenantRoleRow = {
  id: string;
  code: string;
  name: string;
  permissions: string[];
  assignees: number;
};

export async function fetchTenantRoles(): Promise<TenantRoleRow[]> {
  const res = await fetch(`${apiBase()}/api/v1/tenant/roles`, { headers: tenantApiHeaders(), cache: 'no-store' });
  if (!res.ok) throw new Error(`roles: ${res.status}`);
  return ((await res.json()) as { roles: TenantRoleRow[] }).roles;
}

export async function fetchRbacCatalog(): Promise<{
  grantable: string[];
  catalog: PermissionCatalogEntry[];
}> {
  const res = await fetch(`${apiBase()}/api/v1/tenant/rbac/catalog`, {
    headers: tenantApiHeaders(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`catalog: ${res.status}`);
  return (await res.json()) as { grantable: string[]; catalog: PermissionCatalogEntry[] };
}

export async function createTenantRole(input: {
  code: string;
  name: string;
  permissions: string[];
}): Promise<TenantRoleRow> {
  const res = await fetch(`${apiBase()}/api/v1/tenant/roles`, {
    method: 'POST',
    headers: tenantApiHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await res.text());
  return ((await res.json()) as { role: TenantRoleRow }).role;
}

export async function updateTenantRole(
  id: string,
  patch: { name?: string; permissions?: string[] },
): Promise<TenantRoleRow> {
  const res = await fetch(`${apiBase()}/api/v1/tenant/roles/${id}`, {
    method: 'PATCH',
    headers: tenantApiHeaders(),
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error(await res.text());
  return ((await res.json()) as { role: TenantRoleRow }).role;
}

export async function fetchTenantRbacMe(): Promise<{ permissions: string[] }> {
  const res = await fetch(`${apiBase()}/api/v1/tenant/rbac/me`, {
    headers: tenantApiHeaders({ userId: DEFAULT_TENANT_ADMIN_USER_ID }),
    cache: 'no-store',
  });
  if (!res.ok) return { permissions: [] };
  return (await res.json()) as { permissions: string[] };
}
