import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { resetSalesStores } from '@repo/db-erp-operations';
import { resetMetricQueryStore, resetWmsTrackingReadModel, upsertTrackingContract } from '@repo/db-erp-bi-risk';
import { createIssue, createReceipt, resetWmsStoresForTest } from '../src/modules/wms/wms.service';

const TENANT = '88888888-8888-4888-8888-888888888888';

describe('WMS batch coverage enforcement', () => {
  beforeEach(() => {
    resetSalesStores();
    resetWmsStoresForTest();
    resetMetricQueryStore();
    resetWmsTrackingReadModel();
  });

  it('rejects issue when FEFO SKU has stock but no batches', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        upsertTrackingContract(TENANT, {
          sku: 'PRD-STRICT',
          name: 'کالای FEFO',
          baseUnit: 'عدد',
          method: 'ردیابی بهر',
          decimals: 0,
          fefo: true,
          minShelf: '90 روز',
          flags: [],
          version: 1,
        });
        await createReceipt({
          lines: [{ sku: 'PRD-STRICT', warehouse: 'WH-ESF', quantity: 10, unitPriceRial: 1_000_000 }],
        });
        await expect(
          createIssue({ lines: [{ sku: 'PRD-STRICT', warehouse: 'WH-ESF', quantity: 1 }] }),
        ).rejects.toThrow(/batch\/FEFO/i);
      },
    );
  });
});
