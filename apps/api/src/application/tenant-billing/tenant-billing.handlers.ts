import {
  getTenantSubscriptionSummary,
  listTenantInvoices,
} from '../../modules/tenant-billing/tenant-billing.service';

export function tenantSubscriptionQuery(tenantId: string) {
  return getTenantSubscriptionSummary(tenantId);
}

export function tenantInvoicesQuery(tenantId: string) {
  return listTenantInvoices(tenantId);
}
