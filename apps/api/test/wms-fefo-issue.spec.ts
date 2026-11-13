import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { resetSalesStores } from '@repo/db-erp-operations';
import {
  createBatch,
  createIssue,
  createReceipt,
  listBatches,
  resetWmsStoresForTest,
} from '../src/modules/wms/wms.service';

const TENANT = '77777777-7777-4777-8777-777777777777';

describe('WMS FEFO issue consumption', () => {
  beforeEach(() => {
    resetSalesStores();
    resetWmsStoresForTest();
  });

  it('consumes earlier-expiry batch first', async () => {
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

        await createIssue({
          lines: [{ sku: 'PRD-FEFO', warehouse: 'WH-ESF', quantity: 5 }],
        });

        const batches = await listBatches(false);
        const old = batches.find((b) => b.batchNo === 'BTH-OLD');
        const newer = batches.find((b) => b.batchNo === 'BTH-NEW');
        expect(old?.qty).toBe(5);
        expect(newer?.qty).toBe(10);
      },
    );
  });
});
