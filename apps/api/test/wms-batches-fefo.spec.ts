import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { resetSalesStores } from '@repo/db-erp-operations';
import {
  createBatch,
  createReceipt,
  listBatches,
  resetWmsStoresForTest,
  runBatchExpiry,
} from '../src/modules/wms/wms.service';

const TENANT = '66666666-6666-4666-8666-666666666666';

describe('WMS batches FEFO', () => {
  beforeEach(() => {
    resetSalesStores();
    resetWmsStoresForTest();
  });

  it('orders by expiry and marks expired lots', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        await createBatch({
          sku: 'PRD-CHAY',
          warehouse: 'WH-MSH',
          qty: 5,
          batchNo: 'BTH-LATE',
          expiryDate: '2099-12-31',
        });
        await createBatch({
          sku: 'PRD-CHAY',
          warehouse: 'WH-MSH',
          qty: 3,
          batchNo: 'BTH-SOON',
          expiryDate: '2020-01-01',
        });
        const fefo = await listBatches(true);
        expect(fefo[0]?.batchNo).toBe('BTH-SOON');

        const { expired } = await runBatchExpiry();
        expect(expired).toBeGreaterThanOrEqual(1);

        await createReceipt({
          lines: [{ sku: 'PRD-1016', warehouse: 'WH-ESF', quantity: 2, batch: 'BTH-RCV-1' }],
        });
        const batches = await listBatches(false);
        expect(batches.some((b) => b.batchNo === 'BTH-RCV-1')).toBe(true);
      },
    );
  });
});
