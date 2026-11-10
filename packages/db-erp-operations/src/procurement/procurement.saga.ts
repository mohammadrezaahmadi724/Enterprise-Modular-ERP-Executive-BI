import { randomUUID } from 'node:crypto';
import { TenantContext } from '@repo/domain';
import { runSaga, type SagaStep } from '@repo/module-sdk';
import {
  approve,
  isEntityApproved,
  registerWorkflowDefinition,
  startWorkflow,
} from '@repo/db-erp-finance';
import { OPS_EVENTS } from '@repo/contracts';

type State = { prId: string; poId?: string; grId?: string; stockApplied: boolean };
const state: State = { prId: '', stockApplied: false };
const outbox: unknown[] = [];

export function resetProcurementSaga(): void {
  state.prId = '';
  state.poId = undefined;
  state.grId = undefined;
  state.stockApplied = false;
  outbox.length = 0;
}

export function getProcurementOutbox() {
  return [...outbox];
}

export async function runProcurementChain(tenantId: string, approverRole: string): Promise<void> {
  const prId = randomUUID();
  state.prId = prId;
  registerWorkflowDefinition({
    id: 'pr-def',
    tenantId,
    code: 'purchase_request',
    version: 1,
    steps: [{ stepOrder: 1, nameFa: 'تایید خرید', approverRole, timeoutHours: 48 }],
  });
  const wf = startWorkflow({
    tenantId,
    definitionCode: 'purchase_request',
    version: 1,
    entityType: 'purchase_request',
    entityId: prId,
  });
  approve(wf.id, 'mgr', approverRole);
  if (!isEntityApproved('purchase_request', prId)) throw new Error('approval failed');

  const steps: SagaStep[] = [
    {
      name: 'CreatePO',
      execute: async () => {
        state.poId = randomUUID();
      },
      compensate: async () => {
        state.poId = undefined;
      },
    },
    {
      name: 'GoodsReceipt',
      execute: async () => {
        state.grId = randomUUID();
      },
      compensate: async () => {
        state.grId = undefined;
      },
    },
    {
      name: 'StockMovement',
      execute: async () => {
        state.stockApplied = true;
        outbox.push({ type: OPS_EVENTS.PROCUREMENT_COMPLETED, prId });
      },
      compensate: async () => {
        state.stockApplied = false;
      },
    },
  ];

  await TenantContext.runAsync(
    {
      tenantId,
      userId: 'u1',
      correlationId: prId,
      traceId: 't1',
      isSuperAdmin: false,
    },
    () => runSaga(steps),
  );
}
