import { TenantContext } from '@repo/domain';
import { recordStockMovementPrisma } from './inventory.repository.js';

export async function recordWmsLotTrace(input: {
  sku: string;
  warehouse: string;
  batchNo: string;
  quantity: bigint;
  direction: 'In' | 'Out';
  referenceId: string;
}): Promise<void> {
  void TenantContext.requireTenantId();
  await recordStockMovementPrisma({
    productId: input.sku,
    warehouseId: input.warehouse,
    movementType: input.direction === 'In' ? 'In' : 'Out',
    quantity: input.quantity,
    referenceType: 'wms_lot',
    referenceId: `${input.batchNo}:${input.referenceId}`,
  });
}
