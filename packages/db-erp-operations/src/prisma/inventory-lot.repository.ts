import { TenantContext } from '@repo/domain';
import type { InventoryLotStatus } from '../generated/index.js';
import { crmPersistenceEnabled } from './client.js';
import { operationsSession } from './rls.js';

export type InventoryLotRow = {
  lotNumber: string;
  productId: string;
  warehouseId: string;
  quantity: bigint;
  expiryDate: string | null;
  status: 'active' | 'expired' | 'quarantine' | 'blocked';
  receivedAt: string;
};

function toDtoStatus(status: InventoryLotStatus): InventoryLotRow['status'] {
  switch (status) {
    case 'Expired':
      return 'expired';
    case 'Quarantine':
      return 'quarantine';
    case 'Blocked':
      return 'blocked';
    default:
      return 'active';
  }
}

function toPrismaStatus(status: InventoryLotRow['status']): InventoryLotStatus {
  switch (status) {
    case 'expired':
      return 'Expired';
    case 'quarantine':
      return 'Quarantine';
    case 'blocked':
      return 'Blocked';
    default:
      return 'Active';
  }
}

export async function upsertInventoryLotPrisma(row: InventoryLotRow): Promise<void> {
  if (!crmPersistenceEnabled()) return;
  const tenantId = TenantContext.requireTenantId();
  const expiryDate = row.expiryDate ? new Date(`${row.expiryDate}T00:00:00.000Z`) : null;
  await operationsSession(async (tx) => {
    await tx.inventoryLot.upsert({
      where: { tenantId_lotNumber: { tenantId, lotNumber: row.lotNumber } },
      create: {
        tenantId,
        productId: row.productId,
        warehouseId: row.warehouseId,
        lotNumber: row.lotNumber,
        quantity: row.quantity,
        expiryDate,
        status: toPrismaStatus(row.status),
        receivedAt: new Date(row.receivedAt),
        version: 1,
      },
      update: {
        productId: row.productId,
        warehouseId: row.warehouseId,
        quantity: row.quantity,
        expiryDate,
        status: toPrismaStatus(row.status),
        version: { increment: 1 },
      },
    });
  });
}

export async function listInventoryLotsPrisma(): Promise<InventoryLotRow[]> {
  if (!crmPersistenceEnabled()) return [];
  const tenantId = TenantContext.requireTenantId();
  const rows = await operationsSession((tx) => tx.inventoryLot.findMany({
    where: { tenantId },
    take: 2_000,
    orderBy: [{ expiryDate: 'asc' }, { receivedAt: 'asc' }],
  }));
  return rows.map((r) => ({
    lotNumber: r.lotNumber,
    productId: r.productId,
    warehouseId: r.warehouseId,
    quantity: r.quantity,
    expiryDate: r.expiryDate ? r.expiryDate.toISOString().slice(0, 10) : null,
    status: toDtoStatus(r.status),
    receivedAt: r.receivedAt.toISOString(),
  }));
}
