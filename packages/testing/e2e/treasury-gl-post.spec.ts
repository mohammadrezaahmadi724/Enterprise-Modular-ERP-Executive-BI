import { describe, it, expect, beforeEach } from 'vitest';
import { getTreasuryOutbox, postTreasuryTransaction, resetTreasuryStore } from '@repo/db-erp-finance';
import { ApprovalRequiredError } from '@repo/domain';

describe('Treasury GL auto-post — Wave 3', () => {
  beforeEach(() => resetTreasuryStore());

  it('تراکنش خزانه باید GL و outbox ثبت کند', () => {
    const result = postTreasuryTransaction({
      tenantId: '11111111-1111-4111-8111-111111111111',
      amount: 5_000_000n,
      bankGlAccountId: 'bank-gl',
      cashGlAccountId: 'cash-gl',
      workflowApproved: true,
    });
    expect(result.glEntryId).toBeTruthy();
    expect(getTreasuryOutbox().length).toBeGreaterThanOrEqual(2);
  });

  it('بدون approval باید خطا دهد', () => {
    expect(() =>
      postTreasuryTransaction({
        tenantId: '11111111-1111-4111-8111-111111111111',
        amount: 1n,
        bankGlAccountId: 'b',
        cashGlAccountId: 'c',
        workflowApproved: false,
      }),
    ).toThrow(ApprovalRequiredError);
  });
});
