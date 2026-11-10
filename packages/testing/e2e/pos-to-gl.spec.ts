import { describe, expect, it, beforeEach } from 'vitest';
import { resetWorkflowEngine } from '@repo/db-erp-finance';
import { FINANCE_EVENTS, OPS_EVENTS } from '@repo/contracts';
import { completePosTransaction, getPosOutbox, resetPosStore } from '@repo/db-erp-operations';

beforeEach(() => {
  resetPosStore();
  resetWorkflowEngine();
});

describe('POS to GL', () => {
  it('PosTransaction → GL + Outbox', () => {
    const res = completePosTransaction({
      tenantId: '11111111-1111-4111-8111-111111111111',
      terminalId: 'pos-1',
      transactionNumber: 'TX-100',
      total: 5_000_000n,
      revenueAccountId: 'rev-1',
      cashAccountId: 'cash-1',
      workflowApproved: true,
    });
    expect(res.glEntryId).toBeTruthy();
    const events = getPosOutbox().map((e) => e.type);
    expect(events).toContain(OPS_EVENTS.POS_TRANSACTION_COMPLETED);
    expect(events).toContain(FINANCE_EVENTS.GL_ENTRY_POSTED);
  });
});
