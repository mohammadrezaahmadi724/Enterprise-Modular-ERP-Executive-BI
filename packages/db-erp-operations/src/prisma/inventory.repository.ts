import { TenantContext } from '@repo/domain';
import type { MovementType } from '../generated/index.js';
import { operationsPrisma, wmsPersistenceEnabled } from './client.js';
import { operationsTransaction } from './rls.js';

export async function upsertInventoryBalancePrisma(
  productId: string,
  warehouseId: string,
  quantity: bigint,
  reservedQuantity: bigint,
): Promise<void> {
  if (!wmsPersistenceEnabled()) return;
  const tenantId = TenantContext.requireTenantId();
  await operationsTransaction(async (tx) => {
    await tx.inventoryBalance.upsert({
      where: {
        tenantId_productId_warehouseId: { tenantId, productId, warehouseId },
      },
      create: {
        tenantId,
        productId,
        warehouseId,
        quantity,
        reservedQuantity,
        version: 1,
      },
      update: {
        quantity,
        reservedQuantity,
        version: { increment: 1 },
      },
    });
  });
}

export async function recordStockMovementPrisma(input: {
  productId: string;
  warehouseId: string;
  movementType: MovementType;
  quantity: bigint;
  referenceType: string;
  referenceId: string;
}): Promise<void> {
  if (!wmsPersistenceEnabled()) return;
  const tenantId = TenantContext.requireTenantId();
  await operationsTransaction(async (tx) => {
    await tx.stockMovement.create({
      data: {
        tenantId,
        productId: input.productId,
        warehouseId: input.warehouseId,
        movementType: input.movementType,
        quantity: input.quantity,
        referenceType: input.referenceType,
        referenceId: input.referenceId,
      },
    });
  });
}

export async function listInventoryBalancesPrisma(): Promise<
  Array<{
    productId: string;
    warehouseId: string;
    quantity: bigint;
    reservedQuantity: bigint;
  }>
> {
  if (!wmsPersistenceEnabled()) return [];
  const tenantId = TenantContext.requireTenantId();
  return operationsTransaction((tx) =>
    tx.inventoryBalance.findMany({
      where: { tenantId },
      select: {
        productId: true,
        warehouseId: true,
        quantity: true,
        reservedQuantity: true,
      },
      take: 500,
    }),
  );
}
