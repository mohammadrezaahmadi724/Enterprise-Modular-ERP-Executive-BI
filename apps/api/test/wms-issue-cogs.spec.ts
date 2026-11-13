import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { resetSalesStores } from '@repo/db-erp-operations';
import { resetWmsTrackingReadModel, upsertTrackingContract } from '@repo/db-erp-bi-risk';
import { createIssue, createReceipt, resetWmsStoresForTest } from '../src/modules/wms/wms.service';

const TENANT = '99999999-9999-4999-8999-999999999999';

describe('WMS issue COGS GL', () => {
  beforeEach(() => {
    resetSalesStores();
    resetWmsStoresForTest();
    resetWmsTrackingReadModel();
  });

  it('posts GL doc when postCogs is true', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        upsertTrackingContract(TENANT, {
          sku: 'PRD-COGS',
          name: 'کالای COGS',
          baseUnit: 'عدد',
          method: 'بدون ردیابی',
          decimals: 0,
          fefo: false,
          minShelf: '—',
          flags: [],
          version: 1,
        });
        await createReceipt({
          lines: [{ sku: 'PRD-COGS', warehouse: 'WH-ESF', quantity: 20, unitPriceRial: 2_000_000 }],
        });
        const issue = await createIssue(
          {
            lines: [{ sku: 'PRD-COGS', warehouse: 'WH-ESF', quantity: 2 }],
            postCogs: true,
          },
          '00000000-0000-4000-8000-000000000001',
        );
        expect(issue.glDocNumber).toBeTruthy();
      },
    );
  });
});
