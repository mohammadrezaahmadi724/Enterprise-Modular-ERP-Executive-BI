import { describe, it, expect } from 'vitest';
import { TenantContext } from '../src/tenant-context.js';
import { TenantContextMissingError } from '../src/errors/tenant-context-missing.error.js';

describe('TenantContext — خلأ ۱ — بند ۱.۱ Tenant Isolation', () => {
  const sample = {
    tenantId: '11111111-1111-4111-8111-111111111111',
    userId: '22222222-2222-4222-8222-222222222222',
    correlationId: 'corr-1',
    traceId: 'trace-1',
    isSuperAdmin: false,
  };

  it('run/get باید همان کانتکست را برگرداند', () => {
    TenantContext.run(sample, () => {
      expect(TenantContext.get().tenantId).toBe(sample.tenantId);
      expect(TenantContext.requireTenantId()).toBe(sample.tenantId);
    });
  });

  it('خارج از run باید TenantContextMissingError پرتاب شود', () => {
    expect(() => TenantContext.get()).toThrow(TenantContextMissingError);
    expect(TenantContext.getOrNull()).toBeNull();
  });
});
