import { describe, it, expect } from 'vitest';
import { assertBalanced, createDraft, postJournalEntry } from '../src/gl/ledger.service';
import { InvariantViolationError } from '@repo/domain';

describe('GL Dr==Cr — Wave 1', () => {
  it('سند متوازن باید Post شود', () => {
    const draft = createDraft([
      { accountId: 'a1', debit: 1000n, credit: 0n },
      { accountId: 'a2', debit: 0n, credit: 1000n },
    ]);
    draft.workflowStatus = 'Approved';
    const posted = postJournalEntry(draft);
    expect(posted.status).toBe('Posted');
  });

  it('عدم توازن باید InvariantViolationError دهد', () => {
    expect(() =>
      createDraft([
        { accountId: 'a1', debit: 1000n, credit: 0n },
        { accountId: 'a2', debit: 0n, credit: 900n },
      ]),
    ).toThrow(InvariantViolationError);
    expect(() =>
      assertBalanced([{ accountId: 'x', debit: 1n, credit: 2n }]),
    ).toThrow(InvariantViolationError);
  });
});
