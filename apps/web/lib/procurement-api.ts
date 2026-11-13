import { apiBase } from './api-base';
import { DEFAULT_TENANT_ADMIN_USER_ID, tenantApiHeaders } from './tenant-api-headers';
import type { WmsLineApi } from './wms-api';

function apiUrl() {
  return apiBase();
}

function headers(idempotency?: string) {
  const key = idempotency ?? crypto.randomUUID();
  return tenantApiHeaders({ idempotencyKey: key, userId: DEFAULT_TENANT_ADMIN_USER_ID });
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${apiUrl()}${path}`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${path}: ${res.status}${text ? ` — ${text.slice(0, 200)}` : ''}`);
  }
  return (await res.json()) as T;
}

async function postJson<T>(path: string, body: unknown, idempotencyKey?: string): Promise<T> {
  const res = await fetch(`${apiUrl()}${path}`, {
    method: 'POST',
    headers: headers(idempotencyKey),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${path}: ${res.status}${text ? ` — ${text.slice(0, 200)}` : ''}`);
  }
  return (await res.json()) as T;
}

export const DEMO_PURCHASE_ORDERS = [
  { number: 'PO-001274', supplier: 'تأمین فدک', status: 'تأیید‌شده' },
  { number: 'PO-001270', supplier: 'بازرگانی آریا', status: 'در انتظار تحویل' },
] as const;

export type PurchaseRequestApi = {
  number: string;
  title: string;
  purpose?: string;
  warehouse?: string;
  project?: string;
  costCenter?: string;
  requestDate: string;
  needDate?: string;
  note?: string;
  status: string;
  estimatedToman: number;
  lines: Array<{ sku?: string; description?: string; quantity: number; unit: string; estimatedUnitToman?: number }>;
};

export type PurchaseOrderApi = {
  number: string;
  purchaseRequestNumber?: string;
  project?: string;
  supplierCode: string;
  supplierName: string;
  orderDate: string;
  deliveryDate?: string;
  note?: string;
  status: string;
  totalToman: number;
  overdue?: boolean;
  dueThisWeek?: boolean;
  lines: Array<{ sku: string; quantity: number; unit: string; unitPriceToman: number; lineTotalToman: number }>;
};

export type SupplierApi = {
  code: string;
  name: string;
  openOrders: number;
  totalOrders: number;
  lastOrderDate?: string;
  mobile?: string;
  nationalId?: string;
  economicCode?: string;
  address?: string;
  entityType?: string;
};

export type ProcurementOverviewApi = {
  kpis: {
    pendingRequestToman: number;
    pendingRequestIds: string[];
    openPoToman: number;
    overduePoCount: number;
    dueThisWeekPoCount: number;
    incompleteReceiptCount: number;
    activeSuppliers: number;
    newSuppliersThisYear: number;
  };
  monthlyTrend: Array<{ period: string; orderToman: number }>;
  recentRequests: PurchaseRequestApi[];
  source?: string;
};

export async function fetchProcurementThresholds() {
  return getJson<{ thresholds: { prApprovalToman: number; poApprovalToman: number }; source: string }>(
    '/api/v1/procurement/thresholds',
  );
}

export async function approvePurchaseOrder(poNumber: string) {
  return postJson<{ order: PurchaseOrderApi; source: string }>(
    `/api/v1/procurement/purchase-orders/${encodeURIComponent(poNumber)}/approve`,
    {},
    `po-approve-${poNumber}`,
  );
}

export async function fetchProcurementOverview() {
  return getJson<ProcurementOverviewApi>('/api/v1/procurement/overview');
}

export async function fetchPurchaseRequests() {
  return getJson<{ requests: PurchaseRequestApi[]; source: string }>('/api/v1/procurement/purchase-requests');
}

export async function fetchApprovedPurchaseRequests() {
  return getJson<{ requests: PurchaseRequestApi[]; source: string }>('/api/v1/procurement/purchase-requests/approved');
}

export async function approvePurchaseRequest(prNumber: string) {
  return postJson<{ request: PurchaseRequestApi; source: string }>(
    `/api/v1/procurement/purchase-requests/${encodeURIComponent(prNumber)}/approve`,
    {},
    `pr-approve-${prNumber}`,
  );
}

export async function createPurchaseRequest(body: {
  title: string;
  purpose?: string;
  warehouse?: string;
  project?: string;
  costCenter?: string;
  requestDate: string;
  needDate?: string;
  note?: string;
  lines: Array<{ sku?: string; description?: string; quantity: number; unit: string; estimatedUnitToman?: number }>;
}) {
  return postJson<{
    request: PurchaseRequestApi & { approvalRequired?: boolean; workflowInstanceId?: string };
    source: string;
  }>('/api/v1/procurement/purchase-requests', body, `pr-create-${crypto.randomUUID()}`);
}

export async function fetchPurchaseOrders() {
  return getJson<{ orders: PurchaseOrderApi[]; source: string }>('/api/v1/procurement/purchase-orders');
}

export async function createPurchaseOrder(body: {
  purchaseRequestNumber?: string;
  project?: string;
  supplierCode: string;
  supplierName: string;
  orderDate: string;
  deliveryDate?: string;
  note?: string;
  lines: Array<{ sku: string; quantity: number; unit: string; unitPriceToman: number }>;
}) {
  return postJson<{
    order: PurchaseOrderApi & { approvalRequired?: boolean; workflowInstanceId?: string };
    source: string;
  }>('/api/v1/procurement/purchase-orders', body, `po-create-${crypto.randomUUID()}`);
}

export async function fetchSuppliers() {
  return getJson<{ suppliers: SupplierApi[]; source: string }>('/api/v1/procurement/suppliers');
}

export async function createSupplier(body: {
  name: string;
  code?: string;
  mobile?: string;
  phone?: string;
  nationalId?: string;
  economicCode?: string;
  address?: string;
  entityType?: 'legal' | 'individual';
}) {
  return postJson<{ supplier: SupplierApi; source: string }>(
    '/api/v1/procurement/suppliers',
    body,
    `sup-create-${crypto.randomUUID()}`,
  );
}

export type RfqApi = {
  number: string;
  title: string;
  purchaseRequestNumber?: string;
  deadline: string;
  status: string;
  invitedSupplierCodes: string[];
  awardedSupplierCode?: string;
  purchaseOrderNumber?: string;
  quotes: Array<{
    supplierCode: string;
    supplierName: string;
    submittedAt: string;
    totalToman: number;
    lines: Array<{ sku: string; quantity: number; unit: string; unitPriceToman: number; leadDays?: number }>;
  }>;
};

export async function fetchRfqs() {
  return getJson<{ rfqs: RfqApi[]; source: string }>('/api/v1/procurement/rfqs');
}

export async function createRfq(body: {
  title: string;
  purchaseRequestNumber?: string;
  deadline: string;
  invitedSupplierCodes: string[];
}) {
  return postJson<{ rfq: RfqApi; source: string }>('/api/v1/procurement/rfqs', body, `rfq-create-${crypto.randomUUID()}`);
}

export async function awardRfq(
  rfqNumber: string,
  body: { supplierCode: string; orderDate?: string; deliveryDate?: string },
) {
  return postJson<{ rfq: RfqApi; order: PurchaseOrderApi; source: string }>(
    `/api/v1/procurement/rfqs/${encodeURIComponent(rfqNumber)}/award`,
    body,
    `rfq-award-${rfqNumber}-${body.supplierCode}`,
  );
}

export type ProcurementReportsApi = {
  kpis: ProcurementOverviewApi['kpis'];
  monthlyTrend: Array<{ period: string; orderToman: number }>;
  counts: {
    purchaseRequests: number;
    purchaseOrders: number;
    openRfqs: number;
    awardedRfqs: number;
    suppliers: number;
  };
  supplierOpenPo: Array<{
    supplierCode: string;
    supplierName: string;
    openOrderCount: number;
    openToman: number;
  }>;
  source?: string;
};

export async function fetchProcurementReports() {
  return getJson<ProcurementReportsApi>('/api/v1/procurement/reports');
}

export async function addRfqQuote(
  rfqNumber: string,
  body: {
    supplierCode: string;
    supplierName: string;
    lines: Array<{ sku: string; quantity: number; unit: string; unitPriceToman: number; leadDays?: number }>;
  },
) {
  return postJson<{ rfq: RfqApi; source: string }>(
    `/api/v1/procurement/rfqs/${encodeURIComponent(rfqNumber)}/quotes`,
    body,
    `rfq-quote-${rfqNumber}-${body.supplierCode}`,
  );
}

export async function receivePurchaseOrder(
  poNumber: string,
  body: {
    party?: string;
    lines: WmsLineApi[];
  },
  idempotencyKey?: string,
) {
  return postJson<{
    receiptDocNo: string;
    poNumber: string;
    source: string;
  }>(
    `/api/v1/procurement/purchase-orders/${encodeURIComponent(poNumber)}/receive`,
    {
      party: body.party,
      lines: body.lines.map((l) => ({
        sku: l.sku,
        warehouse: l.warehouse,
        quantity: l.quantity,
        unitPriceRial: l.unitPriceRial,
      })),
    },
    idempotencyKey ?? `po-receive-${poNumber}`,
  );
}

export type SupplierInvoiceRow = {
  number: string;
  poNumber: string;
  supplierName: string;
  amountToman: number;
  status: 'draft' | 'posted';
  orderDate: string;
};

export async function fetchProcurementSupplierInvoices(): Promise<SupplierInvoiceRow[]> {
  const body = await getJson<{ invoices: SupplierInvoiceRow[] }>('/api/v1/procurement/supplier-invoices');
  return body.invoices ?? [];
}
