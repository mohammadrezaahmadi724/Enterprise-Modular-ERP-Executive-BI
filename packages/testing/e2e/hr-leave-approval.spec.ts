import { describe, it, expect, beforeEach } from 'vitest';
import { getLeaveOutbox, resetLeaveStore, submitLeaveRequest } from '@repo/db-erp-hr';
import { resetWorkflowEngine } from '@repo/db-erp-finance';
import { OPS_EVENTS } from '@repo/contracts';

describe('HR leave approval — Wave 3', () => {
  beforeEach(() => {
    resetLeaveStore();
    resetWorkflowEngine();
  });

  it('LeaveRequest باید پس از workflow Approved شود', () => {
    const row = submitLeaveRequest({
      tenantId: '11111111-1111-4111-8111-111111111111',
      employeeId: 'emp-1',
      approverRole: 'hr_manager',
    });
    expect(row.status).toBe('Approved');
    expect(getLeaveOutbox().some((e) => (e as { type: string }).type === OPS_EVENTS.LEAVE_APPROVED)).toBe(true);
  });
});
