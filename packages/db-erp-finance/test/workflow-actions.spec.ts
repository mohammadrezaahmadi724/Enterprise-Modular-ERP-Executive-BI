import { describe, expect, it, beforeEach } from 'vitest';
import { WORKFLOW_EVENTS } from '@repo/contracts';
import {
  Approve,
  Delegate,
  Escalate,
  Reject,
  StartWorkflow,
  registerWorkflowDefinition,
  resetWorkflowEngine,
  getWorkflowOutbox,
} from '../src/workflow/command-handlers.js';

const TENANT = '11111111-1111-4111-8111-111111111111';

beforeEach(() => {
  resetWorkflowEngine();
  registerWorkflowDefinition({
    id: 'def-1',
    tenantId: TENANT,
    code: 'generic',
    version: 1,
    steps: [
      { stepOrder: 1, nameFa: 'مدیر', approverRole: 'manager', timeoutHours: 24, escalationRole: 'director' },
      { stepOrder: 2, nameFa: 'مدیرعامل', approverRole: 'ceo', timeoutHours: 48 },
    ],
  });
});

describe('Workflow actions', () => {
  it('Approve چندمرحله‌ای تا Approved نهایی', () => {
    const wf = StartWorkflow({
      tenantId: TENANT,
      definitionCode: 'generic',
      version: 1,
      entityType: 'test',
      entityId: 'e1',
    });
    Approve(wf.id, 'u1', 'manager');
    expect(wf.currentStepOrder).toBe(2);
    Approve(wf.id, 'u2', 'ceo');
    expect(wf.status).toBe('Approved');
    expect(getWorkflowOutbox().some((e) => e.type === WORKFLOW_EVENTS.WORKFLOW_APPROVED)).toBe(true);
  });

  it('Reject و Delegate و Escalate', () => {
    const wf = StartWorkflow({
      tenantId: TENANT,
      definitionCode: 'generic',
      version: 1,
      entityType: 'test',
      entityId: 'e2',
    });
    Delegate(wf.id, 'u1', 'delegate-user');
    Reject(wf.id, 'u1', 'رد شد');
    expect(wf.status).toBe('Rejected');

    const wf2 = StartWorkflow({
      tenantId: TENANT,
      definitionCode: 'generic',
      version: 1,
      entityType: 'test',
      entityId: 'e3',
    });
    Escalate(wf2.id);
    expect(wf2.status).toBe('Running');
    expect(getWorkflowOutbox().some((e) => e.type === WORKFLOW_EVENTS.WORKFLOW_ESCALATED)).toBe(true);
  });
});
