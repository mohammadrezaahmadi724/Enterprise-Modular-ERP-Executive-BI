import { apiBase } from './api-base';

export const DEFAULT_TENANT_ID =
  process.env.NEXT_PUBLIC_DEMO_TENANT_ID ?? '11111111-1111-4111-8111-111111111111';

/** مدیر سازمان دمو — بدون x-super-admin */
export const DEFAULT_TENANT_ADMIN_USER_ID =
  process.env.NEXT_PUBLIC_TENANT_ADMIN_USER_ID ?? '00000000-0000-4000-8000-000000000099';

export function tenantApiHeaders(extra?: { idempotencyKey?: string; userId?: string }): HeadersInit {
  const idem = extra?.idempotencyKey ?? crypto.randomUUID();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-tenant-id': DEFAULT_TENANT_ID,
    'x-user-id': extra?.userId ?? DEFAULT_TENANT_ADMIN_USER_ID,
    'x-correlation-id': idem,
    'Idempotency-Key': idem,
  };
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('access_token');
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export { apiBase };
