import { TenantContext } from '@repo/domain';
import type { WmsDocumentKind } from '../generated/index.js';
import { wmsPersistenceEnabled } from './client.js';
import { operationsTransaction } from './rls.js';

export type PersistedWmsDocument = {
  docNo: string;
  kind: 'receipt' | 'issue' | 'transfer';
  body: Record<string, unknown>;
};

function toPrismaKind(kind: PersistedWmsDocument['kind']): WmsDocumentKind {
  if (kind === 'receipt') return 'Receipt';
  if (kind === 'issue') return 'Issue';
  return 'Transfer';
}

export async function upsertWmsStockDocumentPrisma(doc: PersistedWmsDocument): Promise<void> {
  if (!wmsPersistenceEnabled()) return;
  const tenantId = TenantContext.requireTenantId();
  await operationsTransaction(async (tx) => {
    await tx.wmsStockDocument.upsert({
      where: { tenantId_docNo: { tenantId, docNo: doc.docNo } },
      create: {
        tenantId,
        docNo: doc.docNo,
        kind: toPrismaKind(doc.kind),
        body: doc.body as object,
      },
      update: {
        kind: toPrismaKind(doc.kind),
        body: doc.body as object,
      },
    });
  });
}

export async function listWmsStockDocumentsPrisma(): Promise<PersistedWmsDocument[]> {
  if (!wmsPersistenceEnabled()) return [];
  const tenantId = TenantContext.requireTenantId();
  const rows = await operationsTransaction((tx) =>
    tx.wmsStockDocument.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      take: 500,
    }),
  );
  return rows.map((r) => ({
    docNo: r.docNo,
    kind: r.kind === 'Receipt' ? 'receipt' : r.kind === 'Issue' ? 'issue' : 'transfer',
    body: r.body as Record<string, unknown>,
  }));
}
