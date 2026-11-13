import { TenantContext } from '@repo/domain';
import { FINANCE_EVENTS } from '@repo/contracts';
import { recordDomainEvent } from '../../outbox/record-domain-event';
import {
  Approve,
  StartWorkflow,
  createDraft,
  createJournalDraftPrisma,
  financePersistenceEnabled,
  isEntityApproved,
  listJournalDrafts,
  listJournalDraftsPrisma,
  postJournalDraftPrisma,
  postJournalEntry,
  registerWorkflowDefinition,
  saveJournalDraft,
  type GlLineInput,
  type JournalEntryDraft,
} from '@repo/db-erp-finance';

function ensureGlWorkflow(tenantId: string) {
  registerWorkflowDefinition({
    id: '00000000-0000-4000-8000-glpost0001',
    tenantId,
    code: 'gl_post',
    version: 1,
    steps: [{ stepOrder: 1, nameFa: 'تأیید CFO', approverRole: 'CFO', timeoutHours: 48 }],
  });
}

export function serializeJournalEntry(entry: JournalEntryDraft) {
  return {
    ...entry,
    entryDate: entry.entryDate.toISOString(),
    lines: entry.lines.map((l) => ({
      ...l,
      debit: l.debit.toString(),
      credit: l.credit.toString(),
    })),
    persistence: financePersistenceEnabled() ? 'prisma' : 'memory',
  };
}

export async function listJournalEntriesQuery() {
  const tenantId = TenantContext.requireTenantId();
  if (financePersistenceEnabled()) {
    const entries = await listJournalDraftsPrisma(tenantId);
    return { entries: entries.map(serializeJournalEntry) };
  }
  return { entries: listJournalDrafts(tenantId).map(serializeJournalEntry) };
}

export async function createJournalDraftCommand(input: {
  lines: { accountId: string; debit: string; credit: string; description?: string }[];
}) {
  const tenantId = TenantContext.requireTenantId();
  const mapped: GlLineInput[] = input.lines.map((l) => ({
    accountId: l.accountId,
    debit: BigInt(l.debit),
    credit: BigInt(l.credit),
    description: l.description,
  }));
  if (financePersistenceEnabled()) {
    const draft = await createJournalDraftPrisma(tenantId, mapped);
    return { draft: serializeJournalEntry(draft) };
  }
  const draft = createDraft(mapped);
  draft.tenantId = tenantId;
  saveJournalDraft(draft);
  return { draft: serializeJournalEntry(draft) };
}

export async function postJournalCommand(input: {
  draft: JournalEntryDraft & {
    lines: { accountId: string; debit: string | bigint; credit: string | bigint; description?: string }[];
    entryDate?: string;
  };
  approverUserId?: string;
  approverRole?: string;
}) {
  const draft: JournalEntryDraft = {
    ...input.draft,
    entryDate: input.draft.entryDate ? new Date(input.draft.entryDate) : new Date(),
    lines: input.draft.lines.map((l) => ({
      accountId: l.accountId,
      debit: BigInt(l.debit),
      credit: BigInt(l.credit),
      description: l.description,
    })),
  };
  ensureGlWorkflow(draft.tenantId);
  if (!isEntityApproved('journal_entry', draft.id)) {
    const wf = StartWorkflow({
      tenantId: draft.tenantId,
      definitionCode: 'gl_post',
      version: 1,
      entityType: 'journal_entry',
      entityId: draft.id,
    });
    if (input.approverUserId && input.approverRole) {
      Approve(wf.id, input.approverUserId, input.approverRole, 'POST from API');
    }
    if (!isEntityApproved('journal_entry', draft.id)) {
      return { status: 'approval_required' as const, workflowInstanceId: wf.id };
    }
  }
  postJournalEntry({ ...draft, workflowStatus: 'Approved' });
  let posted = { ...draft, status: 'Posted' as const, workflowStatus: 'Approved' as const };
  if (financePersistenceEnabled()) {
    posted = await postJournalDraftPrisma(draft.id);
  } else {
    saveJournalDraft(posted);
  }
  const totalDebit = draft.lines.reduce((s, l) => s + l.debit, 0n);
  const totalCredit = draft.lines.reduce((s, l) => s + l.credit, 0n);
  await recordDomainEvent({
    eventType: FINANCE_EVENTS.GL_ENTRY_POSTED,
    aggregateId: posted.id,
    tenantId: posted.tenantId,
    payload: {
      journalEntryId: posted.id,
      tenantId: posted.tenantId,
      debit: totalDebit.toString(),
      credit: totalCredit.toString(),
      accountId: draft.lines[0]?.accountId ?? 'unknown',
      periodStart: posted.entryDate.toISOString().slice(0, 10),
    },
  });
  return { status: 'posted' as const, entry: serializeJournalEntry(posted) };
}

export function journalWorkflowStatusQuery(id: string) {
  return { approved: isEntityApproved('journal_entry', id) };
}
