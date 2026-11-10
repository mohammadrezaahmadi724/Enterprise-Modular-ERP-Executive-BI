import { randomUUID } from 'node:crypto';
import { FINANCE_EVENTS, OPS_EVENTS } from '@repo/contracts';
import { createDraft, postJournalEntry } from '@repo/db-erp-finance';

const outbox: Array<{ type: string; payload: unknown }> = [];

export function resetPosStore(): void {
  outbox.length = 0;
}

export function getPosOutbox() {
  return [...outbox];
}

export function completePosTransaction(input: {
  tenantId: string;
  terminalId: string;
  transactionNumber: string;
  total: bigint;
  revenueAccountId: string;
  cashAccountId: string;
  workflowApproved: boolean;
}): { txId: string; glEntryId: string } {
  const draft = createDraft([
    { accountId: input.cashAccountId, debit: input.total, credit: 0n },
    { accountId: input.revenueAccountId, debit: 0n, credit: input.total },
  ]);
  draft.tenantId = input.tenantId;
  draft.workflowStatus = input.workflowApproved ? 'Approved' : 'Pending';
  const posted = postJournalEntry(draft);
  const txId = randomUUID();
  outbox.push({
    type: OPS_EVENTS.POS_TRANSACTION_COMPLETED,
    payload: { txId, terminalId: input.terminalId, transactionNumber: input.transactionNumber },
  });
  outbox.push({ type: FINANCE_EVENTS.GL_ENTRY_POSTED, payload: { journalEntryId: posted.id } });
  return { txId, glEntryId: posted.id };
}
