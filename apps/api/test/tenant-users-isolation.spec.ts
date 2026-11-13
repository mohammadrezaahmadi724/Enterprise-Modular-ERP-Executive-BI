import { describe, expect, it, vi, beforeEach } from 'vitest';
import { ForbiddenException } from '@nestjs/common';
import { resolveTenantIdFromRequest } from '../src/modules/tenant-users/tenant-users.controller';

describe('tenant users isolation', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('denies cross-tenant header vs jwt tenant', () => {
    const req = {
      headers: { 'x-tenant-id': '22222222-2222-4222-8222-222222222222' },
      user: {
        sub: 'u1',
        tenantId: '11111111-1111-4111-8111-111111111111',
        isSuperAdmin: false,
        permissions: ['tenant.users.read'],
        email: 'a@demo.ir',
      },
    };
    expect(() => resolveTenantIdFromRequest(req as never)).toThrow(ForbiddenException);
  });

  it('allows matching tenant', () => {
    const tid = '11111111-1111-4111-8111-111111111111';
    const req = {
      headers: { 'x-tenant-id': tid },
      user: {
        sub: 'u1',
        tenantId: tid,
        isSuperAdmin: false,
        permissions: ['tenant.users.read'],
        email: 'a@demo.ir',
      },
    };
    expect(resolveTenantIdFromRequest(req as never)).toBe(tid);
  });
});
