import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { resetSalesStores } from '@repo/db-erp-operations';
import { confirmOrderSupply } from '../src/modules/sales/sales.service';
import { listReservations, resetWmsStoresForTest } from '../src/modules/wms/wms.service';

const TENANT = '33333333-3333-4333-8333-333333333333';

describe('Sales order supply confirm → WMS reservation', () => {
  beforeEach(() => {
    resetSalesStores();
    resetWmsStoresForTest();
  });

  it('reserves stock and marks order ready', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const { order, reservations } = await confirmOrderSupply('SO-0480');
        expect(order.supplyStatus).toBe('ready');
        expect(order.status).toBe('Confirmed');
        expect(reservations.length).toBe(1);
        expect(reservations[0]!.sku).toBe('PRD-1016');

        const active = (await listReservations()).filter((r) => r.reference === 'SO-0480');
        expect(active.length).toBeGreaterThanOrEqual(1);
      },
    );
  });
});
