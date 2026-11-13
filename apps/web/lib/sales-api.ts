import { apiBase } from './api-base';

function apiUrl() {
  return apiBase();
}

const TENANT = process.env.NEXT_PUBLIC_DEMO_TENANT_ID ?? '11111111-1111-4111-8111-111111111111';

function headers(idempotency?: string) {
  const key = idempotency ?? crypto.randomUUID();
  return {
    'Content-Type': 'application/json',
    'x-tenant-id': TENANT,
    'x-user-id': '00000000-0000-4000-8000-000000000001',
    'x-correlation-id': key,
    'Idempotency-Key': key,
    'x-super-admin': 'true',
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
    throw new Error(`${path}: ${res.status}${text ? ` — ${text.slice(0, 120)}` : ''}`);
  }
  return (await res.json()) as T;
}

export type CrmContactDto = {
  id: string;
  tenantId: string;
  fullName: string;
  email?: string;
  phone?: string;
  company?: string;
  updatedAt: string;
};

export type CrmCustomerPartyDto = {
  code: string;
  contactId: string;
  name: string;
  tags: string | null;
  partyType: 'person' | 'organization';
  roles: string[];
  status: 'active' | 'inactive';
  updatedAt: string;
  email?: string;
  phone?: string;
  company?: string;
};

export async function fetchCrmCustomers(): Promise<{ customers: CrmCustomerPartyDto[]; source: string }> {
  const res = await fetch(`${apiUrl()}/api/v1/crm/customers`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`crm customers: ${res.status}`);
  return (await res.json()) as { customers: CrmCustomerPartyDto[]; source: string };
}

export async function fetchCrmCustomerByCode(
  code: string,
): Promise<{ customer: CrmCustomerPartyDto | null; source: string }> {
  const res = await fetch(`${apiUrl()}/api/v1/crm/customers/${encodeURIComponent(code)}`, {
    headers: headers(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`crm customer: ${res.status}`);
  return (await res.json()) as { customer: CrmCustomerPartyDto | null; source: string };
}

export async function fetchCrmContact(id: string): Promise<CrmContactDto | null> {
  const res = await fetch(`${apiUrl()}/api/v1/crm/contacts/${encodeURIComponent(id)}`, {
    headers: headers(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`crm contact: ${res.status}`);
  const body = (await res.json()) as { contact: CrmContactDto | null };
  return body.contact;
}

export type SalesDocLineDto = {
  sku: string;
  description: string;
  quantity: number;
  unit: string;
  unitPriceRial: number;
  discountRial: number;
  lineTotalRial: number;
};

export type SalesQuoteApi = {
  number: string;
  accountCode: string;
  validUntil: string;
  status: 'draft' | 'accepted' | 'rejected' | 'expired';
  totalToman: number;
  lines: SalesDocLineDto[];
  relatedLead?: string;
};

export type SalesOrderApi = {
  number: string;
  accountCode: string;
  quoteNumber?: string;
  supplyStatus: 'not_reserved' | 'partial' | 'ready' | 'shipped';
  deliveredLabel: string;
  amountToman: number;
  status: string;
  lines: SalesDocLineDto[];
};

export type SalesInvoiceApi = {
  number: string;
  customerName: string;
  customerCode?: string;
  orderNumber: string;
  invoiceDate: string;
  dueDate: string;
  status: 'draft' | 'posted';
  amountToman: number;
  lines: SalesDocLineDto[];
  glJournalId?: string;
  glDocNumber?: string;
};

export type SalesReturnApi = {
  id: string;
  customerName: string;
  customerCode?: string;
  sourceInvoice: string;
  date: string;
  reason: string;
  grossToman: number;
  taxToman: number;
  creditToman: number;
  status: 'draft' | 'posted';
  glJournalId?: string;
  glDoc?: string;
  wmsReceiptDocNo?: string;
  lines: SalesDocLineDto[];
};

export async function fetchSalesQuotes(): Promise<{ quotes: SalesQuoteApi[]; source: string }> {
  const res = await fetch(`${apiUrl()}/api/v1/sales/quotes`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`sales quotes: ${res.status}`);
  return (await res.json()) as { quotes: SalesQuoteApi[]; source: string };
}

export async function fetchSalesQuote(number: string): Promise<{ quote: SalesQuoteApi | null; source: string }> {
  const res = await fetch(`${apiUrl()}/api/v1/sales/quotes/${encodeURIComponent(number)}`, {
    headers: headers(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`sales quote: ${res.status}`);
  return (await res.json()) as { quote: SalesQuoteApi | null; source: string };
}

export async function fetchSalesOrders(): Promise<{ orders: SalesOrderApi[]; source: string }> {
  const res = await fetch(`${apiUrl()}/api/v1/sales/orders`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`sales orders: ${res.status}`);
  return (await res.json()) as { orders: SalesOrderApi[]; source: string };
}

export async function fetchSalesOrder(number: string): Promise<{ order: SalesOrderApi | null; source: string }> {
  const res = await fetch(`${apiUrl()}/api/v1/sales/orders/${encodeURIComponent(number)}`, {
    headers: headers(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`sales order: ${res.status}`);
  return (await res.json()) as { order: SalesOrderApi | null; source: string };
}

export async function fetchSalesInvoices(): Promise<{ invoices: SalesInvoiceApi[]; source: string }> {
  const res = await fetch(`${apiUrl()}/api/v1/sales/invoices`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`sales invoices: ${res.status}`);
  return (await res.json()) as { invoices: SalesInvoiceApi[]; source: string };
}

export async function fetchSalesInvoice(number: string): Promise<{ invoice: SalesInvoiceApi | null; source: string }> {
  const res = await fetch(`${apiUrl()}/api/v1/sales/invoices/${encodeURIComponent(number)}`, {
    headers: headers(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`sales invoice: ${res.status}`);
  return (await res.json()) as { invoice: SalesInvoiceApi | null; source: string };
}

export async function fetchSalesReturns(): Promise<{ returns: SalesReturnApi[]; source: string }> {
  const res = await fetch(`${apiUrl()}/api/v1/sales/returns`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`sales returns: ${res.status}`);
  return (await res.json()) as { returns: SalesReturnApi[]; source: string };
}

export async function fetchSalesReturn(id: string): Promise<{ return: SalesReturnApi | null; source: string }> {
  const res = await fetch(`${apiUrl()}/api/v1/sales/returns/${encodeURIComponent(id)}`, {
    headers: headers(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`sales return: ${res.status}`);
  return (await res.json()) as { return: SalesReturnApi | null; source: string };
}

export async function createSalesQuote(body: {
  accountCode: string;
  validUntil?: string;
  relatedLead?: string;
  lines: SalesDocLineDto[];
}) {
  return postJson<{ quote: SalesQuoteApi; source: string }>('/api/v1/sales/quotes', body);
}

export async function createSalesOrder(body: { accountCode: string; quoteNumber?: string; lines: SalesDocLineDto[] }) {
  return postJson<{ order: SalesOrderApi; source: string }>('/api/v1/sales/orders', body);
}

export async function confirmSalesOrderSupply(orderNumber: string) {
  return postJson<{
    order: SalesOrderApi;
    reservations: Array<{ id: string; sku: string; qty: number }>;
    source: string;
  }>(`/api/v1/sales/orders/${encodeURIComponent(orderNumber)}/confirm`, {}, `confirm-${orderNumber}`);
}

export type SalesOrderFulfillmentApi = {
  orderNumber: string;
  supplyStatus: SalesOrderApi['supplyStatus'];
  wmsIssueDocNo: string | null;
  wmsIssueGlDocNumber?: string;
  invoiceNumber: string | null;
  invoiceStatus: 'draft' | 'posted' | null;
  invoiceGlDocNumber?: string;
  activeReservationCount: number;
};

export async function fetchSalesOrderFulfillment(orderNumber: string) {
  const res = await fetch(
    `${apiUrl()}/api/v1/sales/orders/${encodeURIComponent(orderNumber)}/fulfillment`,
    { headers: headers(), cache: 'no-store' },
  );
  if (!res.ok) throw new Error(`sales order fulfillment: ${res.status}`);
  return (await res.json()) as { fulfillment: SalesOrderFulfillmentApi; source: string };
}

export async function fulfillSalesOrder(
  orderNumber: string,
  body: { postCogs?: boolean; autoPostInvoice?: boolean } = {},
) {
  return postJson<{
    order: SalesOrderApi;
    issue: { docNo: string; glDocNumber?: string };
    invoice?: { number: string; status: string; glDocNumber?: string };
    replay: boolean;
    source: string;
  }>(`/api/v1/sales/orders/${encodeURIComponent(orderNumber)}/fulfill`, body, `fulfill-${orderNumber}`);
}

export async function createSalesInvoice(body: {
  customerName: string;
  customerCode?: string;
  orderNumber: string;
  invoiceDate?: string;
  dueDate?: string;
  lines: SalesDocLineDto[];
}) {
  return postJson<{ invoice: SalesInvoiceApi; source: string }>('/api/v1/sales/invoices', body);
}

export async function postSalesInvoice(number: string, idempotencyKey?: string) {
  return postJson<{ invoice: SalesInvoiceApi; status: string; source: string }>(
    `/api/v1/sales/invoices/${encodeURIComponent(number)}/post`,
    {},
    idempotencyKey ?? `post-invoice-${number}`,
  );
}

export async function createSalesReturn(body: {
  customerName: string;
  customerCode?: string;
  sourceInvoice: string;
  reason: string;
  date?: string;
  lines: SalesDocLineDto[];
  taxToman?: number;
}) {
  return postJson<{ return: SalesReturnApi; source: string }>('/api/v1/sales/returns', body);
}

export type SalesFulfillmentKpisApi = {
  ordersReadyToShip: number;
  ordersShipped: number;
  ordersAwaitingSupply: number;
  returnsPostedMonth: number;
  restockReceiptsMonth: number;
  returnCreditTomanMonth: number;
  sources: string[];
};

export async function fetchSalesFulfillmentKpis(): Promise<{
  kpis: SalesFulfillmentKpisApi;
  source: string;
}> {
  const res = await fetch(`${apiUrl()}/api/v1/sales/overview/fulfillment-kpis`, {
    headers: headers(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`sales fulfillment kpis: ${res.status}`);
  return (await res.json()) as { kpis: SalesFulfillmentKpisApi; source: string };
}

export async function createSalesReturnFromInvoice(invoiceNumber: string, reason?: string) {
  return postJson<{ return: SalesReturnApi; source: string }>(
    `/api/v1/sales/invoices/${encodeURIComponent(invoiceNumber)}/return-draft`,
    { reason: reason ?? 'برگشت کالا پس از فروش' },
    `return-draft-${invoiceNumber}`,
  );
}

export async function postSalesReturn(
  id: string,
  options?: { restock?: boolean; idempotencyKey?: string },
) {
  const key = options?.idempotencyKey ?? `post-return-${id}`;
  return postJson<{
    return: SalesReturnApi;
    status: string;
    wmsReceiptDocNo?: string;
    source: string;
  }>(`/api/v1/sales/returns/${encodeURIComponent(id)}/post`, { restock: options?.restock ?? false }, key);
}
