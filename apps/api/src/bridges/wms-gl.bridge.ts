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
import { publishWmsGlInventoryDelta } from '@repo/db-erp-bi-risk';
import { recordDomainEvent } from '../outbox/record-domain-event';

/** کدهای نمونه — موجودی انبار / اختلاف انبارگردانی */
export const WMS_GL_ACCOUNTS = {
  inventory: '1301',
  inventoryVariance: '5199',
  cogs: '5101',
  /** حساب انتظامی GRNI / بستانکار رسید موقت */
  goodsReceivedNotInvoiced: '2105',
} as const;

function ensureGlWorkflow(tenantId: string) {
  registerWorkflowDefinition({
    id: '00000000-0000-4000-8000-wmsscn0001',
    tenantId,
    code: 'gl_post',
    version: 1,
    steps: [{ stepOrder: 1, nameFa: 'تأیید CFO', approverRole: 'CFO', timeoutHours: 48 }],
  });
}

function glDocLabel(journalEntryId: string): string {
  return `N-${journalEntryId.replace(/-/g, '').slice(0, 4).toUpperCase()}`;
}

export async function postStockCountVarianceGl(input: {
  tenantId: string;
  approverUserId: string;
  sessionId: string;
  warehouse: string;
  /** مثبت = مازاد (افزایش موجودی)، منفی = کسری */
  netVarianceRial: bigint;
}): Promise<{ journalEntryId: string; glDocNumber: string } | null> {
  if (input.netVarianceRial === 0n) return null;

  ensureGlWorkflow(input.tenantId);
  const abs = input.netVarianceRial < 0n ? -input.netVarianceRial : input.netVarianceRial;
  const surplus = input.netVarianceRial > 0n;

  const lines = surplus
    ? [
        {
          accountId: WMS_GL_ACCOUNTS.inventory,
          debit: abs,
          credit: 0n,
          description: `مازاد انبارگردانی ${input.sessionId} — ${input.warehouse}`,
        },
        {
          accountId: WMS_GL_ACCOUNTS.inventoryVariance,
          debit: 0n,
          credit: abs,
          description: `تعدیل مازاد انبارگردانی ${input.sessionId}`,
        },
      ]
    : [
        {
          accountId: WMS_GL_ACCOUNTS.inventoryVariance,
          debit: abs,
          credit: 0n,
          description: `کسری انبارگردانی ${input.sessionId} — ${input.warehouse}`,
        },
        {
          accountId: WMS_GL_ACCOUNTS.inventory,
          debit: 0n,
          credit: abs,
          description: `تعدیل کسری انبارگردانی ${input.sessionId}`,
        },
      ];

  const draft = createDraft(lines);
  draft.tenantId = input.tenantId;
  saveJournalDraft(draft);

  const wf = StartWorkflow({
    tenantId: input.tenantId,
    definitionCode: 'gl_post',
    version: 1,
    entityType: 'journal_entry',
    entityId: draft.id,
  });
  Approve(wf.id, input.approverUserId, 'CFO', 'انبارگردانی — ثبت اختلاف موجودی');

  if (!isEntityApproved('journal_entry', draft.id)) {
    throw new ApprovalRequiredError('WmsStockCountGlPost');
  }

  const posted = postJournalEntry({ ...draft, workflowStatus: 'Approved' });
  saveJournalDraft(posted);

  await recordDomainEvent({
    eventType: FINANCE_EVENTS.GL_ENTRY_POSTED,
    aggregateId: posted.id,
    payload: {
      tenantId: input.tenantId,
      sessionId: input.sessionId,
      warehouse: input.warehouse,
      debit: Number(abs),
      credit: Number(abs),
      accountId: WMS_GL_ACCOUNTS.inventory,
    },
  });

  publishWmsGlInventoryDelta(
    input.tenantId,
    surplus ? Number(input.netVarianceRial) : -Number(abs),
  );

  return { journalEntryId: posted.id, glDocNumber: glDocLabel(posted.id) };
}

export async function postWmsIssueCogsGl(input: {
  tenantId: string;
  approverUserId: string;
  docNo: string;
  orderRef: string;
  costRial: bigint;
}): Promise<{ journalEntryId: string; glDocNumber: string } | null> {
  if (input.costRial <= 0n) return null;

  ensureGlWorkflow(input.tenantId);
  const abs = input.costRial;

  const draft = createDraft([
    {
      accountId: WMS_GL_ACCOUNTS.cogs,
      debit: abs,
      credit: 0n,
      description: `بهای تمام‌شده خروج ${input.docNo} — ${input.orderRef}`,
    },
    {
      accountId: WMS_GL_ACCOUNTS.inventory,
      debit: 0n,
      credit: abs,
      description: `کاهش موجودی بابت خروج ${input.docNo}`,
    },
  ]);
  draft.tenantId = input.tenantId;
  saveJournalDraft(draft);

  const wf = StartWorkflow({
    tenantId: input.tenantId,
    definitionCode: 'gl_post',
    version: 1,
    entityType: 'journal_entry',
    entityId: draft.id,
  });
  Approve(wf.id, input.approverUserId, 'CFO', 'خروج انبار — COGS');

  if (!isEntityApproved('journal_entry', draft.id)) {
    throw new ApprovalRequiredError('WmsIssueCogsGlPost');
  }

  const posted = postJournalEntry({ ...draft, workflowStatus: 'Approved' });
  saveJournalDraft(posted);

  publishWmsGlInventoryDelta(input.tenantId, -Number(abs));

  await recordDomainEvent({
    eventType: FINANCE_EVENTS.GL_ENTRY_POSTED,
    aggregateId: posted.id,
    payload: {
      tenantId: input.tenantId,
      docNo: input.docNo,
      orderRef: input.orderRef,
      debit: Number(abs),
      credit: Number(abs),
      accountId: WMS_GL_ACCOUNTS.cogs,
      kind: 'wms_issue_cogs',
    },
  });

  return { journalEntryId: posted.id, glDocNumber: glDocLabel(posted.id) };
}

/** رسید انبار — افزایش موجودی در برابر GRNI */
export async function postWmsReceiptGl(input: {
  tenantId: string;
  approverUserId: string;
  docNo: string;
  party: string;
  valueRial: bigint;
}): Promise<{ journalEntryId: string; glDocNumber: string } | null> {
  if (input.valueRial <= 0n) return null;

  ensureGlWorkflow(input.tenantId);
  const abs = input.valueRial;

  const draft = createDraft([
    {
      accountId: WMS_GL_ACCOUNTS.inventory,
      debit: abs,
      credit: 0n,
      description: `رسید انبار ${input.docNo} — ${input.party}`,
    },
    {
      accountId: WMS_GL_ACCOUNTS.goodsReceivedNotInvoiced,
      debit: 0n,
      credit: abs,
      description: `GRNI بابت رسید ${input.docNo}`,
    },
  ]);
  draft.tenantId = input.tenantId;
  saveJournalDraft(draft);

  const wf = StartWorkflow({
    tenantId: input.tenantId,
    definitionCode: 'gl_post',
    version: 1,
    entityType: 'journal_entry',
    entityId: draft.id,
  });
  Approve(wf.id, input.approverUserId, 'CFO', 'رسید انبار — موجودی');

  if (!isEntityApproved('journal_entry', draft.id)) {
    throw new ApprovalRequiredError('WmsReceiptGlPost');
  }

  const posted = postJournalEntry({ ...draft, workflowStatus: 'Approved' });
  saveJournalDraft(posted);

  publishWmsGlInventoryDelta(input.tenantId, Number(abs));

  await recordDomainEvent({
    eventType: FINANCE_EVENTS.GL_ENTRY_POSTED,
    aggregateId: posted.id,
    payload: {
      tenantId: input.tenantId,
      docNo: input.docNo,
      party: input.party,
      debit: Number(abs),
      credit: Number(abs),
      accountId: WMS_GL_ACCOUNTS.inventory,
      kind: 'wms_receipt_gr',
    },
  });

  return { journalEntryId: posted.id, glDocNumber: glDocLabel(posted.id) };
}
