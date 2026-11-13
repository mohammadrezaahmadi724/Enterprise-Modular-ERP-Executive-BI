import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { ApprovalRequiredError, TenantContext } from '@repo/domain';
import { Approve, registerWorkflowDefinition } from '@repo/db-erp-finance';
import { createAdjustment, resetWmsStoresForTest } from '../src/modules/wms/wms.service';
import {
  adjustmentWorkflowEntityId,
  wmsAdjustmentQtyThreshold,
} from '../src/bridges/wms-workflow.bridge';

const TENANT = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';

describe('WMS adjustment workflow threshold', () => {
  beforeEach(() => {
    resetWmsStoresForTest();
    registerWorkflowDefinition({
      id: 'wms-adj-test-def',
      tenantId: TENANT,
      code: 'wms_ops',
      version: 1,
      steps: [{ stepOrder: 1, nameFa: 'تأیید', approverRole: 'CFO', timeoutHours: 48 }],
    });
  });

  it('small delta applies without approval', async () => {
    process.env.WMS_ADJUSTMENT_QTY_THRESHOLD = '100';
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const result = await createAdjustment({
          sku: 'PRD-1016',
          warehouse: 'WH-ESF',
          countedQty: 4070,
          reason: 'تست کوچک',
        });
        expect(result.delta).toBe(-7);
      },
    );
  });

  it('large delta requires CFO approval', async () => {
    process.env.WMS_ADJUSTMENT_QTY_THRESHOLD = '5';
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const countedQty = 4077 + wmsAdjustmentQtyThreshold() + 10;
        const entityId = adjustmentWorkflowEntityId('PRD-1016', 'WH-ESF', countedQty);
        await expect(
          createAdjustment({
            sku: 'PRD-1016',
            warehouse: 'WH-ESF',
            countedQty,
            reason: 'تست بزرگ',
            unitValueRial: 1_000_000,
          }),
        ).rejects.toThrow(ApprovalRequiredError);

        await expect(
          createAdjustment(
            {
              sku: 'PRD-1016',
              warehouse: 'WH-ESF',
              countedQty,
              reason: 'تست بزرگ',
              unitValueRial: 1_000_000,
            },
            { approverUserId: 'cfo', approverRole: 'CFO' },
          ),
        ).resolves.toMatchObject({ ok: true });
        void entityId;
      },
    );
  });
});
