import { randomUUID } from 'node:crypto';
import { TenantContext } from '@repo/domain';
import { runSaga, type SagaStep } from '@repo/module-sdk';
import { OPS_EVENTS } from '@repo/contracts';

const outbox: unknown[] = [];
let stock = 100n;

export function resetDistributionSaga(): void {
  outbox.length = 0;
  stock = 100n;
}

export function getDistributionStock() {
  return stock;
}

export async function confirmDelivery(tenantId: string): Promise<void> {
  const orderId = randomUUID();
  const steps: SagaStep[] = [
    {
      name: 'InventoryDecrement',
      execute: async () => {
        stock -= 5n;
      },
      compensate: async () => {
        stock += 5n;
      },
    },
    {
      name: 'FinancePostAR',
      execute: async () => {
        outbox.push({ type: OPS_EVENTS.DELIVERY_CONFIRMED, orderId });
      },
      compensate: async () => {
        outbox.pop();
      },
    },
  ];
  await TenantContext.runAsync(
    {
      tenantId,
      userId: 'u1',
      correlationId: orderId,
      traceId: 't1',
      isSuperAdmin: false,
    },
    () => runSaga(steps),
  );
}
