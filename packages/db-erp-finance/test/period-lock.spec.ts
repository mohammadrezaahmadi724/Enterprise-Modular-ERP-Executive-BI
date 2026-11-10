import { describe, it, expect } from 'vitest';
import { createDraft, postJournalEntry } from '../src/gl/ledger.service';
import { PeriodLockedError } from '@repo/domain';

describe('Period lock — Wave 1', () => {
  it('Post در دوره Closed باید PeriodLockedError دهد', () => {
    const draft = createDraft([
      { accountId: 'a1', debit: 200n, credit: 0n },
      { accountId: 'a2', debit: 0n, credit: 200n },
    ]);
    draft.workflowStatus = 'Approved';
    draft.fiscalPeriodStatus = 'Closed';
    expect(() => postJournalEntry(draft)).toThrow(PeriodLockedError);
  });

  it('دوره Open باید Post مجاز باشد', () => {
    const draft = createDraft([
      { accountId: 'a1', debit: 200n, credit: 0n },
      { accountId: 'a2', debit: 0n, credit: 200n },
    ]);
    draft.workflowStatus = 'Approved';
    expect(postJournalEntry(draft).status).toBe('Posted');
  });
});
