import { randomUUID } from 'node:crypto';
import { TenantContext } from '@repo/domain';
import type { JournalEntryDraft, GlLineInput } from '../gl/ledger.service.js';
import { financePersistenceEnabled, financePrisma } from './client.js';
import { financeTransaction } from './rls.js';
import { rlsSessionEnabled } from '@repo/db-core-adapter';

const DEMO_JOURNAL_ID = 'j0000000-0000-4000-8000-000000000001';

export const DEMO_ACCOUNT_IDS = {
  '1101': 'a0000000-0000-4000-8000-000000001101',
  '2101': 'a0000000-0000-4000-8000-000000002101',
} as const;

export async function ensureFinanceTenantBootstrap(tenantId: string): Promise<void> {
  if (!financePersistenceEnabled()) return;
  const journal = await financePrisma.journal.findFirst({ where: { tenantId, code: 'GEN' } });
  if (!journal) {
    await financePrisma.journal.create({
      data: { id: DEMO_JOURNAL_ID, tenantId, code: 'GEN', nameFa: 'روزنامه عمومی' },
    });
  }
  for (const [code, id, type] of [
    ['1101', DEMO_ACCOUNT_IDS['1101'], 'ASSET'],
    ['2101', DEMO_ACCOUNT_IDS['2101'], 'LIABILITY'],
  ] as const) {
    await financePrisma.chartOfAccount.upsert({
      where: { tenantId_code: { tenantId, code } },
      update: {},
      create: {
        id,
        tenantId,
        code,
        nameFa: code === '1101' ? 'صندوق' : 'بستانکاران',
        accountType: type,
      },
    });
  }
}

function resolveAccountId(accountIdOrCode: string): string {
  if (accountIdOrCode in DEMO_ACCOUNT_IDS) {
    return DEMO_ACCOUNT_IDS[accountIdOrCode as keyof typeof DEMO_ACCOUNT_IDS];
  }
  return accountIdOrCode;
}

function toDraft(row: {
  id: string;
  tenantId: string;
  status: string;
  entryDate: Date;
  glLines: { accountId: string; debit: bigint; credit: bigint }[];
}): JournalEntryDraft {
  return {
    id: row.id,
    tenantId: row.tenantId,
    status: row.status as JournalEntryDraft['status'],
    entryDate: row.entryDate,
    lines: row.glLines.map((l) => ({
      accountId: l.accountId,
      debit: l.debit,
      credit: l.credit,
    })),
    fiscalPeriodStatus: 'Open',
    workflowStatus: row.status === 'Posted' ? 'Approved' : 'Pending',
  };
}

export async function listJournalDraftsPrisma(tenantId: string): Promise<JournalEntryDraft[]> {
  if (!financePersistenceEnabled()) return [];
  await ensureFinanceTenantBootstrap(tenantId);
  const rows = await financePrisma.journalEntry.findMany({
    where: { tenantId },
    orderBy: { createdAt: 'desc' },
    include: { glLines: true },
  });
  return rows.map(toDraft);
}

export async function createJournalDraftPrisma(
  tenantId: string,
  lines: GlLineInput[],
): Promise<JournalEntryDraft> {
  await ensureFinanceTenantBootstrap(tenantId);
  const ctx = TenantContext.get();
  const journal =
    (await financePrisma.journal.findFirst({ where: { tenantId, code: 'GEN' } })) ??
    (await financePrisma.journal.create({
      data: { id: randomUUID(), tenantId, code: 'GEN', nameFa: 'روزنامه عمومی' },
    }));
  const entryId = randomUUID();
  const data = {
    id: entryId,
    tenantId,
    journalId: journal.id,
    entryNumber: `JE-${Date.now()}`,
    entryDate: new Date(),
    description: 'ثبت API',
    status: 'Draft' as const,
    correlationId: ctx?.correlationId ?? randomUUID(),
    glLines: {
      create: lines.map((l) => ({
        id: randomUUID(),
        tenantId,
        accountId: resolveAccountId(l.accountId),
        debit: l.debit,
        credit: l.credit,
      })),
    },
  };
  const entry = rlsSessionEnabled()
    ? await financeTransaction((tx) => tx.journalEntry.create({ data, include: { glLines: true } }))
    : await financePrisma.journalEntry.create({ data, include: { glLines: true } });
  return toDraft(entry);
}

export async function postJournalDraftPrisma(entryId: string): Promise<JournalEntryDraft> {
  const body = async (
    tx: import('../generated/index.js').Prisma.TransactionClient,
  ) => {
    const current = await tx.journalEntry.findUnique({ where: { id: entryId }, include: { glLines: true } });
    if (!current) throw new Error('Journal entry not found');
    if (current.status === 'Posted') {
      return current;
    }
    const updated = await tx.journalEntry.update({
      where: { id: entryId },
      data: { status: 'Posted', postedAt: new Date() },
      include: { glLines: true },
    });
    await tx.glEntry.updateMany({
      where: { journalEntryId: entryId },
      data: { posted: true },
    });
    return updated;
  };
  const posted = rlsSessionEnabled()
    ? await financeTransaction((tx) => body(tx))
    : await financePrisma.$transaction((tx) => body(tx));
  return toDraft(posted);
}
