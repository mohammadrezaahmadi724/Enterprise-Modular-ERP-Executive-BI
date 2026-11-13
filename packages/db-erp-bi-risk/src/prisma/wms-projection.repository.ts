import type { Prisma } from '../generated/index.js';
import type { WmsKardexEntry } from '../dashboard/wms-kardex-read-model.js';
import { biReadModelPersistenceEnabled, biRiskPrisma } from './client.js';

export async function persistWmsKardexLinePrisma(tenantId: string, entry: WmsKardexEntry): Promise<void> {
  if (!biReadModelPersistenceEnabled()) return;
  try {
    await biRiskPrisma.projectionWmsKardexLine.upsert({
      where: { tenantId_eventId: { tenantId, eventId: entry.id } },
      create: {
        tenantId,
        eventId: entry.id,
        sku: entry.sku,
        warehouse: entry.warehouse,
        movement: entry.movement,
        qtyIn: entry.qtyIn,
        qtyOut: entry.qtyOut,
        reference: entry.reference,
        recordedAt: new Date(entry.at),
      },
      update: {
        sku: entry.sku,
        warehouse: entry.warehouse,
        movement: entry.movement,
        qtyIn: entry.qtyIn,
        qtyOut: entry.qtyOut,
        reference: entry.reference,
      },
    });
  } catch {
    /* DB ممکن است در dev migrate نشده باشد */
  }
}

export async function persistWmsSlicePrisma(
  tenantId: string,
  projection: string,
  partKey: string,
  payload: Record<string, unknown>,
  eventId: string,
  version: number,
): Promise<void> {
  if (!biReadModelPersistenceEnabled()) return;
  try {
    await biRiskPrisma.projectionWmsSlice.upsert({
      where: {
        tenantId_projection_partKey: { tenantId, projection, partKey },
      },
      create: {
        tenantId,
        projection,
        partKey,
        payload: payload as Prisma.InputJsonValue,
        lastProcessedEventId: eventId,
        lastProcessedVersion: version,
      },
      update: {
        payload: payload as Prisma.InputJsonValue,
        lastProcessedEventId: eventId,
        lastProcessedVersion: version,
      },
    });
  } catch {
    /* optional */
  }
}

export async function persistWmsTrackingContractPrisma(
  tenantId: string,
  sku: string,
  payload: Record<string, unknown>,
): Promise<void> {
  if (!biReadModelPersistenceEnabled()) return;
  try {
    await biRiskPrisma.projectionWmsTrackingContract.upsert({
      where: { tenantId_sku: { tenantId, sku } },
      create: { tenantId, sku, payload: payload as Prisma.InputJsonValue },
      update: { payload: payload as Prisma.InputJsonValue },
    });
  } catch {
    /* optional */
  }
}

export async function listWmsTrackingContractsPrisma(
  tenantId: string,
  take = 200,
): Promise<Array<Record<string, unknown>>> {
  if (!biReadModelPersistenceEnabled()) return [];
  try {
    const rows = await biRiskPrisma.projectionWmsTrackingContract.findMany({
      where: { tenantId },
      take,
    });
    return rows.map((r) => r.payload as Record<string, unknown>);
  } catch {
    return [];
  }
}

export async function listWmsKardexLinesPrisma(tenantId: string, take = 100): Promise<WmsKardexEntry[]> {
  if (!biReadModelPersistenceEnabled()) return [];
  try {
    const rows = await biRiskPrisma.projectionWmsKardexLine.findMany({
      where: { tenantId },
      orderBy: { recordedAt: 'desc' },
      take,
    });
    return rows.map((r) => ({
      id: r.eventId,
      at: r.recordedAt.toISOString(),
      sku: r.sku,
      warehouse: r.warehouse,
      movement: r.movement as WmsKardexEntry['movement'],
      qtyIn: r.qtyIn,
      qtyOut: r.qtyOut,
      reference: r.reference,
    }));
  } catch {
    return [];
  }
}
