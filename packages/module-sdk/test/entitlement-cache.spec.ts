import { describe, it, expect } from 'vitest';
import { EntitlementCache } from '../src/cache/entitlement-cache.js';

describe('EntitlementCache invalidation — خلأ ۱۲ — بند ۴.۶', () => {
  it('غیرفعال‌سازی باید کش را بلافاصله invalidate کند', () => {
    const cache = new EntitlementCache(5 * 60 * 1000);
    const tenantId = '11111111-1111-4111-8111-111111111111';
    cache.set(tenantId, 'sales', true);
    expect(cache.get(tenantId, 'sales')).toBe(true);
    cache.invalidate(tenantId, 'sales');
    expect(cache.get(tenantId, 'sales')).toBeNull();
  });

  it('بدون invalidate، مقدار کش تا پایان TTL معتبر بماند', () => {
    const cache = new EntitlementCache(60_000);
    const tenantId = '22222222-2222-4222-8222-222222222222';
    cache.set(tenantId, 'hr', false);
    expect(cache.get(tenantId, 'hr')).toBe(false);
  });
});
