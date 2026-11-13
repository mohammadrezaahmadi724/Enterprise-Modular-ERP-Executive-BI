import { randomUUID } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { TenantContext } from '@repo/domain';
import {
  listWmsStockDocumentsPrisma,
  upsertWmsStockDocumentPrisma,
} from '../src/prisma/wms-document.repository';
import {
  listWmsReservationsPrisma,
  upsertWmsReservationPrisma,
} from '../src/prisma/wms-reservation.repository';

const TENANT = '77777777-7777-4777-8777-777777777777';

describe('wms persistence repositories (no-op when WMS_PERSISTENCE off)', () => {
  it('document and reservation upserts do not throw', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        await expect(
          upsertWmsStockDocumentPrisma({
            docNo: 'STK-TEST',
            kind: 'receipt',
            body: { docNo: 'STK-TEST', status: 'posted' },
          }),
        ).resolves.toBeUndefined();
        await expect(
          upsertWmsReservationPrisma({
            id: 'R-TEST',
            body: { id: 'R-TEST', status: 'active' },
            status: 'active',
          }),
        ).resolves.toBeUndefined();
        expect(await listWmsStockDocumentsPrisma()).toEqual([]);
        expect(await listWmsReservationsPrisma()).toEqual([]);
      },
    );
  });
});
