import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { resetSalesStores } from '@repo/db-erp-operations';
import {
  createBatch,
  createReceipt,
  listBatches,
  listExpiringBatches,
  resetWmsStoresForTest,
  suggestFefoPick,
} from '../src/modules/wms/wms.service';

const TENANT = '77777777-7777-4777-8777-777777777777';

function isoAfterDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

describe('WMS FEFO pick preview & expiry listing', () => {
  beforeEach(() => {
    resetSalesStores();
    resetWmsStoresForTest();
  });

  it('suggests earliest-expiry batches without consuming stock', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        await createReceipt({
          lines: [{ sku: 'PRD-FEFO', warehouse: 'WH-ESF', quantity: 20, unitPriceRial: 900_000 }],
        });
        await createBatch({
          sku: 'PRD-FEFO',
          warehouse: 'WH-ESF',
          qty: 10,
          batchNo: 'BTH-OLD',
          expiryDate: '2020-06-01',
        });
        await createBatch({
          sku: 'PRD-FEFO',
          warehouse: 'WH-ESF',
          qty: 10,
          batchNo: 'BTH-NEW',
          expiryDate: '2099-06-01',
        });

        const before = await listBatches(false);
        const pick = await suggestFefoPick('PRD-FEFO', 'WH-ESF', 7);
        const after = await listBatches(false);

        expect(pick.allocations).toEqual([
          { batchNo: 'BTH-OLD', qty: 7, expiryDate: '2020-06-01' },
        ]);
        expect(pick.uncoveredQty).toBe(0);
        expect(before).toEqual(after);
      },
    );
  });

  it('lists active lots expiring within the window', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        await createReceipt({
          lines: [{ sku: 'PRD-CHAY', warehouse: 'WH-MSH', quantity: 5, unitPriceRial: 500_000 }],
        });
        await createBatch({
          sku: 'PRD-CHAY',
          warehouse: 'WH-MSH',
          qty: 5,
          batchNo: 'BTH-SOON',
          expiryDate: isoAfterDays(10),
        });
        await createBatch({
          sku: 'PRD-CHAY',
          warehouse: 'WH-MSH',
          qty: 5,
          batchNo: 'BTH-LATE',
          expiryDate: isoAfterDays(90),
        });

        const expiring = await listExpiringBatches(30, false);
        expect(expiring.map((b) => b.batchNo)).toContain('BTH-SOON');
        expect(expiring.map((b) => b.batchNo)).not.toContain('BTH-LATE');
      },
    );
  });
});
