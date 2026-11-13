import { rbacCatalogForTenant } from '../../modules/tenant-rbac/tenant-rbac.service';

export function rbacCatalogQuery(tenantId: string) {
  return rbacCatalogForTenant(tenantId);
}
