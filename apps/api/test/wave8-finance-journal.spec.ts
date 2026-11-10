import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import {
  Approve,
  StartWorkflow,
  createDraft,
  isEntityApproved,
  listJournalDrafts,
  postJournalEntry,
  registerWorkflowDefinition,
  resetJournalStore,
  resetWorkflowEngine,
  saveJournalDraft,
} from '@repo/db-erp-finance';

const TENANT = '11111111-1111-4111-8111-111111111111';

describe('Wave 8 finance journal store', () => {
  beforeEach(() => {
    resetJournalStore();
    resetWorkflowEngine();
    registerWorkflowDefinition({
      id: '00000000-0000-4000-8000-glpost0001',
      tenantId: TENANT,
      code: 'gl_post',
      version: 1,
      steps: [{ stepOrder: 1, nameFa: 'CFO', approverRole: 'CFO', timeoutHours: 24 }],
    });
  });

  it('posts after workflow approval', () => {
    TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: 'c1', traceId: 't1', isSuperAdmin: false },
      () => {
        const draft = createDraft([
          { accountId: '1101', debit: 1000n, credit: 0n },
          { accountId: '2101', debit: 0n, credit: 1000n },
        ]);
        draft.tenantId = TENANT;
        saveJournalDraft(draft);
        expect(listJournalDrafts(TENANT)).toHaveLength(1);
        const wf = StartWorkflow({
          tenantId: TENANT,
          definitionCode: 'gl_post',
          version: 1,
          entityType: 'journal_entry',
          entityId: draft.id,
        });
        Approve(wf.id, 'cfo', 'CFO');
        expect(isEntityApproved('journal_entry', draft.id)).toBe(true);
        const posted = postJournalEntry({ ...draft, workflowStatus: 'Approved' });
        saveJournalDraft(posted);
        expect(posted.status).toBe('Posted');
      },
    );
  });
});
