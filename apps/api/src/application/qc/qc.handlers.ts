import { TenantContext } from '@repo/domain';
import { getQcOverview, listQcInspections, qcSource } from '@repo/db-erp-operations';

export async function qcOverviewQuery() {
  const tenantId = TenantContext.requireTenantId();
  return { overview: await getQcOverview(tenantId), source: qcSource() };
}

export async function qcInspectionsQuery() {
  const tenantId = TenantContext.requireTenantId();
  return { inspections: await listQcInspections(tenantId), source: qcSource() };
}
