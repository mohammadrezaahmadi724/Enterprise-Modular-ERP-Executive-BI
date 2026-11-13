import { describe, expect, it, beforeEach } from 'vitest';
import { OPS_EVENTS } from '@repo/contracts';
import {
  applyWmsStockDomainEvent,
  publishWmsKardexStockSnapshot,
  readWmsKardex,
  resetMetricQueryStore,
  resetWmsKardexReadModel,
} from '../src/index';

const TENANT = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';

describe('projection_wms_kardex', () => {
  beforeEach(() => {
    resetMetricQueryStore();
    resetWmsKardexReadModel();
  });

  it('appends receipt lines and exposes totals from snapshot', () => {
    applyWmsStockDomainEvent({
      tenantId: TENANT,
      eventId: 'evt-1',
      eventType: OPS_EVENTS.STOCK_RECEIPT_POSTED,
      payload: {
        docNo: 'STK-1',
        lines: [{ sku: 'PRD-1', warehouse: 'WH-ESF', quantity: 5, unitPriceRial: 1000 }],
      },
    });
    publishWmsKardexStockSnapshot(TENANT, [
      {
        sku: 'PRD-1',
        warehouse: 'WH-ESF',
        onHand: 5,
        reserved: 0,
        blocked: 0,
        available: 5,
        status: 'ok',
      },
    ]);
    const model = readWmsKardex(TENANT);
    expect(model.entries.length).toBe(1);
    expect(model.entries[0]!.qtyIn).toBe(5);
    expect(model.totals.ok).toBe(1);
    expect(model.sources).toContain('projection_wms_kardex');
  });
});
