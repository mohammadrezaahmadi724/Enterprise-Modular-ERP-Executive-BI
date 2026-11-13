import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { registerWorkflowDefinition } from '@repo/db-erp-finance';
import {
  approvePurchaseRequest,
  createPurchaseOrder,
  createPurchaseRequest,
  resetProcurementStoresForTest,
} from '../src/modules/procurement/procurement.service';

const TENANT = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';

describe('procurement PR approval threshold', () => {
  beforeEach(() => {
    resetProcurementStoresForTest();
    registerWorkflowDefinition({
      id: 'proc-pr-test',
      tenantId: TENANT,
      code: 'procurement_pr',
      version: 1,
      steps: [{ stepOrder: 1, nameFa: 'تأیید', approverRole: 'CFO', timeoutHours: 72 }],
    });
  });

  it('under threshold is auto-approved', async () => {
    process.env.PROCUREMENT_PR_APPROVAL_TOMAN_THRESHOLD = '50000000';
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const pr = await createPurchaseRequest({
          title: 'خرد',
          requestDate: '۱۴۰۵/۰۸/۱۲',
          lines: [{ quantity: 1, unit: 'عدد', estimatedUnitToman: 1_000_000 }],
        });
        expect(pr.status).toBe('approved');
        expect(pr.approvalRequired).toBeFalsy();
      },
    );
  });

  it('over threshold stays sent until CFO approves', async () => {
    process.env.PROCUREMENT_PR_APPROVAL_TOMAN_THRESHOLD = '1000';
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const pr = await createPurchaseRequest({
          title: 'کلان',
          requestDate: '۱۴۰۵/۰۸/۱۲',
          lines: [{ quantity: 10, unit: 'عدد', estimatedUnitToman: 10_000_000 }],
        });
        expect(pr.status).toBe('sent');
        expect(pr.approvalRequired).toBe(true);

        await expect(
          createPurchaseOrder({
            purchaseRequestNumber: pr.number,
            supplierCode: 'SUP-1',
            supplierName: 'تست',
            orderDate: '۱۴۰۵/۰۸/۱۲',
            lines: [{ sku: 'X', quantity: 1, unit: 'عدد', unitPriceToman: 1 }],
          }),
        ).rejects.toThrow(/not approved/i);

        const approved = await approvePurchaseRequest(pr.number, { approverUserId: 'cfo', approverRole: 'CFO' });
        expect(approved.status).toBe('approved');

        const po = await createPurchaseOrder({
          purchaseRequestNumber: pr.number,
          supplierCode: 'SUP-1',
          supplierName: 'تست',
          orderDate: '۱۴۰۵/۰۸/۱۲',
          lines: [{ sku: 'X', quantity: 1, unit: 'عدد', unitPriceToman: 1 }],
        });
        expect(po.purchaseRequestNumber).toBe(pr.number);
      },
    );
  });
});
