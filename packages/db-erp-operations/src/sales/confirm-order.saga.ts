import { TenantContext } from '@repo/domain';
import { runSaga, type SagaStep } from '@repo/module-sdk';
import { SALES_EVENTS } from '@repo/contracts';

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

export function getSalesOutbox() {
  return [...outbox];
}

function lockKey(productId: string, warehouseId: string) {
  return `${productId}:${warehouseId}`;
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

  await TenantContext.runAsync(
    {
      tenantId: '11111111-1111-4111-8111-111111111111',
      userId: 'u1',
      correlationId: `order-${ctx.orderId}`,
      traceId: 't1',
      isSuperAdmin: false,
    },
    async () => {
      try {
        await runSaga(steps);
      } catch {
        // compensated
      }
    },
  );

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
