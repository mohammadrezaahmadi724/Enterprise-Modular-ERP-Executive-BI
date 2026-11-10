const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:3000';
const TENANT = process.env.NEXT_PUBLIC_DEMO_TENANT_ID ?? '11111111-1111-4111-8111-111111111111';

function headers() {
  return {
    'Content-Type': 'application/json',
    'x-tenant-id': TENANT,
    'x-user-id': '00000000-0000-4000-8000-000000000001',
    'x-correlation-id': crypto.randomUUID(),
    'x-super-admin': 'true',
  };
}

export async function fetchErpRecords(href: string, q?: string) {
  const url = new URL(`${API}/api/v1/erp/screens/records`);
  url.searchParams.set('href', href);
  if (q) url.searchParams.set('q', q);
  const res = await fetch(url, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`erp records: ${res.status}`);
  const data = (await res.json()) as { rows: Record<string, string | number>[] };
  return data.rows;
}

export async function createErpRecord(href: string, body: Record<string, unknown>) {
  const url = new URL(`${API}/api/v1/erp/screens/records`);
  url.searchParams.set('href', href);
  const res = await fetch(url, { method: 'POST', headers: headers(), body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`erp create: ${res.status}`);
  return (await res.json()) as { row: Record<string, unknown> };
}

export async function updateErpRecord(href: string, id: string, body: Record<string, unknown>) {
  const res = await fetch(`${API}/api/v1/erp/screens/records/${id}?href=${encodeURIComponent(href)}`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`erp update: ${res.status}`);
  return (await res.json()) as { row: Record<string, unknown> };
}
