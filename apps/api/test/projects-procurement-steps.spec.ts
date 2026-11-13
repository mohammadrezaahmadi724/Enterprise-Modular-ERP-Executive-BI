import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { resetProcurementStoresForTest } from '../src/modules/procurement/procurement.service';
import { receivePurchaseOrder } from '../src/bridges/procurement-wms.bridge';
import { resetWmsStoresForTest } from '../src/modules/wms/wms.service';
import { getProjectContext, resetProjectsStoresForTest } from '../src/modules/projects/projects.service';

const TENANT = 'ffffffff-ffff-4fff-8fff-ffffffffffff';

describe('project procurement next steps', () => {
  beforeEach(() => {
    resetProjectsStoresForTest();
    resetProcurementStoresForTest();
    resetWmsStoresForTest();
  });

  it('lists PO ready for warehouse receipt on PRJ-0024', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const ctx = await getProjectContext('PRJ-0024');
        expect(ctx.procurement.readyForReceipt.some((r) => r.purchaseOrderNumber === 'PO-001274')).toBe(true);
      },
    );
  });

  it('drops PO from readyForReceipt after full warehouse receipt', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const before = await getProjectContext('PRJ-0024');
        expect(before.procurement.readyForReceipt.some((r) => r.purchaseOrderNumber === 'PO-001274')).toBe(true);
        await receivePurchaseOrder('PO-001274', {
          lines: [{ sku: 'PRD-STEEL', warehouse: 'WH-ESF', quantity: 12, unitPriceRial: 900_000 }],
        });
        const after = await getProjectContext('PRJ-0024');
        expect(after.procurement.readyForReceipt.some((r) => r.purchaseOrderNumber === 'PO-001274')).toBe(false);
        const poRow = after.procurement.purchaseOrders.find((p) => p.number === 'PO-001274');
        expect(poRow?.status).toBe('full_receipt');
      },
    );
  });

  it('lists approved PR without PO for PRJ-0018', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const ctx = await getProjectContext('PRJ-0018');
        expect(ctx.procurement.readyForPurchaseOrder.some((r) => r.purchaseRequestNumber === 'PR-00217')).toBe(true);
      },
    );
  });
});
