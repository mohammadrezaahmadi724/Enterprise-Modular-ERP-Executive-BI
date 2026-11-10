import { apiBase } from './api-base';

function headers() {
  return {
    'Content-Type': 'application/json',
    'x-super-admin': 'true',
    'x-tenant-id': '11111111-1111-4111-8111-111111111111',
    'x-correlation-id': crypto.randomUUID(),
  };
}

export async function fetchAdminRows(resource: string, q?: string) {
  const url = new URL(`${apiBase()}/api/v1/platform/admin/${resource}`, typeof window !== 'undefined' ? window.location.origin : 'http://127.0.0.1:3002');
  if (q) url.searchParams.set('q', q);
  const res = await fetch(url, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`admin list ${resource}: ${res.status}`);
  const data = (await res.json()) as { rows: Record<string, unknown>[] };
  return data.rows;
}

export async function createAdminRow(resource: string, body: Record<string, unknown>) {
  const res = await fetch(`${apiBase()}/api/v1/platform/admin/${resource}`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`admin create: ${res.status}`);
  return (await res.json()) as { row: Record<string, unknown> };
}

export async function updateAdminRow(resource: string, id: string, body: Record<string, unknown>) {
  const res = await fetch(`${apiBase()}/api/v1/platform/admin/${resource}/${id}`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`admin update: ${res.status}`);
  return (await res.json()) as { row: Record<string, unknown> };
}

export async function deleteAdminRow(resource: string, id: string) {
  const res = await fetch(`${apiBase()}/api/v1/platform/admin/${resource}/${id}`, {
    method: 'DELETE',
    headers: headers(),
  });
  if (!res.ok) throw new Error(`admin delete: ${res.status}`);
}
