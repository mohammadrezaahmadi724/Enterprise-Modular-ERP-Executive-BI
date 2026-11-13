import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { registerWorkflowDefinition } from '@repo/db-erp-finance';
import {
  approvePurchaseOrder,
  createPurchaseOrder,
  resetProcurementStoresForTest,
} from '../src/modules/procurement/procurement.service';

const TENANT = 'dddddddd-dddd-4ddd-8ddd-dddddddddddd';

describe('procurement PO approval threshold', () => {
  beforeEach(() => {
    resetProcurementStoresForTest();
    registerWorkflowDefinition({
      id: 'proc-po-test',
      tenantId: TENANT,
      code: 'procurement_po',
      version: 1,
      steps: [{ stepOrder: 1, nameFa: 'تأیید', approverRole: 'CFO', timeoutHours: 72 }],
    });
  });

  it('under threshold PO is auto-approved', async () => {
    process.env.PROCUREMENT_PO_APPROVAL_TOMAN_THRESHOLD = '100000000';
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const po = await createPurchaseOrder({
          supplierCode: 'SUP-1',
          supplierName: 'تست',
          orderDate: '۱۴۰۵/۰۸/۱۲',
          lines: [{ sku: 'X', quantity: 1, unit: 'عدد', unitPriceToman: 1_000_000 }],
        });
        expect(po.status).toBe('approved');
      },
    );
  });

  it('over threshold PO needs CFO approval', async () => {
    process.env.PROCUREMENT_PO_APPROVAL_TOMAN_THRESHOLD = '1000';
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const po = await createPurchaseOrder({
          supplierCode: 'SUP-1',
          supplierName: 'تست',
          orderDate: '۱۴۰۵/۰۸/۱۲',
          lines: [{ sku: 'X', quantity: 10, unit: 'عدد', unitPriceToman: 10_000_000 }],
        });
        expect(po.status).toBe('sent');
        expect(po.approvalRequired).toBe(true);

        const approved = await approvePurchaseOrder(po.number, { approverUserId: 'cfo', approverRole: 'CFO' });
        expect(approved.status).toBe('approved');
      },
    );
  });
});
