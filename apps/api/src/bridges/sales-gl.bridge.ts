import { ApprovalRequiredError } from '@repo/domain';
import { FINANCE_EVENTS } from '@repo/contracts';
import {
  Approve,
  StartWorkflow,
  createDraft,
  isEntityApproved,
  postJournalEntry,
  registerWorkflowDefinition,
  saveJournalDraft,
} from '@repo/db-erp-finance';
import { recordDomainEvent } from '../outbox/record-domain-event';

export const SALES_GL_ACCOUNTS = {
  accountsReceivable: '1101',
  salesRevenue: '4101',
} as const;

function ensureGlWorkflow(tenantId: string) {
  registerWorkflowDefinition({
    id: '00000000-0000-4000-8000-glpost0001',
    tenantId,
    code: 'gl_post',
    version: 1,
    steps: [{ stepOrder: 1, nameFa: 'تأیید CFO', approverRole: 'CFO', timeoutHours: 48 }],
  });
}

function glDocLabel(journalEntryId: string): string {
  return `N-${journalEntryId.replace(/-/g, '').slice(0, 4).toUpperCase()}`;
}

function postBalancedEntry(input: {
  tenantId: string;
  approverUserId: string;
  lines: { accountId: string; debit: bigint; credit: bigint; description?: string }[];
}): { journalEntryId: string; glDocNumber: string } {
  ensureGlWorkflow(input.tenantId);
  const draft = createDraft(input.lines);
  draft.tenantId = input.tenantId;
  saveJournalDraft(draft);

  const wf = StartWorkflow({
    tenantId: input.tenantId,
    definitionCode: 'gl_post',
    version: 1,
    entityType: 'journal_entry',
    entityId: draft.id,
  });
  Approve(wf.id, input.approverUserId, 'CFO', 'فروش — ثبت خودکار پس از تأیید workflow');

  if (!isEntityApproved('journal_entry', draft.id)) {
    throw new ApprovalRequiredError('SalesGlPost');
  }

  const posted = postJournalEntry({ ...draft, workflowStatus: 'Approved' });
  saveJournalDraft(posted);
  return { journalEntryId: posted.id, glDocNumber: glDocLabel(posted.id) };
}

export async function postSalesInvoiceGl(input: {
  tenantId: string;
  approverUserId: string;
  invoiceNumber: string;
  customerLabel: string;
  amountRial: bigint;
}): Promise<{ journalEntryId: string; glDocNumber: string }> {
  const result = postBalancedEntry({
    tenantId: input.tenantId,
    approverUserId: input.approverUserId,
    lines: [
      {
        accountId: SALES_GL_ACCOUNTS.accountsReceivable,
        debit: input.amountRial,
        credit: 0n,
        description: `فاکتور فروش ${input.invoiceNumber} — ${input.customerLabel}`,
      },
      {
        accountId: SALES_GL_ACCOUNTS.salesRevenue,
        debit: 0n,
        credit: input.amountRial,
        description: `درآمد فروش ${input.invoiceNumber}`,
      },
    ],
  });

  const total = input.amountRial.toString();
  await recordDomainEvent({
    eventType: FINANCE_EVENTS.GL_ENTRY_POSTED,
    aggregateId: result.journalEntryId,
    payload: {
      journalEntryId: result.journalEntryId,
      tenantId: input.tenantId,
      debit: total,
      credit: total,
      accountId: SALES_GL_ACCOUNTS.accountsReceivable,
      periodStart: new Date().toISOString().slice(0, 10),
      source: 'sales_invoice',
      invoiceNumber: input.invoiceNumber,
    },
  });

  return result;
}

export async function postSalesReturnGl(input: {
  tenantId: string;
  approverUserId: string;
  returnId: string;
  customerLabel: string;
  creditRial: bigint;
  sourceInvoice: string;
}): Promise<{ journalEntryId: string; glDocNumber: string }> {
  const result = postBalancedEntry({
    tenantId: input.tenantId,
    approverUserId: input.approverUserId,
    lines: [
      {
        accountId: SALES_GL_ACCOUNTS.salesRevenue,
        debit: input.creditRial,
        credit: 0n,
        description: `برگشت فروش ${input.returnId} — فاکتور ${input.sourceInvoice}`,
      },
      {
        accountId: SALES_GL_ACCOUNTS.accountsReceivable,
        debit: 0n,
        credit: input.creditRial,
        description: `تعدیل بدهکار مشتری ${input.customerLabel}`,
      },
    ],
  });

  const total = input.creditRial.toString();
  await recordDomainEvent({
    eventType: FINANCE_EVENTS.GL_ENTRY_POSTED,
    aggregateId: result.journalEntryId,
    payload: {
      journalEntryId: result.journalEntryId,
      tenantId: input.tenantId,
      debit: total,
      credit: total,
      accountId: SALES_GL_ACCOUNTS.salesRevenue,
      periodStart: new Date().toISOString().slice(0, 10),
      source: 'sales_return',
      returnId: input.returnId,
    },
  });

  return result;
}
