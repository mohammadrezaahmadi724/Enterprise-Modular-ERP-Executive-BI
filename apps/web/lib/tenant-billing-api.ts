import { apiBase } from './api-base';
import { DEFAULT_TENANT_ADMIN_USER_ID, DEFAULT_TENANT_ID, tenantApiHeaders } from './tenant-api-headers';

function headers() {
  return tenantApiHeaders({ userId: DEFAULT_TENANT_ADMIN_USER_ID });
}

export type TenantSubscriptionSummary = {
  tenantId: string;
  planLabel: string;
  status: string;
  seats: number;
  usedSeats: number;
  currentPeriodEnd: string | null;
  activeErpModules: string[];
  source: 'database' | 'demo';
};

export type TenantInvoiceRow = {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  status: string;
  totalTomans: number;
  currency: string;
};

export async function fetchTenantSubscription(): Promise<TenantSubscriptionSummary> {
  const res = await fetch(`${apiBase()}/api/v1/tenant/billing/subscription`, {
    headers: headers(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`subscription: ${res.status}`);
  return (await res.json()) as TenantSubscriptionSummary;
}

export async function fetchTenantInvoices(): Promise<TenantInvoiceRow[]> {
  const res = await fetch(`${apiBase()}/api/v1/tenant/billing/invoices`, {
    headers: headers(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`invoices: ${res.status}`);
  const body = (await res.json()) as { invoices: TenantInvoiceRow[] };
  return body.invoices;
}
