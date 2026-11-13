import { TenantContext } from '@repo/domain';
import { wmsPersistenceEnabled } from './client.js';
import { operationsTransaction } from './rls.js';

export type PersistedWmsReservation = {
  id: string;
  body: Record<string, unknown>;
  status: string;
};

export async function upsertWmsReservationPrisma(row: PersistedWmsReservation): Promise<void> {
  if (!wmsPersistenceEnabled()) return;
  const tenantId = TenantContext.requireTenantId();
  await operationsTransaction(async (tx) => {
    await tx.wmsReservationRecord.upsert({
      where: { tenantId_reservationCode: { tenantId, reservationCode: row.id } },
      create: {
        tenantId,
        reservationCode: row.id,
        body: row.body as object,
        status: row.status,
      },
      update: {
        body: row.body as object,
        status: row.status,
      },
    });
  });
}

export async function listWmsReservationsPrisma(): Promise<PersistedWmsReservation[]> {
  if (!wmsPersistenceEnabled()) return [];
  const tenantId = TenantContext.requireTenantId();
  const rows = await operationsTransaction((tx) =>
    tx.wmsReservationRecord.findMany({
      where: { tenantId },
      orderBy: { updatedAt: 'desc' },
      take: 500,
    }),
  );
  return rows.map((r) => ({
    id: r.reservationCode,
    body: r.body as Record<string, unknown>,
    status: r.status,
  }));
}
