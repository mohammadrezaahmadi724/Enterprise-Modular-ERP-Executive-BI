import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { resetSalesStores } from '@repo/db-erp-operations';
import {
  createReceipt,
  listBatches,
  resetWmsStoresForTest,
  runWmsExpiryMaintenance,
} from '../src/modules/wms/wms.service';

const TENANT = '77777777-7777-4777-8777-777777777777';

describe('WMS receipt batch expiry + maintenance', () => {
  beforeEach(() => {
    resetSalesStores();
    resetWmsStoresForTest();
  });

  it('registers batch expiry from receipt line', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        await createReceipt({
          lines: [
            {
              sku: 'PRD-CHAY',
              warehouse: 'WH-MSH',
              quantity: 4,
              unitPriceRial: 800_000,
              batch: 'BTH-RCPT-01',
              batchExpiry: '2030-12-31',
            },
          ],
        });

        const batches = await listBatches(false);
        const row = batches.find((b) => b.batchNo === 'BTH-RCPT-01');
        expect(row?.qty).toBe(4);
        expect(row?.expiryDate).toBe('2030-12-31');
      },
    );
  });

  it('runWmsExpiryMaintenance returns counts', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const result = await runWmsExpiryMaintenance(30);
        expect(result).toMatchObject({ expired: expect.any(Number), expiringCount: expect.any(Number) });
      },
    );
  });
});
