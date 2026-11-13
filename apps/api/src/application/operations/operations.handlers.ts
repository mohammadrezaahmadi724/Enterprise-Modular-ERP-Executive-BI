import { TenantContext } from '@repo/domain';
import {
  completeProduction,
  confirmDelivery,
  confirmSalesOrder,
  getDistributionStock,
  getFgStock,
  getSalesOutbox,
  reserveStockWithLock,
  seedInventory,
} from '@repo/db-erp-operations';

export function operationsStatusQuery() {
  return {
    distributionStock: String(getDistributionStock()),
    fgStock: String(getFgStock()),
    salesOutbox: getSalesOutbox(),
  };
}

export async function confirmSaleCommand(body: {
  orderId: string;
  lines: { productId: string; warehouseId: string; qty: string }[];
}) {
  await confirmSalesOrder({
    orderId: body.orderId,
    lines: body.lines.map((line) => ({
      productId: line.productId,
      warehouseId: line.warehouseId,
      qty: BigInt(line.qty),
    })),
  });
  return { ok: true as const, outbox: getSalesOutbox() };
}

export function seedInventoryCommand(body: { productId: string; warehouseId: string; qty: string }) {
  seedInventory(`${body.productId}:${body.warehouseId}`, BigInt(body.qty));
  return { ok: true as const };
}

export function reserveStockCommand(body: { productId: string; warehouseId: string; qty: string }) {
  return { reserved: reserveStockWithLock(body.productId, body.warehouseId, BigInt(body.qty)) };
}

export async function confirmDeliveryCommand() {
  const tenantId = TenantContext.requireTenantId();
  await confirmDelivery(tenantId);
  return { ok: true as const, stock: String(getDistributionStock()) };
}

export async function completeProductionCommand() {
  const tenantId = TenantContext.requireTenantId();
  await completeProduction(tenantId);
  return { ok: true as const, fgStock: String(getFgStock()) };
}
