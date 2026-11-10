import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TenantContext } from '@repo/domain';
import { FINANCE_EVENTS } from '@repo/contracts';
import { ModuleEntitlementGuard, RequireModule } from '@repo/module-sdk';
import { RequirePermission } from '../../decorators/access.decorator';
import { TenantGuard } from '../../guards/tenant.guard';
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

function serializeEntry(entry: JournalEntryDraft) {
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

@Controller('api/v1/finance')
@UseGuards(TenantGuard, ModuleEntitlementGuard)
export class FinanceController {
  @Get('journal/entries')
  @RequireModule('finance-base')
  @RequirePermission('finance.read')
  async listEntries() {
    const tenantId = TenantContext.requireTenantId();
    if (financePersistenceEnabled()) {
      const entries = await listJournalDraftsPrisma(tenantId);
      return { entries: entries.map(serializeEntry) };
    }
    return { entries: listJournalDrafts(tenantId).map(serializeEntry) };
  }

  @Post('journal/draft')
  @RequireModule('finance-base')
  @RequirePermission('finance.write')
  async createDraft(
    @Body()
    body: {
      lines: { accountId: string; debit: string; credit: string; description?: string }[];
    },
  ) {
    const tenantId = TenantContext.requireTenantId();
    const lines: GlLineInput[] = body.lines.map((l) => ({
      accountId: l.accountId,
      debit: BigInt(l.debit),
      credit: BigInt(l.credit),
      description: l.description,
    }));
    if (financePersistenceEnabled()) {
      const draft = await createJournalDraftPrisma(tenantId, lines);
      return { draft: serializeEntry(draft) };
    }
    const draft = createDraft(lines);
    draft.tenantId = tenantId;
    saveJournalDraft(draft);
    return { draft: serializeEntry(draft) };
  }

  @Post('journal/post')
  @RequireModule('finance-base')
  @RequirePermission('finance.write')
  async postJournal(
    @Body()
    body: {
      draft: JournalEntryDraft & {
        lines: { accountId: string; debit: string | bigint; credit: string | bigint; description?: string }[];
        entryDate?: string;
      };
      workflowInstanceId?: string;
      approverUserId?: string;
      approverRole?: string;
    },
  ) {
    const draft: JournalEntryDraft = {
      ...body.draft,
      entryDate: body.draft.entryDate ? new Date(body.draft.entryDate) : new Date(),
      lines: body.draft.lines.map((l) => ({
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
      if (body.approverUserId && body.approverRole) {
        Approve(wf.id, body.approverUserId, body.approverRole, 'POST from API');
      }
      if (!isEntityApproved('journal_entry', draft.id)) {
        return { status: 'approval_required', workflowInstanceId: wf.id };
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
      payload: {
        journalEntryId: posted.id,
        tenantId: posted.tenantId,
        debit: totalDebit.toString(),
        credit: totalCredit.toString(),
        accountId: draft.lines[0]?.accountId ?? 'unknown',
        periodStart: posted.entryDate.toISOString().slice(0, 10),
      },
    });
    return { status: 'posted', entry: serializeEntry(posted) };
  }

  @Get('journal/:id/workflow')
  @RequireModule('finance-base')
  @RequirePermission('finance.read')
  workflowStatus(@Param('id') id: string) {
    return {
      approved: isEntityApproved('journal_entry', id),
    };
  }
}
