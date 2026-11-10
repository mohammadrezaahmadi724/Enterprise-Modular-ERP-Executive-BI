import { describe, it, expect, beforeEach } from 'vitest';
import {
  clearPostedForTest,
  createDraft,
  markPostedForTest,
  mutatePostedEntry,
  postJournalEntry,
} from '../src/gl/ledger.service';
import { InvariantViolationError } from '@repo/domain';

describe('GL immutability — Wave 1', () => {
  beforeEach(() => clearPostedForTest());

  it('پس از Post، UPDATE/DELETE باید fail شود', () => {
    const draft = createDraft([
      { accountId: 'a1', debit: 500n, credit: 0n },
      { accountId: 'a2', debit: 0n, credit: 500n },
    ]);
    draft.workflowStatus = 'Approved';
    const posted = postJournalEntry(draft);
    markPostedForTest(posted.id);
    expect(() => mutatePostedEntry(posted.id, 'update')).toThrow(InvariantViolationError);
    expect(() => mutatePostedEntry(posted.id, 'delete')).toThrow(InvariantViolationError);
  });

  it('Draft قابل تغییر است', () => {
    const draft = createDraft([
      { accountId: 'a1', debit: 100n, credit: 0n },
      { accountId: 'a2', debit: 0n, credit: 100n },
    ]);
    expect(() => mutatePostedEntry(draft.id, 'update')).not.toThrow();
  });
});
