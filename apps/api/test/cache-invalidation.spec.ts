import { describe, it, expect, beforeEach } from 'vitest';
import { cacheGet, cacheSet, invalidateByEvent, resetCache } from '../src/cache/invalidation';
import { SALES_EVENTS } from '@repo/contracts';

describe('Cache invalidation — خلأ ۹ — بند ۴.۵', () => {
  beforeEach(() => resetCache());

  it('SalesOrderConfirmed باید کش KPI و محصول را invalidate کند', () => {
    cacheSet('product:sku-1', { stock: 10 });
    cacheSet('kpi:sales:month', { total: 100 });
    cacheSet('unrelated:key', { x: 1 });
    const removed = invalidateByEvent(SALES_EVENTS.SALES_ORDER_CONFIRMED);
    expect(removed).toContain('product:sku-1');
    expect(removed).toContain('kpi:sales:month');
    expect(cacheGet('unrelated:key')).toBeTruthy();
  });
});
