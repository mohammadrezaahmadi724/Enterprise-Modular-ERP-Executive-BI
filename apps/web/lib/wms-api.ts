import { apiBase } from './api-base';
import { DEFAULT_TENANT_ADMIN_USER_ID, tenantApiHeaders } from './tenant-api-headers';

function apiUrl() {
  return apiBase();
}

function headers(idempotency?: string) {
  const key = idempotency ?? crypto.randomUUID();
  return {
    ...tenantApiHeaders({ idempotencyKey: key, userId: DEFAULT_TENANT_ADMIN_USER_ID }),
  };
}

async function postJson<T>(path: string, body: unknown, idempotencyKey?: string): Promise<T> {
  const res = await fetch(`${apiUrl()}${path}`, {
    method: 'POST',
    headers: headers(idempotencyKey),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${path}: ${res.status}${text ? ` — ${text.slice(0, 160)}` : ''}`);
  }
  return (await res.json()) as T;
}

export type WmsStockRowApi = {
  sku: string;
  name: string;
  warehouse: string;
  onHand: number;
  reserved: number;
  blocked: number;
  available: number;
  status: 'ok' | 'low' | 'out';
};

export type WmsLineApi = {
  sku: string;
  warehouse: string;
  destWarehouse?: string;
  quantity: number;
  unitPriceRial?: number;
  location?: string;
  batch?: string;
  /** ISO date — هنگام رسید با شماره بچ ثبت می‌شود */
  batchExpiry?: string;
  serial?: string;
};

export type WmsReservationApi = {
  id: string;
  sku: string;
  itemName: string;
  warehouse: string;
  warehouseLabel: string;
  reference: string;
  qty: number;
  expiry: string | null;
  status: 'active' | 'released' | 'consumed';
};

export type WmsDocApi = {
  docNo: string;
  date: string;
  party: string;
  orderRef: string;
  source: string;
  status: 'posted';
  lines: WmsLineApi[];
  glJournalId?: string;
  glDocNumber?: string;
};

export type WmsOverviewApi = {
  activeWarehouses: number;
  recentReservations: number;
  criticalSkus: number;
  expiringLotsWithin30: number;
  stockPreview: WmsStockRowApi[];
  recentMovements: Array<{ id: string; type: string; date: string; status: string }>;
};

export type WmsFefoPickApi = {
  sku: string;
  warehouse: string;
  quantity: number;
  allocations: Array<{ batchNo: string; qty: number; expiryDate: string | null }>;
  uncoveredQty: number;
  batchOnHand: number;
  fefo: true;
};

export async function fetchWmsOverview() {
  const res = await fetch(`${apiUrl()}/api/v1/wms/overview`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`wms overview: ${res.status}`);
  return (await res.json()) as { overview: WmsOverviewApi; source: string };
}

export async function fetchWmsStock() {
  const res = await fetch(`${apiUrl()}/api/v1/wms/stock`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`wms stock: ${res.status}`);
  return (await res.json()) as { stock: WmsStockRowApi[]; source: string };
}

export async function fetchWmsReservations() {
  const res = await fetch(`${apiUrl()}/api/v1/wms/reservations`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`wms reservations: ${res.status}`);
  return (await res.json()) as { reservations: WmsReservationApi[]; source: string };
}

export async function createWmsReservation(body: {
  sku: string;
  warehouse: string;
  quantity: number;
  reference: string;
  expiry?: string;
  location?: string;
}) {
  return postJson<{ reservation: WmsReservationApi; source: string }>('/api/v1/wms/reservations', body);
}

export async function fetchWmsReceipts() {
  const res = await fetch(`${apiUrl()}/api/v1/wms/receipts`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`wms receipts: ${res.status}`);
  return (await res.json()) as { receipts: WmsDocApi[]; source: string };
}

export async function createWmsReceipt(body: {
  documentDate?: string;
  party?: string;
  orderRef?: string;
  reference?: string;
  lines: WmsLineApi[];
}) {
  return postJson<{ receipt: WmsDocApi; source: string }>('/api/v1/wms/receipts', body);
}

export async function fetchWmsIssues() {
  const res = await fetch(`${apiUrl()}/api/v1/wms/issues`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`wms issues: ${res.status}`);
  return (await res.json()) as { issues: WmsDocApi[]; source: string };
}

export type WmsIssueInvoiceApi = {
  number: string;
  orderNumber: string;
  status: 'draft' | 'posted';
  glDocNumber?: string;
};

export async function createWmsIssue(body: {
  documentDate?: string;
  party?: string;
  orderRef?: string;
  reference?: string;
  postCogs?: boolean;
  autoInvoice?: boolean;
  autoPostInvoice?: boolean;
  lines: WmsLineApi[];
}) {
  return postJson<{ issue: WmsDocApi; invoice: WmsIssueInvoiceApi | null; source: string }>(
    '/api/v1/wms/issues',
    body,
  );
}

export async function downloadWmsValuationReconciliationCsv(): Promise<void> {
  const res = await fetch(`${apiUrl()}/api/v1/wms/reports/valuation-reconciliation/export`, {
    headers: headers('wms-valuation-export'),
  });
  if (!res.ok) throw new Error(`export: ${res.status}`);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'wms-valuation-reconciliation.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export async function fetchWmsTransfers() {
  const res = await fetch(`${apiUrl()}/api/v1/wms/transfers`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`wms transfers: ${res.status}`);
  return (await res.json()) as { transfers: WmsDocApi[]; source: string };
}

export async function createWmsTransfer(body: {
  documentDate?: string;
  party?: string;
  orderRef?: string;
  reference?: string;
  lines: WmsLineApi[];
}) {
  return postJson<{ transfer: WmsDocApi; source: string }>('/api/v1/wms/transfers', body);
}

export async function runWmsReconciliation() {
  return postJson<{ session: { id: string; runAt: string; status: string; layersChecked: string[] }; source: string }>(
    '/api/v1/wms/reconciliation/run',
    {},
    'wms-recon-run',
  );
}

export async function fetchWmsReconciliations() {
  const res = await fetch(`${apiUrl()}/api/v1/wms/reconciliation`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`wms reconciliation: ${res.status}`);
  return (await res.json()) as { sessions: Array<{ id: string; runAt: string }>; source: string };
}

export async function fetchWmsDocument(docNo: string) {
  const res = await fetch(`${apiUrl()}/api/v1/wms/documents/${encodeURIComponent(docNo)}`, {
    headers: headers(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`wms document: ${res.status}`);
  return (await res.json()) as { document: WmsDocApi | null; source: string };
}

export type WmsKardexApi = {
  entries: Array<{
    id: string;
    at: string;
    sku: string;
    warehouse: string;
    movement: string;
    qtyIn: number;
    qtyOut: number;
    reference: string;
    unitPriceRial?: number;
  }>;
  totals: { ok: number; reservedBlocked: number; out: number };
  byWarehouse: Array<{ code: string; rows: number; ok: number; reserved: number; out: number }>;
};

export type WmsStocktakingSessionApi = {
  id: string;
  warehouse: string;
  warehouseLabel: string;
  countDate: string;
  status: 'draft' | 'reconciled';
  totalLines: number;
  varianceLines: number;
  varianceToman: number;
  glJournalId?: string;
  glDocNumber?: string;
  lines?: Array<{ sku: string; countedQty: number; systemQty: number }>;
};

export async function fetchWmsKardex() {
  const res = await fetch(`${apiUrl()}/api/v1/wms/kardex`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`wms kardex: ${res.status}`);
  return (await res.json()) as { kardex: WmsKardexApi; source: string };
}

export async function fetchWmsStocktakingSessions() {
  const res = await fetch(`${apiUrl()}/api/v1/wms/stocktaking`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`wms stocktaking: ${res.status}`);
  return (await res.json()) as { sessions: WmsStocktakingSessionApi[]; source: string };
}

export async function fetchWmsStocktakingSession(id: string) {
  const res = await fetch(`${apiUrl()}/api/v1/wms/stocktaking/${encodeURIComponent(id)}`, {
    headers: headers(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`wms stocktaking session: ${res.status}`);
  return (await res.json()) as { session: WmsStocktakingSessionApi | null; source: string };
}

export async function createWmsStocktakingSession(body: { warehouse: string; countDate?: string }) {
  return postJson<{ session: WmsStocktakingSessionApi; source: string }>('/api/v1/wms/stocktaking', body);
}

export async function patchWmsStocktakingLine(sessionId: string, body: { sku: string; countedQty: number }) {
  const res = await fetch(`${apiUrl()}/api/v1/wms/stocktaking/${encodeURIComponent(sessionId)}/lines`, {
    method: 'PATCH',
    headers: headers(`cnt-line-${sessionId}`),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`stocktaking line: ${res.status}`);
  return (await res.json()) as { session: WmsStocktakingSessionApi; source: string };
}

export async function postWmsStocktakingSession(sessionId: string) {
  return postJson<{ session: WmsStocktakingSessionApi; source: string }>(
    `/api/v1/wms/stocktaking/${encodeURIComponent(sessionId)}/post`,
    {},
    `cnt-post-${sessionId}`,
  );
}

export type WmsTrackingContractApi = {
  sku: string;
  name: string;
  baseUnit: string;
  method: string;
  decimals: number;
  fefo: boolean;
  minShelf: string;
  flags: string[];
  version: number;
};

export type WmsSerialApi = {
  serial: string;
  sku: string;
  itemName: string;
  warehouse: string;
  batch?: string;
  status: string;
};

export async function fetchWmsTracking() {
  const res = await fetch(`${apiUrl()}/api/v1/wms/tracking`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`wms tracking: ${res.status}`);
  return (await res.json()) as { contracts: WmsTrackingContractApi[]; source: string };
}

export async function fetchWmsSerials() {
  const res = await fetch(`${apiUrl()}/api/v1/wms/serials`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`wms serials: ${res.status}`);
  return (await res.json()) as { serials: WmsSerialApi[]; source: string };
}

export async function registerWmsSerials(body: { sku: string; warehouse: string; serials: string[]; batch?: string }) {
  return postJson<{ registered: number; source: string }>('/api/v1/wms/serials', body);
}

export type WmsBatchApi = {
  batchNo: string;
  sku: string;
  itemName: string;
  warehouse: string;
  qty: number;
  expiryDate: string | null;
  status: string;
  receivedAt: string;
};

export async function fetchWmsBatches() {
  const res = await fetch(`${apiUrl()}/api/v1/wms/batches`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`wms batches: ${res.status}`);
  return (await res.json()) as { batches: WmsBatchApi[]; source: string };
}

export async function fetchWmsExpiringBatches(withinDays = 30) {
  const res = await fetch(`${apiUrl()}/api/v1/wms/batches/expiring?withinDays=${withinDays}`, {
    headers: headers(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`wms expiring batches: ${res.status}`);
  return (await res.json()) as { batches: WmsBatchApi[]; withinDays: number; source: string };
}

export async function fetchWmsFefoPick(sku: string, warehouse: string, quantity: number) {
  const q = new URLSearchParams({
    sku,
    warehouse,
    qty: String(quantity),
  });
  const res = await fetch(`${apiUrl()}/api/v1/wms/batches/fefo-pick?${q}`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`wms fefo pick: ${res.status}`);
  return (await res.json()) as { pick: WmsFefoPickApi; source: string };
}

export async function createWmsBatch(body: {
  sku: string;
  warehouse: string;
  qty: number;
  batchNo?: string;
  expiryDate?: string;
}) {
  return postJson<{ batch: WmsBatchApi; source: string }>('/api/v1/wms/batches', body);
}

export async function runWmsBatchExpiry() {
  return postJson<{ expired: number; source: string }>('/api/v1/wms/batches/expire-run', {}, 'wms-batch-expire');
}

export type WmsValuationReconApi = {
  bookValueRial: number;
  glInventoryRial: number;
  varianceRial: number;
  pricedSkuCount: number;
  stockRowCount: number;
};

export async function fetchWmsValuationReconciliation() {
  const res = await fetch(`${apiUrl()}/api/v1/wms/reports/valuation-reconciliation`, {
    headers: headers(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`wms valuation recon: ${res.status}`);
  return (await res.json()) as { reconciliation: WmsValuationReconApi; source: string };
}

export async function createWmsAdjustment(body: {
  sku: string;
  warehouse: string;
  countedQty: number;
  reason: string;
  unitValueRial?: number;
  location?: string;
  batch?: string;
  serial?: string;
}) {
  return postJson<{ ok: boolean; delta: number; source: string }>('/api/v1/wms/adjustments', body);
}
