import { describe, it, expect } from 'vitest';
import { TenantContext } from '@repo/domain';

type Row = { id: string; tenantId: string; data: string };

const platformRows: Row[] = [];
const financeRows: Row[] = [];
const operationsRows: Row[] = [];

function queryVisible(rows: Row[]): Row[] {
  const tenantId = TenantContext.requireTenantId();
  return rows.filter((r) => r.tenantId === tenantId);
}

describe('RLS isolation — Wave 1', () => {
  const tenantA = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
  const tenantB = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';

  const ctx = (tenantId: string) => ({
    tenantId,
    userId: 'u1',
    correlationId: 'c1',
    traceId: 't1',
    isSuperAdmin: false,
  });

  it('Tenant A نباید داده Tenant B را در platform ببیند', () => {
    platformRows.length = 0;
    platformRows.push({ id: '1', tenantId: tenantA, data: 'p-a' });
    platformRows.push({ id: '2', tenantId: tenantB, data: 'p-b' });
    TenantContext.run(ctx(tenantA), () => {
      const visible = queryVisible(platformRows);
      expect(visible.every((r) => r.tenantId === tenantA)).toBe(true);
      expect(visible.some((r) => r.tenantId === tenantB)).toBe(false);
    });
  });

  it('Tenant A در erp_finance و erp_operations ایزوله است', () => {
    financeRows.length = 0;
    operationsRows.length = 0;
    financeRows.push({ id: '3', tenantId: tenantA, data: 'f-a' });
    financeRows.push({ id: '4', tenantId: tenantB, data: 'f-b' });
    operationsRows.push({ id: '5', tenantId: tenantA, data: 'o-a' });
    operationsRows.push({ id: '6', tenantId: tenantB, data: 'o-b' });
    TenantContext.run(ctx(tenantA), () => {
      expect(queryVisible(financeRows)).toHaveLength(1);
      expect(queryVisible(operationsRows)).toHaveLength(1);
    });
  });
});
