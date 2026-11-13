/**
 * Smoke: WMS + Sales supply confirm (needs API on API_URL, default http://127.0.0.1:3001)
 * Usage: pnpm tsx tools/smoke/wms-sales-api.smoke.ts
 */
const API_URL = process.env.API_URL ?? 'http://127.0.0.1:3001';
const TENANT = process.env.NEXT_PUBLIC_DEMO_TENANT_ID ?? '11111111-1111-4111-8111-111111111111';

function headers(path: string) {
  const key = `smoke-${path}-${Date.now()}`;
  return {
    'Content-Type': 'application/json',
    'x-tenant-id': TENANT,
    'x-user-id': '00000000-0000-4000-8000-000000000001',
    'x-correlation-id': key,
    'Idempotency-Key': key,
    'x-super-admin': 'true',
  };
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { headers: headers(path) });
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`);
  return (await res.json()) as T;
}

async function postJson<T>(path: string, body: unknown = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: headers(path),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST ${path} → ${res.status} ${text.slice(0, 200)}`);
  }
  return (await res.json()) as T;
}

async function main() {
  const overview = await getJson<{ overview: { activeWarehouses: number }; source: string }>('/api/v1/wms/overview');
  console.log('wms overview', overview.overview.activeWarehouses, overview.source);

  const orders = await getJson<{ orders: Array<{ number: string; supplyStatus: string }> }>('/api/v1/sales/orders');
  const so = orders.orders.find((o) => o.number === 'SO-0480');
  if (!so) throw new Error('SO-0480 not in sales orders');

  if (so.supplyStatus !== 'ready') {
    const confirmed = await postJson<{ order: { supplyStatus: string }; reservations: unknown[] }>(
      '/api/v1/sales/orders/SO-0480/confirm',
    );
    console.log('confirm supply', confirmed.order.supplyStatus, 'reservations', confirmed.reservations.length);
  } else {
    console.log('SO-0480 already ready — skip confirm');
  }

  const reservations = await getJson<{ reservations: Array<{ reference: string }> }>('/api/v1/wms/reservations');
  const linked = reservations.reservations.filter((r) => r.reference === 'SO-0480');
  console.log('wms reservations for SO-0480', linked.length);

  const kardex = await getJson<{ kardex: { entries: unknown[]; totals: { ok: number } }; source: string }>(
    '/api/v1/wms/kardex',
  );
  console.log('kardex entries', kardex.kardex.entries.length, 'ok rows', kardex.kardex.totals.ok, kardex.source);

  const expiry = await postJson<{ expired: number; expiringCount: number }>('/api/v1/wms/batches/expiry-scan');
  console.log('wms expiry-scan', expiry.expired, 'expiring', expiry.expiringCount);

  const fulfill = await postJson<{ issue: { docNo: string }; invoice?: { number: string }; replay: boolean }>(
    '/api/v1/sales/orders/SO-0480/fulfill',
    {},
    'smoke-fulfill-SO-0480',
  );
  console.log('fulfill SO-0480', fulfill.issue.docNo, 'invoice', fulfill.invoice?.number, 'replay', fulfill.replay);

  const after = await getJson<{ orders: Array<{ number: string; supplyStatus: string }> }>('/api/v1/sales/orders');
  const shipped = after.orders.find((o) => o.number === 'SO-0480');
  console.log('SO-0480 supplyStatus', shipped?.supplyStatus);

  console.log('smoke OK');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
