import { describe, it, expect, beforeEach } from 'vitest';
import { BreakGlassRequiredError } from '@repo/domain';
import {
  approveBreakGlass,
  getBreakGlassAudit,
  getTenantNotifications,
  requestBreakGlass,
  resetBreakGlassStore,
} from '../src/modules/platform/break-glass.service';

describe('Break-Glass Two-Person — خلأ ۱۰ — بند ۴.۴', () => {
  const tenantId = '11111111-1111-4111-8111-111111111111';
  const adminA = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
  const adminB = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';

  beforeEach(() => resetBreakGlassStore());

  it('Super Admin A تنها نمی‌تواند تایید کند (self-approve)', () => {
    const req = requestBreakGlass(tenantId, adminA, 'audit');
    expect(() => approveBreakGlass(req.id, adminA, adminA)).toThrow(BreakGlassRequiredError);
  });

  it('تایید B باید session + audit + اطلاع tenant ایجاد کند', () => {
    const req = requestBreakGlass(tenantId, adminA, 'urgent support');
    const approved = approveBreakGlass(req.id, adminB, adminA);
    expect(approved.breakGlassSessionId).toBeTruthy();
    expect(approved.approverId).toBe(adminB);
    expect(getBreakGlassAudit().some((a) => a.action === 'APPROVE')).toBe(true);
    expect(getTenantNotifications().length).toBeGreaterThanOrEqual(2);
  });

  it('بدون تایید، session فعال نباید باشد', () => {
    requestBreakGlass(tenantId, adminA, 'pending');
    expect(getBreakGlassAudit().filter((a) => a.action === 'APPROVE')).toHaveLength(0);
  });
});
