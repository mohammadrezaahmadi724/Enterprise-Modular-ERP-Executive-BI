import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { resetSalesStores } from '@repo/db-erp-operations';
import { createIssue, createReceipt, listStock, resetWmsStoresForTest } from '../src/modules/wms/wms.service';

const TENANT = '22222222-2222-4222-8222-222222222222';

describe('WMS stock issue guard', () => {
  beforeEach(() => {
    resetSalesStores();
    resetWmsStoresForTest();
  });

  it('rejects issue when available insufficient', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        await createReceipt({
          lines: [{ sku: 'PRD-TEST', warehouse: 'WH-ESF', quantity: 5 }],
        });
        await expect(
          createIssue({
            lines: [{ sku: 'PRD-TEST', warehouse: 'WH-ESF', quantity: 999 }],
          }),
        ).rejects.toThrow(/negative inventory/i);
        const stock = await listStock();
        const row = stock.find((s) => s.sku === 'PRD-TEST' && s.warehouse === 'WH-ESF');
        expect(row?.onHand).toBe(5);
      },
    );
  });
});
