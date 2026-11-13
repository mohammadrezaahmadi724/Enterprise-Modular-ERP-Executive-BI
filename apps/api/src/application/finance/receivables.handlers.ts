import { TenantContext } from '@repo/domain';
import { queryArOpenItemsProjection } from '@repo/db-erp-bi-risk';

export function receivablesOpenItemsQuery() {
  const tenantId = TenantContext.requireTenantId();
  return queryArOpenItemsProjection(tenantId);
}
