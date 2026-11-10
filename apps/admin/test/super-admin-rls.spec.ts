import { describe, expect, it } from 'vitest';
import { assertErpTenantDataAccess } from '../../api/src/modules/platform/break-glass.service';

describe('Super Admin RLS — erp_*', () => {
  it('بدون Break-Glass → deny', () => {
    expect(() => assertErpTenantDataAccess({ isSuperAdmin: true, breakGlassSessionId: null })).toThrow(
      'ERP_TENANT_DATA_DENIED_WITHOUT_BREAK_GLASS',
    );
  });

  it('با session → allow', () => {
    expect(() => assertErpTenantDataAccess({ isSuperAdmin: true, breakGlassSessionId: 'sess-1' })).not.toThrow();
  });
});
