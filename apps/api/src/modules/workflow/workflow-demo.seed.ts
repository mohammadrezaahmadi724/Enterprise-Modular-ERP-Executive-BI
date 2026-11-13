import { randomUUID } from 'node:crypto';
import { getWorkflowInboxSummary, listWorkflowInstances, registerWorkflowDefinition, startWorkflow } from '@repo/db-erp-finance';

const DEMO_TENANT = '11111111-1111-4111-8111-111111111111';

export function ensureDemoWorkflowInbox(tenantId: string): void {
  if (tenantId !== DEMO_TENANT) return;
  const running = listWorkflowInstances(tenantId).filter((i) => i.status === 'Running');
  if (running.length > 0) return;

  registerWorkflowDefinition({
    id: randomUUID(),
    tenantId,
    code: 'procurement_pr_approval',
    version: 1,
    steps: [
      { stepOrder: 1, nameFa: 'تأیید مدیر خرید', approverRole: 'PROCUREMENT_MANAGER', timeoutHours: 48 },
      { stepOrder: 2, nameFa: 'تأیید CFO', approverRole: 'CFO', timeoutHours: 72, escalationRole: 'CEO' },
    ],
  });

  registerWorkflowDefinition({
    id: randomUUID(),
    tenantId,
    code: 'wms_adjustment_approval',
    version: 1,
    steps: [{ stepOrder: 1, nameFa: 'تأیید انباردار', approverRole: 'WAREHOUSE_MANAGER', timeoutHours: 24 }],
  });

  startWorkflow({
    tenantId,
    definitionCode: 'procurement_pr_approval',
    version: 1,
    entityType: 'purchase_request',
    entityId: 'PR-1404-00912',
    correlationId: randomUUID(),
  });

  startWorkflow({
    tenantId,
    definitionCode: 'wms_adjustment_approval',
    version: 1,
    entityType: 'wms_adjustment',
    entityId: 'ADJ-1404-0044',
    correlationId: randomUUID(),
  });

  void getWorkflowInboxSummary(tenantId);
}
