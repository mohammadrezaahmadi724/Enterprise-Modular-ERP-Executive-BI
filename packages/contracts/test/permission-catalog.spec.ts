import { describe, expect, it } from 'vitest';
import {
  MODULE_PERMISSION_MATRIX,
  PERMISSION_CATALOG,
  filterRailIdsByPermissions,
  permissionsForActiveModules,
} from '../src/rbac/permission-catalog';

describe('permission catalog', () => {
  it('includes tenant admin permissions', () => {
    expect(PERMISSION_CATALOG.some((p) => p.code === 'tenant.users.read')).toBe(true);
  });

  it('maps finance module to finance.*', () => {
    const perms = permissionsForActiveModules(['finance']);
    expect(perms).toContain('finance.read');
    expect(MODULE_PERMISSION_MATRIX.finance).toContain('finance.write');
  });

  it('hides finance rail without permission', () => {
    const allow = filterRailIdsByPermissions(['operations.read']);
    expect(allow('finance')).toBe(false);
    expect(allow('sales')).toBe(true);
    const crmOnly = filterRailIdsByPermissions(['crm.read']);
    expect(crmOnly('sales')).toBe(false);
  });
});
