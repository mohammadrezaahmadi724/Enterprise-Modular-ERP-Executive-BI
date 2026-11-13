import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { resetSalesStores } from '@repo/db-erp-operations';
import { postSalesReturnWithRestock } from '../src/bridges/sales-return-wms.bridge';
import {
  confirmOrderSupply,
  createReturnFromInvoice,
  getReturn,
  markSalesOrderShipped,
  postInvoice,
  syncSalesFulfillmentProjection,
} from '../src/modules/sales/sales.service';
import { createInvoiceFromShippedOrder } from '../src/bridges/sales-fulfillment.bridge';
import { listReceipts, resetWmsStoresForTest } from '../src/modules/wms/wms.service';
import {
  readSalesFulfillmentKpis,
  readSalesReverseSupplyKpis,
  resetMetricQueryStore,
} from '@repo/db-erp-bi-risk';

const TENANT = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';
const USER = '00000000-0000-4000-8000-000000000099';

describe('sales return + WMS receipt', () => {
  beforeEach(() => {
    resetSalesStores();
    resetWmsStoresForTest();
    resetMetricQueryStore();
  });

  it('posted return with restock creates WMS receipt and updates BI projection on ship', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: USER, correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        await confirmOrderSupply('SO-0480');
        await markSalesOrderShipped('SO-0480', 'STK-RET-001');
        syncSalesFulfillmentProjection();

        const kpis = readSalesFulfillmentKpis(TENANT);
        expect(kpis?.ordersShipped).toBeGreaterThanOrEqual(1);

        const invoice = await createInvoiceFromShippedOrder('SO-0480');
        await postInvoice(invoice.number, USER);

        const draft = await createReturnFromInvoice(invoice.number);
        const result = await postSalesReturnWithRestock(draft.id, USER, true);

        expect(result.receiptDocNo).toMatch(/^STK-/);
        const stored = await getReturn(draft.id);
        expect(stored?.wmsReceiptDocNo).toBe(result.receiptDocNo);
        expect((await listReceipts()).some((r) => r.docNo === result.receiptDocNo)).toBe(true);

        const reverse = readSalesReverseSupplyKpis(TENANT);
        expect(reverse?.returnsPostedMonth).toBeGreaterThanOrEqual(1);
        expect(reverse?.restockReceiptsMonth).toBeGreaterThanOrEqual(1);
        expect(reverse?.returnCreditTomanMonth).toBeGreaterThan(0);
      },
    );
  });
});
