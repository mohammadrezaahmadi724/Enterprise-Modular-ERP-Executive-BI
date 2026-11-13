import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { receivePurchaseOrder } from '../src/bridges/procurement-wms.bridge';
import { getPurchaseOrder, resetProcurementStoresForTest } from '../src/modules/procurement/procurement.service';
import { listReceipts, resetWmsStoresForTest } from '../src/modules/wms/wms.service';

const TENANT = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

describe('procurement → WMS receipt', () => {
  beforeEach(() => {
    resetWmsStoresForTest();
    resetProcurementStoresForTest();
  });

  it('creates stock receipt for PO', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const poBefore = getPurchaseOrder('PO-001274');
        const lineQty = poBefore?.lines[0]?.quantity ?? 12;
        const sku = poBefore?.lines[0]?.sku ?? 'PRD-STEEL';
        const result = await receivePurchaseOrder('PO-001274', {
          party: 'تأمین‌کننده آزمون',
          lines: [{ sku, warehouse: 'WH-ESF', quantity: lineQty, unitPriceRial: 900_000 }],
        });
        expect(result.receiptDocNo).toMatch(/^STK-/);
        expect(result.poNumber).toBe('PO-001274');
        const poAfter = getPurchaseOrder('PO-001274');
        expect(poAfter?.status).toBe('full_receipt');
        expect(poAfter?.lines[0]?.receivedQuantity).toBe(lineQty);
        const receipts = await listReceipts();
        expect(receipts.some((r) => r.docNo === result.receiptDocNo)).toBe(true);
        expect(receipts.find((r) => r.docNo === result.receiptDocNo)?.orderRef).toBe('PO-001274');
      },
    );
  });
});
