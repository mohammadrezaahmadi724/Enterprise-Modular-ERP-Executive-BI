import { describe, expect, it, beforeEach } from 'vitest';
import {
  publishSalesReverseSupplyProjection,
  readSalesReverseSupplyKpis,
  resetMetricQueryStore,
} from '../src/index';

const TENANT = 'dddddddd-dddd-4ddd-8ddd-dddddddddddd';

describe('projection_sales_reverse_supply', () => {
  beforeEach(() => resetMetricQueryStore());

  it('stores return and restock KPIs', () => {
    publishSalesReverseSupplyProjection(TENANT, {
      returnsPostedMonth: 2,
      restockReceiptsMonth: 1,
      returnCreditTomanMonth: 45_000_000,
    });
    const kpis = readSalesReverseSupplyKpis(TENANT);
    expect(kpis?.returnsPostedMonth).toBe(2);
    expect(kpis?.restockReceiptsMonth).toBe(1);
    expect(kpis?.returnCreditTomanMonth).toBe(45_000_000);
    expect(kpis?.sources).toContain('projection_sales_reverse_supply');
  });
});
