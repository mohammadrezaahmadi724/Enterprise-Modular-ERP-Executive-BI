import { describe, it, expect, beforeEach } from 'vitest';
import { resetSalesStores, reserveStockWithLock, seedInventory } from '../src/sales/confirm-order.saga';

describe('Stock reservation — Wave 2', () => {
  beforeEach(() => resetSalesStores());

  it('رزرو با موجودی کافی', () => {
    seedInventory('p1:wh1', 50n);
    expect(reserveStockWithLock('p1', 'wh1', 10n)).toBe(true);
    expect(reserveStockWithLock('p1', 'wh1', 50n)).toBe(false);
  });
});
