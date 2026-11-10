import { describe, it, expect, beforeEach } from 'vitest';
import { getProcurementOutbox, resetProcurementSaga, runProcurementChain } from '@repo/db-erp-operations';
import { resetWorkflowEngine } from '@repo/db-erp-finance';
import { OPS_EVENTS } from '@repo/contracts';

describe('Procurement saga — Wave 3', () => {
  beforeEach(() => {
    resetProcurementSaga();
    resetWorkflowEngine();
  });

  it('زنجیره PR→Approval→PO→GR→Stock', async () => {
    await runProcurementChain('11111111-1111-4111-8111-111111111111', 'procurement_manager');
    const events = getProcurementOutbox();
    expect(events.some((e) => (e as { type: string }).type === OPS_EVENTS.PROCUREMENT_COMPLETED)).toBe(true);
  });
});
