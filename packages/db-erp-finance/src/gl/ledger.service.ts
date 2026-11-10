import { randomUUID } from 'node:crypto';
import { ApprovalRequiredError, InvariantViolationError, PeriodLockedError } from '@repo/domain';

export type GlLineInput = {
  accountId: string;
  debit: bigint;
  credit: bigint;
  description?: string;
};

export type JournalEntryDraft = {
  id: string;
  tenantId: string;
  status: 'Draft' | 'Posted' | 'Reversed';
  entryDate: Date;
  lines: GlLineInput[];
  fiscalPeriodStatus?: 'Open' | 'Closed' | 'Locked';
  /** Wave 3: Post مالی نیاز به Approved workflow دارد */
  workflowStatus?: 'Approved' | 'Pending' | 'None';
};

const postedIds = new Set<string>();

export function assertBalanced(lines: GlLineInput[]): void {
  let dr = 0n;
  let cr = 0n;
  for (const line of lines) {
    dr += line.debit;
    cr += line.credit;
  }
  if (dr !== cr) {
    throw new InvariantViolationError(`GL imbalance: debit=${dr} credit=${cr}`);
  }
}

export function createDraft(lines: GlLineInput[]): JournalEntryDraft {
  assertBalanced(lines);
  return {
    id: randomUUID(),
    tenantId: '',
    status: 'Draft',
    entryDate: new Date(),
    lines,
    fiscalPeriodStatus: 'Open',
    workflowStatus: 'Pending',
  };
}

export function postJournalEntry(entry: JournalEntryDraft): JournalEntryDraft {
  if (entry.workflowStatus === 'Pending') {
    throw new ApprovalRequiredError('PostJournalEntry');
  }
  assertBalanced(entry.lines);
  if (entry.fiscalPeriodStatus && entry.fiscalPeriodStatus !== 'Open') {
    throw new PeriodLockedError(entry.fiscalPeriodStatus);
  }
  postedIds.add(entry.id);
  return { ...entry, status: 'Posted' };
}

export function mutatePostedEntry(entryId: string, action: 'update' | 'delete'): void {
  if (postedIds.has(entryId)) {
    throw new InvariantViolationError(`GL immutability: cannot ${action} posted entry ${entryId}`);
  }
}

export function markPostedForTest(entryId: string): void {
  postedIds.add(entryId);
}

export function clearPostedForTest(): void {
  postedIds.clear();
}
