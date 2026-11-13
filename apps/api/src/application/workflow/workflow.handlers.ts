import { TenantContext } from '@repo/domain';
import {
  Approve,
  Escalate,
  Reject,
  StartWorkflow,
  delegate as Delegate,
  getWorkflowInboxSummary,
  listWorkflowInstances,
  workflowPersistenceEnabled,
} from '@repo/db-erp-finance';
import { ensureDemoWorkflowInbox } from '../../modules/workflow/workflow-demo.seed';

export function workflowInboxQuery() {
  const tenantId = TenantContext.requireTenantId();
  ensureDemoWorkflowInbox(tenantId);
  return {
    tenantId,
    summary: getWorkflowInboxSummary(tenantId),
    instances: listWorkflowInstances(tenantId),
    source: workflowPersistenceEnabled() ? 'workflow_file_store' : 'workflow_memory',
  };
}

export function startWorkflowCommand(body: {
  tenantId?: string;
  definitionCode: string;
  version: number;
  entityType: string;
  entityId: string;
  correlationId?: string;
}) {
  const tenantId = TenantContext.requireTenantId();
  return StartWorkflow({ ...body, tenantId });
}

export function approveWorkflowCommand(
  instanceId: string,
  body: { userId: string; userRole: string; comment?: string },
) {
  return Approve(instanceId, body.userId, body.userRole, body.comment);
}

export function rejectWorkflowCommand(instanceId: string, body: { userId: string; comment?: string }) {
  return Reject(instanceId, body.userId, body.comment);
}

export function delegateWorkflowCommand(instanceId: string, body: { userId: string; toUserId: string }) {
  return Delegate(instanceId, body.userId, body.toUserId);
}

export function escalateWorkflowCommand(instanceId: string) {
  return Escalate(instanceId);
}
