import { describe, it, expect, beforeEach } from 'vitest';
import { buildMenuForTenant, setTenantModules } from '../src/modules/platform/menu.service';

describe('Dynamic menu — Wave 1', () => {
  const tenantId = '11111111-1111-4111-8111-111111111111';

  beforeEach(() => setTenantModules(tenantId, ['crm-base']));

  it('tenant با فقط CRM نباید منوی Finance داشته باشد', () => {
    const items = buildMenuForTenant(tenantId);
    const paths = items.map((i) => i.path);
    expect(paths.some((p) => p.startsWith('/crm/'))).toBe(true);
    expect(paths.some((p) => p.startsWith('/finance/'))).toBe(false);
  });

  it('tenant با finance + crm باید هر دو منو را داشته باشد', () => {
    setTenantModules(tenantId, ['crm-base', 'finance-base']);
    const paths = buildMenuForTenant(tenantId).map((i) => i.path);
    expect(paths.some((p) => p.includes('finance'))).toBe(true);
    expect(paths.some((p) => p.includes('crm'))).toBe(true);
  });
});
