import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { resetSalesStores } from '@repo/db-erp-operations';
import {
  fulfillSalesOrder,
  getOrderFulfillment,
} from '../src/bridges/sales-fulfillment.bridge';
import { confirmOrderSupply, getOrder } from '../src/modules/sales/sales.service';
import { resetWmsStoresForTest } from '../src/modules/wms/wms.service';

const TENANT = '88888888-8888-4888-8888-888888888888';

describe('Sales order fulfill saga', () => {
  beforeEach(() => {
    resetSalesStores();
    resetWmsStoresForTest();
  });

  it('confirm → fulfill creates issue, invoice, shipped; replay is idempotent', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        await confirmOrderSupply('SO-0480');

        const first = await fulfillSalesOrder('SO-0480', {});
        expect(first.replay).toBe(false);
        expect(first.issue.docNo).toMatch(/^STK-/);
        expect(first.invoice?.orderNumber).toBe('SO-0480');

        const order = await getOrder('SO-0480');
        expect(order?.supplyStatus).toBe('shipped');

        const second = await fulfillSalesOrder('SO-0480', {});
        expect(second.replay).toBe(true);
        expect(second.issue.docNo).toBe(first.issue.docNo);

        const chain = await getOrderFulfillment('SO-0480');
        expect(chain.wmsIssueDocNo).toBe(first.issue.docNo);
        expect(chain.invoiceNumber).toBe(first.invoice?.number);
      },
    );
  });
});
