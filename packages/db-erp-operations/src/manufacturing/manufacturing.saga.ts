import { randomUUID } from 'node:crypto';
import { TenantContext } from '@repo/domain';
import { runSaga, type SagaStep } from '@repo/module-sdk';
import { OPS_EVENTS } from '@repo/contracts';

const outbox: unknown[] = [];
let fgStock = 0n;

export function resetManufacturingSaga(): void {
  outbox.length = 0;
  fgStock = 0n;
}

export function getFgStock() {
  return fgStock;
}

export async function completeProduction(tenantId: string): Promise<void> {
  const poId = randomUUID();
  const steps: SagaStep[] = [
    {
      name: 'InventoryIncrement',
      execute: async () => {
        fgStock += 20n;
      },
      compensate: async () => {
        fgStock -= 20n;
      },
    },
    {
      name: 'FinancePostCOGS',
      execute: async () => {
        outbox.push({ type: OPS_EVENTS.PRODUCTION_COMPLETED, poId });
      },
      compensate: async () => {},
    },
  ];
  await TenantContext.runAsync(
    {
      tenantId,
      userId: 'u1',
      correlationId: poId,
      traceId: 't1',
      isSuperAdmin: false,
    },
    () => runSaga(steps),
  );
}
