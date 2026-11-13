import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { resetSalesStores } from '@repo/db-erp-operations';
import { resetMetricQueryStore, resetWmsKardexReadModel, resetWmsTrackingReadModel } from '@repo/db-erp-bi-risk';
import {
  createStocktakingSession,
  postStocktakingSession,
  resetWmsStoresForTest,
  updateStocktakingLine,
} from '../src/modules/wms/wms.service';

const TENANT = '55555555-5555-4555-8555-555555555555';

describe('WMS stocktaking post', () => {
  beforeEach(() => {
    resetSalesStores();
    resetWmsStoresForTest();
    resetMetricQueryStore();
    resetWmsKardexReadModel();
    resetWmsTrackingReadModel();
  });

  it('applies adjustment when count differs', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const session = await createStocktakingSession({ warehouse: 'WH-ESF' });
        const sku = session.lines?.[0]?.sku;
        expect(sku).toBeTruthy();
        await updateStocktakingLine(session.id, { sku: sku!, countedQty: (session.lines![0]!.systemQty ?? 0) + 2 });
        const posted = await postStocktakingSession(session.id, '00000000-0000-4000-8000-000000000001');
        expect(posted.status).toBe('reconciled');
        expect(posted.varianceLines).toBeGreaterThanOrEqual(1);
        expect(posted.glDocNumber).toBeTruthy();
      },
    );
  });
});
