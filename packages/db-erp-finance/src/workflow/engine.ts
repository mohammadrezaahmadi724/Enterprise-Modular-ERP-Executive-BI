import { randomUUID } from 'node:crypto';
import { WORKFLOW_EVENTS } from '@repo/contracts';
import { loadWorkflowSnapshot, saveWorkflowSnapshot, workflowPersistenceEnabled } from './file-store.js';

export type WorkflowStepDef = {
  stepOrder: number;
  nameFa: string;
  approverRole: string;
  timeoutHours: number;
  escalationRole?: string;
};

export type WorkflowDefinitionRecord = {
  id: string;
  tenantId: string;
  code: string;
  version: number;
  steps: WorkflowStepDef[];
};

export type WorkflowInstanceRecord = {
  id: string;
  tenantId: string;
  definitionId: string;
  entityType: string;
  entityId: string;
  status: 'Running' | 'Approved' | 'Rejected' | 'Escalated' | 'Canceled';
  currentStepOrder: number;
  correlationId: string;
  delegateToUserId?: string;
};

const definitions = new Map<string, WorkflowDefinitionRecord>();
const instances = new Map<string, WorkflowInstanceRecord>();
const outbox: Array<{ type: string; payload: unknown }> = [];

function persistWorkflowState(): void {
  if (!workflowPersistenceEnabled()) return;
  saveWorkflowSnapshot({
    definitions: [...definitions.values()],
    instances: [...instances.values()],
  });
}

function hydrateWorkflowState(): void {
  const snap = loadWorkflowSnapshot();
  if (!snap) return;
  for (const d of snap.definitions) {
    definitions.set(`${d.tenantId}:${d.code}:${d.version}`, d);
  }
  for (const i of snap.instances) instances.set(i.id, i);
}

hydrateWorkflowState();

export function resetWorkflowEngine(): void {
  definitions.clear();
  instances.clear();
  outbox.length = 0;
}

export function getWorkflowOutbox() {
  return [...outbox];
}

export function registerWorkflowDefinition(def: WorkflowDefinitionRecord): void {
  definitions.set(`${def.tenantId}:${def.code}:${def.version}`, def);
  persistWorkflowState();
}

export function startWorkflow(input: {
  tenantId: string;
  definitionCode: string;
  version: number;
  entityType: string;
  entityId: string;
  correlationId?: string;
}): WorkflowInstanceRecord {
  const def = definitions.get(`${input.tenantId}:${input.definitionCode}:${input.version}`);
  if (!def) throw new Error('Workflow definition not found');
  const instance: WorkflowInstanceRecord = {
    id: randomUUID(),
    tenantId: input.tenantId,
    definitionId: def.id,
    entityType: input.entityType,
    entityId: input.entityId,
    status: 'Running',
    currentStepOrder: 1,
    correlationId: input.correlationId ?? randomUUID(),
  };
  instances.set(instance.id, instance);
  outbox.push({ type: WORKFLOW_EVENTS.WORKFLOW_STARTED, payload: { instanceId: instance.id } });
  persistWorkflowState();
  return instance;
}

export function isEntityApproved(entityType: string, entityId: string): boolean {
  return [...instances.values()].some(
    (i) => i.entityType === entityType && i.entityId === entityId && i.status === 'Approved',
  );
}

function getDef(instance: WorkflowInstanceRecord): WorkflowDefinitionRecord {
  const def = [...definitions.values()].find((d) => d.id === instance.definitionId);
  if (!def) throw new Error('Definition missing');
  return def;
}

export function approve(instanceId: string, userId: string, userRole: string, _comment?: string): WorkflowInstanceRecord {
  const instance = instances.get(instanceId);
  if (!instance || instance.status !== 'Running') throw new Error('Invalid instance');
  const def = getDef(instance);
  const step = def.steps.find((s) => s.stepOrder === instance.currentStepOrder);
  if (!step) throw new Error('Step not found');
  if (step.approverRole !== userRole && !instance.delegateToUserId) {
    throw new Error('Insufficient approver role');
  }
  const next = def.steps.find((s) => s.stepOrder === instance.currentStepOrder + 1);
  if (next) {
    instance.currentStepOrder += 1;
    instance.delegateToUserId = undefined;
  } else {
    instance.status = 'Approved';
    outbox.push({ type: WORKFLOW_EVENTS.WORKFLOW_APPROVED, payload: { instanceId } });
  }
  persistWorkflowState();
  return instance;
}

export function reject(instanceId: string, _userId: string, _comment?: string): WorkflowInstanceRecord {
  const instance = instances.get(instanceId);
  if (!instance) throw new Error('Instance not found');
  instance.status = 'Rejected';
  persistWorkflowState();
  return instance;
}

export function delegate(instanceId: string, _userId: string, toUserId: string): WorkflowInstanceRecord {
  const instance = instances.get(instanceId);
  if (!instance) throw new Error('Instance not found');
  instance.delegateToUserId = toUserId;
  persistWorkflowState();
  return instance;
}

export function escalate(instanceId: string): WorkflowInstanceRecord {
  const instance = instances.get(instanceId);
  if (!instance) throw new Error('Instance not found');
  instance.status = 'Escalated';
  const def = getDef(instance);
  const step = def.steps.find((s) => s.stepOrder === instance.currentStepOrder);
  if (step?.escalationRole) {
    instance.currentStepOrder = Math.min(instance.currentStepOrder + 1, def.steps.length);
    instance.status = 'Running';
  }
  outbox.push({ type: WORKFLOW_EVENTS.WORKFLOW_ESCALATED, payload: { instanceId } });
  persistWorkflowState();
  return instance;
}

export function listWorkflowInstances(tenantId: string): WorkflowInstanceRecord[] {
  return [...instances.values()].filter((i) => i.tenantId === tenantId);
}

export function getWorkflowInboxSummary(tenantId: string): {
  pending: number;
  approved: number;
  rejected: number;
  escalated: number;
  preview: WorkflowInstanceRecord[];
} {
  const all = listWorkflowInstances(tenantId);
  return {
    pending: all.filter((i) => i.status === 'Running').length,
    approved: all.filter((i) => i.status === 'Approved').length,
    rejected: all.filter((i) => i.status === 'Rejected').length,
    escalated: all.filter((i) => i.status === 'Escalated').length,
    preview: all.filter((i) => i.status === 'Running').slice(0, 12),
  };
}

export { workflowPersistenceEnabled } from './file-store.js';
