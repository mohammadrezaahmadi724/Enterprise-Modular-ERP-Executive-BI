import { describe, expect, it } from 'vitest';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { RbacGuard } from '../src/guards/rbac.guard';
import { PERMISSION_KEY } from '../src/decorators/access.decorator';

describe('Wave 9 RBAC guard', () => {
  const reflector = new Reflector();
  const guard = new RbacGuard(reflector);

  it('allows wildcard permissions', () => {
    const ctx = new ExecutionContextHost([
      { user: { permissions: ['*'], isSuperAdmin: false, sub: 'u1', tenantId: 't1', email: 'a@b.ir' } },
      {},
      {},
      { type: 'http' },
    ]);
    reflector.getAllAndOverride = () => 'finance.write';
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('denies missing permission', () => {
    const ctx = new ExecutionContextHost([
      { user: { permissions: ['crm.read'], isSuperAdmin: false, sub: 'u1', tenantId: 't1', email: 'a@b.ir' } },
      {},
      {},
      { type: 'http' },
    ]);
    reflector.getAllAndOverride = (key: string) => (key === PERMISSION_KEY ? 'finance.write' : false);
    expect(() => guard.canActivate(ctx)).toThrow();
  });
});
