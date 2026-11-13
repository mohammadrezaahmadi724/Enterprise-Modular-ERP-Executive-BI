import { describe, expect, it, beforeEach } from 'vitest';
import {
  publishSalesFulfillmentProjection,
  readSalesFulfillmentKpis,
  resetMetricQueryStore,
} from '../src/index';

const TENANT = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';

describe('projection_sales_fulfillment', () => {
  beforeEach(() => resetMetricQueryStore());

  it('stores and reads fulfillment KPIs from projection', () => {
    publishSalesFulfillmentProjection(TENANT, {
      ordersReadyToShip: 4,
      ordersShipped: 12,
      ordersAwaitingSupply: 6,
    });
    const kpis = readSalesFulfillmentKpis(TENANT);
    expect(kpis?.ordersReadyToShip).toBe(4);
    expect(kpis?.ordersShipped).toBe(12);
    expect(kpis?.ordersAwaitingSupply).toBe(6);
    expect(kpis?.sources).toContain('projection_sales_fulfillment');
  });
});
