import { randomUUID } from 'node:crypto';
import { rlsSessionEnabled, withRlsRead } from '@repo/db-core-adapter';
import type { QcInspectionRow, QcResultCode } from '../qc/qc.types.js';
import { operationsPrisma, wmsPersistenceEnabled } from './client.js';
import { operationsTransaction } from './rls.js';

function resultFa(result: QcResultCode): string {
  if (result === 'Pass') return 'قبول';
  if (result === 'Fail') return 'رد';
  return 'نگه‌داری';
}

export function qcPersistenceEnabled(): boolean {
  return (
    process.env.QC_PERSISTENCE === '1' ||
    process.env.QC_PERSISTENCE === 'true' ||
    wmsPersistenceEnabled()
  );
}

async function findQcRows(tenantId: string) {
  const query = async (client: typeof operationsPrisma) =>
    client.qcInspection.findMany({
      where: { tenantId },
      include: { productionOrder: true },
      orderBy: { inspectionDate: 'desc' },
      take: 50,
    });

  if (rlsSessionEnabled()) {
    return withRlsRead(operationsPrisma, (tx) => query(tx as typeof operationsPrisma));
  }
  return query(operationsPrisma);
}

export async function ensureQcDemoPrismaSeed(tenantId: string): Promise<void> {
  if (!qcPersistenceEnabled()) return;
  const existing = await findQcRows(tenantId);
  if (existing.length > 0) return;

  const poId = randomUUID();
  const now = new Date();
  const data = {
    id: randomUUID(),
    tenantId,
    orderNumber: 'WO-DEMO-QC-001',
    productId: 'PRD-DEMO-A',
    bomId: randomUUID(),
    quantity: 100,
    plannedStart: now,
    plannedEnd: now,
    status: 'InProgress' as const,
    correlationId: randomUUID(),
  };

  await operationsTransaction(async (tx) => {
    const bom = await tx.bom.create({
      data: {
        id: data.bomId,
        tenantId,
        productId: data.productId,
        version: 1,
        isActive: true,
        effectiveFrom: now,
      },
    });
    await tx.productionOrder.create({
      data: { ...data, id: poId, bomId: bom.id },
    });
    await tx.qcInspection.create({
      data: {
        id: randomUUID(),
        tenantId,
        productionOrderId: poId,
        inspectionDate: now,
        checklist: { items: ['بسته‌بندی', 'وزن'] },
        result: 'Pass',
      },
    });
    await tx.qcInspection.create({
      data: {
        id: randomUUID(),
        tenantId,
        productionOrderId: poId,
        inspectionDate: now,
        checklist: { items: ['برچسب'] },
        result: 'Conditional',
      },
    });
  });
}

export async function listQcInspectionsPrisma(tenantId: string): Promise<QcInspectionRow[] | null> {
  if (!qcPersistenceEnabled()) return null;
  try {
    await ensureQcDemoPrismaSeed(tenantId);
    const rows = await findQcRows(tenantId);
    return rows.map((r, i) => ({
      id: r.id,
      tenantId: r.tenantId,
      code: `QC-${r.productionOrder.orderNumber.slice(-4)}-${i + 1}`,
      productionOrderId: r.productionOrderId,
      workOrderNumber: r.productionOrder.orderNumber,
      productLabel: r.productionOrder.productId,
      inspectionDate: r.inspectionDate.toISOString(),
      result: r.result as QcResultCode,
      resultFa: resultFa(r.result as QcResultCode),
    }));
  } catch {
    return null;
  }
}
