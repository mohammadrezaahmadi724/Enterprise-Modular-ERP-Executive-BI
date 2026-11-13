import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { resetSalesStores } from '@repo/db-erp-operations';
import { createInvoiceFromShippedOrder } from '../src/bridges/sales-fulfillment.bridge';
import { confirmOrderSupply, getOrder, markSalesOrderShipped } from '../src/modules/sales/sales.service';

const TENANT = '55555555-5555-4555-8555-555555555555';

describe('sales fulfillment invoice', () => {
  beforeEach(() => {
    resetSalesStores();
  });

  it('creates draft invoice idempotently for shipped order', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        await confirmOrderSupply('SO-0480');
        const order = await getOrder('SO-0480');
        expect(order).not.toBeNull();
        await markSalesOrderShipped('SO-0480', 'STK-TEST-001');

        const inv1 = await createInvoiceFromShippedOrder('SO-0480');
        const inv2 = await createInvoiceFromShippedOrder('SO-0480');
        expect(inv1.number).toBe(inv2.number);
        expect(inv1.status).toBe('draft');
        expect(inv1.orderNumber).toBe('SO-0480');
      },
    );
  });
});
