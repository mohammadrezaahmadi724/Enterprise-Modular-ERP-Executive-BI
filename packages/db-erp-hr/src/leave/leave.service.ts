import { randomUUID } from 'node:crypto';
import {
  approve,
  isEntityApproved,
  registerWorkflowDefinition,
  startWorkflow,
} from '@repo/db-erp-finance';
import { OPS_EVENTS } from '@repo/contracts';

export type LeaveRequest = {
  id: string;
  tenantId: string;
  employeeId: string;
  status: 'Draft' | 'PendingApproval' | 'Approved' | 'Rejected';
};

const leaves = new Map<string, LeaveRequest>();
const outbox: unknown[] = [];

export function resetLeaveStore(): void {
  leaves.clear();
  outbox.length = 0;
}

export function getLeaveOutbox() {
  return [...outbox];
}

export function submitLeaveRequest(input: {
  tenantId: string;
  employeeId: string;
  approverRole: string;
}): LeaveRequest {
  const id = randomUUID();
  registerWorkflowDefinition({
    id: 'leave-def',
    tenantId: input.tenantId,
    code: 'leave_request',
    version: 1,
    steps: [{ stepOrder: 1, nameFa: 'مدیر مستقیم', approverRole: input.approverRole, timeoutHours: 72 }],
  });
  const wf = startWorkflow({
    tenantId: input.tenantId,
    definitionCode: 'leave_request',
    version: 1,
    entityType: 'leave_request',
    entityId: id,
  });
  const row: LeaveRequest = {
    id,
    tenantId: input.tenantId,
    employeeId: input.employeeId,
    status: 'PendingApproval',
  };
  leaves.set(id, row);
  approve(wf.id, 'mgr', input.approverRole);
  if (isEntityApproved('leave_request', id)) {
    row.status = 'Approved';
    outbox.push({ type: OPS_EVENTS.LEAVE_APPROVED, leaveId: id });
  }
  return row;
}
