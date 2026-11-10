import { randomUUID } from 'node:crypto';
import { createDraft, postJournalEntry } from '../gl/ledger.service';
import { FINANCE_EVENTS } from '@repo/contracts';

const outbox: Array<{ type: string; payload: unknown }> = [];

export function resetTreasuryStore(): void {
  outbox.length = 0;
}

export function getTreasuryOutbox() {
  return [...outbox];
}

export function postTreasuryTransaction(input: {
  tenantId: string;
  amount: bigint;
  bankGlAccountId: string;
  cashGlAccountId: string;
  workflowApproved: boolean;
}) {
  const draft = createDraft([
    { accountId: input.bankGlAccountId, debit: input.amount, credit: 0n },
    { accountId: input.cashGlAccountId, debit: 0n, credit: input.amount },
  ]);
  draft.tenantId = input.tenantId;
  draft.workflowStatus = input.workflowApproved ? 'Approved' : 'Pending';
  const posted = postJournalEntry(draft);
  const txId = randomUUID();
  outbox.push({
    type: 'finance.treasury_transaction.posted.v1',
    payload: { txId, glEntryId: posted.id },
  });
  outbox.push({ type: FINANCE_EVENTS.GL_ENTRY_POSTED, payload: { journalEntryId: posted.id } });
  return { txId, glEntryId: posted.id };
}
