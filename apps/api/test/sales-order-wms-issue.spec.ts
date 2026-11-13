import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { resetSalesStores } from '@repo/db-erp-operations';
import { createWmsIssueForSalesOrder } from '../src/bridges/sales-wms.bridge';
import { confirmOrderSupply, getOrder } from '../src/modules/sales/sales.service';
import { createBatch, listReservations, resetWmsStoresForTest } from '../src/modules/wms/wms.service';

const TENANT = '44444444-4444-4444-8444-444444444444';

describe('Sales SO → WMS issue (shipment)', () => {
  beforeEach(() => {
    resetSalesStores();
    resetWmsStoresForTest();
  });

  it('issues against ready SO, consumes reservation, marks shipped', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        await confirmOrderSupply('SO-0480');
        await createBatch({
          sku: 'PRD-1016',
          warehouse: 'WH-ESF',
          qty: 20,
          batchNo: 'BTH-SO-0480',
          expiryDate: '2099-06-01',
        });

        const { doc, invoice } = await createWmsIssueForSalesOrder({
          orderRef: 'SO-0480',
          lines: [{ sku: 'PRD-1016', warehouse: 'WH-ESF', quantity: 10 }],
        });
        expect(doc.docNo).toMatch(/^STK-/);
        expect(invoice?.orderNumber).toBe('SO-0480');
        expect(invoice?.status).toBe('draft');

        const order = await getOrder('SO-0480');
        expect(order?.supplyStatus).toBe('shipped');

        const active = (await listReservations()).filter(
          (r) => r.reference === 'SO-0480' && r.status === 'active',
        );
        expect(active.length).toBe(0);
      },
    );
  });

  it('rejects issue when supply not confirmed', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        await expect(
          createWmsIssueForSalesOrder({
            orderRef: 'SO-0480',
            lines: [{ sku: 'PRD-1016', warehouse: 'WH-ESF', quantity: 10 }],
          }),
        ).rejects.toThrow(/confirm supply first/i);
      },
    );
  });
});
