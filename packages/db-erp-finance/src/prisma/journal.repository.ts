import { randomUUID } from 'node:crypto';
import { PeriodLockedError, TenantContext } from '@repo/domain';
import type { JournalEntryDraft, GlLineInput } from '../gl/ledger.service.js';
import { financePersistenceEnabled, financePrisma } from './client.js';
import { financeTransaction } from './rls.js';
import { rlsSessionEnabled, withRlsRead } from '@repo/db-core-adapter';

const DEMO_JOURNAL_ID = 'j0000000-0000-4000-8000-000000000001';

export const DEMO_ACCOUNT_IDS = {
  '1101': 'a0000000-0000-4000-8000-000000001101',
  '2101': 'a0000000-0000-4000-8000-000000002101',
  '5101': 'a0000000-0000-4000-8000-000000005101',
} as const;

export async function ensureFinanceTenantBootstrap(tenantId: string): Promise<void> {
  if (!financePersistenceEnabled()) return;
  const journal = await financePrisma.journal.findFirst({ where: { tenantId, code: 'GEN' } });
  if (!journal) {
    await financePrisma.journal.create({
      data: { id: DEMO_JOURNAL_ID, tenantId, code: 'GEN', nameFa: 'روزنامه عمومی' },
    });
  }
  for (const [code, id, type, nameFa] of [
    ['1101', DEMO_ACCOUNT_IDS['1101'], 'ASSET', 'صندوق'],
    ['2101', DEMO_ACCOUNT_IDS['2101'], 'LIABILITY', 'بستانکاران'],
    ['5101', DEMO_ACCOUNT_IDS['5101'], 'EXPENSE', 'هزینه حقوق'],
  ] as const) {
    await financePrisma.chartOfAccount.upsert({
      where: { tenantId_code: { tenantId, code } },
      update: {},
      create: {
        id,
        tenantId,
        code,
        nameFa,
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
  const query = (client: typeof financePrisma) =>
    client.journalEntry.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      include: { glLines: true },
    });
  const rows = rlsSessionEnabled()
    ? ((await withRlsRead(financePrisma, (tx) => query(tx as typeof financePrisma))) as Awaited<
        ReturnType<typeof query>
      >)
    : await query(financePrisma);
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
  const write = async (tx: import('../generated/index.js').Prisma.TransactionClient) => {
    await assertFiscalPeriodOpen(tx, tenantId, data.entryDate);
    return tx.journalEntry.create({ data, include: { glLines: true } });
  };
  const entry = rlsSessionEnabled()
    ? await financeTransaction(write)
    : await financePrisma.$transaction(write);
  return toDraft(entry);
}

async function assertFiscalPeriodOpen(
  tx: import('../generated/index.js').Prisma.TransactionClient,
  tenantId: string,
  entryDate: Date,
): Promise<void> {
  const closed = await tx.fiscalPeriod.findFirst({
    where: {
      tenantId,
      startDate: { lte: entryDate },
      endDate: { gte: entryDate },
      status: { in: ['Closed', 'Locked'] },
    },
  });
  if (closed) throw new PeriodLockedError(closed.status);
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
    await assertFiscalPeriodOpen(tx, current.tenantId, current.entryDate);
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
