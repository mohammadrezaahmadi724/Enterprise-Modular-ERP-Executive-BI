import { describe, it, expect } from 'vitest';
import { createDraft, postJournalEntry } from '../src/gl/ledger.service';
import { ApprovalRequiredError } from '@repo/domain';
import {
  approve,
  isEntityApproved,
  registerWorkflowDefinition,
  resetWorkflowEngine,
  startWorkflow,
} from '../src/workflow/engine';

describe('Approval mandatory — Wave 3', () => {
  const tenantId = '11111111-1111-4111-8111-111111111111';

  it('Post بدون Approved باید ApprovalRequiredError دهد', () => {
    const draft = createDraft([
      { accountId: 'a1', debit: 100n, credit: 0n },
      { accountId: 'a2', debit: 0n, credit: 100n },
    ]);
    expect(draft.workflowStatus).toBe('Pending');
    expect(() => postJournalEntry(draft)).toThrow(ApprovalRequiredError);
  });

  it('Post پس از workflow Approved باید موفق باشد', () => {
    resetWorkflowEngine();
    const entityId = 'je-1';
    registerWorkflowDefinition({
      id: 'def-1',
      tenantId,
      code: 'journal_post',
      version: 1,
      steps: [{ stepOrder: 1, nameFa: 'مدیر مالی', approverRole: 'finance_manager', timeoutHours: 24 }],
    });
    const wf = startWorkflow({
      tenantId,
      definitionCode: 'journal_post',
      version: 1,
      entityType: 'journal_entry',
      entityId,
    });
    approve(wf.id, 'u1', 'finance_manager');
    expect(isEntityApproved('journal_entry', entityId)).toBe(true);
    const draft = createDraft([
      { accountId: 'a1', debit: 200n, credit: 0n },
      { accountId: 'a2', debit: 0n, credit: 200n },
    ]);
    draft.workflowStatus = 'Approved';
    expect(postJournalEntry(draft).status).toBe('Posted');
  });
});
