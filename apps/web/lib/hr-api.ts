import { apiBase } from './api-base';
import { DEFAULT_TENANT_ADMIN_USER_ID, tenantApiHeaders } from './tenant-api-headers';

export type HrEmployeeRow = {
  id: string;
  fullName: string;
  department?: string;
  status?: string;
};

export async function fetchHrEmployees(): Promise<HrEmployeeRow[]> {
  const res = await fetch(`${apiBase()}/api/v1/hr/employees`, {
    headers: tenantApiHeaders({ userId: DEFAULT_TENANT_ADMIN_USER_ID }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`hr employees: ${res.status}`);
  const body = (await res.json()) as { employees?: HrEmployeeRow[] };
  return body.employees ?? [];
}
