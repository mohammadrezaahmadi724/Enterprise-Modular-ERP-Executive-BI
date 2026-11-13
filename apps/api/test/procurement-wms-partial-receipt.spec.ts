import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { receivePurchaseOrder } from '../src/bridges/procurement-wms.bridge';
import { getPurchaseOrder, resetProcurementStoresForTest } from '../src/modules/procurement/procurement.service';
import { resetWmsStoresForTest } from '../src/modules/wms/wms.service';

const TENANT = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

describe('PO status after WMS receipt', () => {
  beforeEach(() => {
    resetWmsStoresForTest();
    resetProcurementStoresForTest();
  });

  it('marks partial_receipt when quantity is short', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        await receivePurchaseOrder('PO-001274', {
          lines: [{ sku: 'PRD-STEEL', warehouse: 'WH-ESF', quantity: 5, unitPriceRial: 900_000 }],
        });
        const po = getPurchaseOrder('PO-001274');
        expect(po?.status).toBe('partial_receipt');
        expect(po?.lines[0]?.receivedQuantity).toBe(5);
      },
    );
  });

  it('marks full_receipt after cumulative receipts', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        await receivePurchaseOrder('PO-001274', {
          lines: [{ sku: 'PRD-STEEL', warehouse: 'WH-ESF', quantity: 5, unitPriceRial: 900_000 }],
        });
        await receivePurchaseOrder('PO-001274', {
          lines: [{ sku: 'PRD-STEEL', warehouse: 'WH-ESF', quantity: 7, unitPriceRial: 900_000 }],
        });
        const po = getPurchaseOrder('PO-001274');
        expect(po?.status).toBe('full_receipt');
        expect(po?.lines[0]?.receivedQuantity).toBe(12);
      },
    );
  });
});
