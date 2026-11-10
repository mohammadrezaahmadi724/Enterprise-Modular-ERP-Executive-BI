import { beforeEach, describe, expect, it } from 'vitest';
import { approveBreakGlass, getBreakGlassAudit, requestBreakGlass, resetBreakGlassStore } from '../../api/src/modules/platform/break-glass.service';

describe('Audit completeness — admin actions', () => {
  beforeEach(() => resetBreakGlassStore());

  it('هر Break-Glass action → audit', () => {
    const req = requestBreakGlass('t1', 'admin-a', 'support');
    approveBreakGlass(req.id, 'admin-b', 'admin-a');
    const actions = getBreakGlassAudit().map((a) => a.action);
    expect(actions).toContain('REQUEST');
    expect(actions).toContain('APPROVE');
  });
});
