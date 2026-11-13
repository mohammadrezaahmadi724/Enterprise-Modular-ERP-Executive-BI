import { randomUUID } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { TenantContext } from '@repo/domain';
import { listInventoryLotsPrisma, upsertInventoryLotPrisma } from '../src/prisma/inventory-lot.repository';

const TENANT = '66666666-6666-4666-8666-666666666666';

describe('inventory lot repository (no-op when CRM_PERSISTENCE off)', () => {
  it('upsert and list do not throw when persistence disabled', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        await expect(
          upsertInventoryLotPrisma({
            lotNumber: 'LOT-TEST',
            productId: 'PRD-CHAY',
            warehouseId: 'WH-MSH',
            quantity: 5n,
            expiryDate: '2030-01-01',
            status: 'active',
            receivedAt: new Date().toISOString(),
          }),
        ).resolves.toBeUndefined();
        const rows = await listInventoryLotsPrisma();
        expect(rows).toEqual([]);
      },
    );
  });
});
