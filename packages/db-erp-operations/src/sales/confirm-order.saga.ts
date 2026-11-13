import { TenantContext } from '@repo/domain';
import { runSaga, type SagaStep } from '@repo/module-sdk';
import { SALES_EVENTS } from '@repo/contracts';
import { recordStockMovementPrisma, upsertInventoryBalancePrisma } from '../prisma/inventory.repository.js';

export type ConfirmOrderContext = {
  orderId: string;
  lines: { productId: string; warehouseId: string; qty: bigint }[];
};

const inventory = new Map<string, { qty: bigint; reserved: bigint; version: number }>();
const outbox: unknown[] = [];

export function resetSalesStores(): void {
  inventory.clear();
  outbox.length = 0;
}

export function seedInventory(key: string, qty: bigint): void {
  inventory.set(key, { qty, reserved: 0n, version: 0 });
}

export function setInventoryBalance(key: string, qty: bigint, reserved: bigint): void {
  const row = inventory.get(key);
  inventory.set(key, {
    qty,
    reserved,
    version: (row?.version ?? 0) + 1,
  });
}

export function getInventoryBalance(productId: string, warehouseId: string) {
  return inventory.get(lockKey(productId, warehouseId));
}

export function applyStockIssue(productId: string, warehouseId: string, qty: bigint): boolean {
  const k = lockKey(productId, warehouseId);
  const row = inventory.get(k);
  if (!row || row.qty - row.reserved < qty) return false;
  row.qty -= qty;
  row.version += 1;
  return true;
}

export function applyStockReceipt(productId: string, warehouseId: string, qty: bigint): void {
  const k = lockKey(productId, warehouseId);
  const row = inventory.get(k) ?? { qty: 0n, reserved: 0n, version: 0 };
  row.qty += qty;
  row.version += 1;
  inventory.set(k, row);
}

export function getSalesOutbox() {
  return [...outbox];
}

function lockKey(productId: string, warehouseId: string) {
  return `${productId}:${warehouseId}`;
}

async function persistBalance(productId: string, warehouseId: string): Promise<void> {
  const k = lockKey(productId, warehouseId);
  const row = inventory.get(k);
  if (!row) return;
  try {
    await upsertInventoryBalancePrisma(productId, warehouseId, row.qty, row.reserved);
  } catch {
    // persistence optional when DB unavailable in dev
  }
}

/** رزرو موجودی برای سفارش فروش — بدون مرحله AR (برای تأیید تأمین / WMS). */
export async function reserveSalesOrderStock(ctx: ConfirmOrderContext): Promise<void> {
  for (const line of ctx.lines) {
    const k = lockKey(line.productId, line.warehouseId);
    const row = inventory.get(k);
    if (!row || row.qty - row.reserved < line.qty) {
      throw new Error('Insufficient stock');
    }
    row.reserved += line.qty;
    row.version += 1;
    await persistBalance(line.productId, line.warehouseId);
    try {
      await recordStockMovementPrisma({
        productId: line.productId,
        warehouseId: line.warehouseId,
        movementType: 'Reserve',
        quantity: line.qty,
        referenceType: 'sales_order',
        referenceId: ctx.orderId,
      });
    } catch {
      /* optional persistence */
    }
  }
}

export async function confirmSalesOrder(ctx: ConfirmOrderContext): Promise<void> {
  let arFailed = false;
  const steps: SagaStep[] = [
    {
      name: 'ReserveStock',
      execute: async () => {
        for (const line of ctx.lines) {
          const k = lockKey(line.productId, line.warehouseId);
          const row = inventory.get(k);
          if (!row || row.qty - row.reserved < line.qty) {
            throw new Error('Insufficient stock');
          }
          row.reserved += line.qty;
          row.version += 1;
        }
      },
      compensate: async () => {
        for (const line of ctx.lines) {
          const k = lockKey(line.productId, line.warehouseId);
          const row = inventory.get(k);
          if (row) row.reserved -= line.qty;
        }
      },
    },
    {
      name: 'PostARInvoice',
      execute: async () => {
        arFailed = true;
        throw new Error('Finance module unavailable');
      },
      compensate: async () => {},
    },
  ];

  const ambient = TenantContext.get();
  const scope = async () => {
    try {
      await runSaga(steps);
    } catch {
      // compensated
    }
  };

  if (ambient) {
    await scope();
  } else {
    await TenantContext.runAsync(
      {
        tenantId: '11111111-1111-4111-8111-111111111111',
        userId: 'u1',
        correlationId: `order-${ctx.orderId}`,
        traceId: 't1',
        isSuperAdmin: false,
      },
      scope,
    );
  }

  if (!arFailed) {
    outbox.push({ type: SALES_EVENTS.SALES_ORDER_CONFIRMED, orderId: ctx.orderId });
  }
}

export function reserveStockWithLock(productId: string, warehouseId: string, qty: bigint): boolean {
  const k = lockKey(productId, warehouseId);
  const row = inventory.get(k);
  if (!row || row.qty - row.reserved < qty) return false;
  row.reserved += qty;
  row.version += 1;
  return true;
}
