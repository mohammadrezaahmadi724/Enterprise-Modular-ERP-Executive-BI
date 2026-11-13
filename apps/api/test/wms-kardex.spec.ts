import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { resetSalesStores } from '@repo/db-erp-operations';
import { resetMetricQueryStore, resetWmsKardexReadModel } from '@repo/db-erp-bi-risk';
import { createReceipt, getKardex, resetWmsStoresForTest } from '../src/modules/wms/wms.service';

const TENANT = '44444444-4444-4444-8444-444444444444';

describe('WMS kardex read model', () => {
  beforeEach(() => {
    resetSalesStores();
    resetWmsStoresForTest();
    resetMetricQueryStore();
    resetWmsKardexReadModel();
  });

  it('returns projection entries after receipt', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        await createReceipt({
          lines: [{ sku: 'PRD-KDX', warehouse: 'WH-ESF', quantity: 3, unitPriceRial: 500_000 }],
        });
        const kardex = await getKardex();
        expect(kardex.entries.some((e) => e.sku === 'PRD-KDX' && e.qtyIn === 3)).toBe(true);
        expect(kardex.totals.ok).toBeGreaterThan(0);
      },
    );
  });
});
