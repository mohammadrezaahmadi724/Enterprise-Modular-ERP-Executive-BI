import { TenantContext } from '@repo/domain';
import { queryFinanceHubReadModel } from '@repo/db-erp-bi-risk';
import {
  financePersistenceEnabled,
  listJournalDrafts,
  listJournalDraftsPrisma,
  type JournalEntryDraft,
} from '@repo/db-erp-finance';

function mapJournalRow(entry: JournalEntryDraft) {
  const debit = entry.lines.reduce((s, l) => s + l.debit, 0n);
  const credit = entry.lines.reduce((s, l) => s + l.credit, 0n);
  const statusFa =
    entry.status === 'Posted'
      ? 'ثبت قطعی'
      : entry.workflowStatus === 'Approved'
        ? 'تأییدشده'
        : entry.status === 'Draft'
          ? 'پیش‌نویس'
          : String(entry.status);

  return {
    id: entry.id,
    number: entry.id.slice(0, 8).toUpperCase(),
    date: entry.entryDate.toISOString().slice(0, 10),
    description: entry.lines[0]?.description ?? 'سند حسابداری',
    debitIrr: debit.toString(),
    creditIrr: credit.toString(),
    status: statusFa,
    statusCode: entry.status,
  };
}

export async function buildFinanceHubResponse() {
  const tenantId = TenantContext.requireTenantId();
  const readModel = queryFinanceHubReadModel(tenantId);

  let entries: JournalEntryDraft[] = [];
  try {
    entries = financePersistenceEnabled()
      ? await listJournalDraftsPrisma(tenantId)
      : listJournalDrafts(tenantId);
  } catch {
    entries = [];
  }

  const recent = entries
    .slice()
    .sort((a, b) => b.entryDate.getTime() - a.entryDate.getTime())
    .slice(0, 8)
    .map(mapJournalRow);

  return {
    fiscalPeriod: { label: 'آبان ۱۴۰۵', status: 'open' as const },
    ledger: { statutoryDefault: true },
    ...readModel,
    recentJournals: recent,
    recentJournalsSource: 'erp_finance.journal_drafts',
  };
}
