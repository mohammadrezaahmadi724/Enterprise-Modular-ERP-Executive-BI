import { DEFAULT_TENANT_ADMIN_USER_ID, tenantApiHeaders, apiBase } from './tenant-api-headers';

export type TenantUserRow = {
  id: string;
  email: string;
  fullName: string;
  roles: string;
  roleIds: string[];
  lastLogin: string;
  status: string;
  accountStatus: string;
  invitePending?: boolean;
};

export async function fetchTenantUsers(): Promise<{
  users: TenantUserRow[];
  seatsUsed: number;
  seatsTotal: number;
}> {
  const res = await fetch(`${apiBase()}/api/v1/tenant/users`, {
    headers: tenantApiHeaders(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`users: ${res.status}`);
  return (await res.json()) as { users: TenantUserRow[]; seatsUsed: number; seatsTotal: number };
}

export async function inviteTenantUser(body: {
  email?: string;
  firstName: string;
  lastName: string;
  phone: string;
  jobTitle: string;
  roleIds?: string[];
  customPermissions?: string[];
}): Promise<TenantUserRow> {
  const res = await fetch(`${apiBase()}/api/v1/tenant/users/invite`, {
    method: 'POST',
    headers: tenantApiHeaders({ userId: DEFAULT_TENANT_ADMIN_USER_ID }),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = (await res.json()) as { user: TenantUserRow };
  return data.user;
}

export async function patchTenantUserRoles(userId: string, roleIds: string[]): Promise<TenantUserRow> {
  const res = await fetch(`${apiBase()}/api/v1/tenant/users/${userId}/roles`, {
    method: 'PATCH',
    headers: tenantApiHeaders(),
    body: JSON.stringify({ roleIds }),
  });
  if (!res.ok) throw new Error(await res.text());
  return ((await res.json()) as { user: TenantUserRow }).user;
}

export async function activateTenantUser(userId: string): Promise<TenantUserRow> {
  const res = await fetch(`${apiBase()}/api/v1/tenant/users/${userId}/activate`, {
    method: 'POST',
    headers: tenantApiHeaders(),
  });
  if (!res.ok) throw new Error(await res.text());
  return ((await res.json()) as { user: TenantUserRow }).user;
}

export async function deactivateTenantUser(userId: string): Promise<TenantUserRow> {
  const res = await fetch(`${apiBase()}/api/v1/tenant/users/${userId}/deactivate`, {
    method: 'POST',
    headers: tenantApiHeaders(),
  });
  if (!res.ok) throw new Error(await res.text());
  return ((await res.json()) as { user: TenantUserRow }).user;
}
