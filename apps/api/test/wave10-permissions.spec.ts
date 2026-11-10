import { describe, expect, it, vi } from 'vitest';
import { resolvePermissionsForUser } from '../src/modules/auth/permission-resolver.service';

describe('Wave 10 permission resolver', () => {
  it('returns empty when AUTH_PERMISSIONS_DB disabled', async () => {
    const prev = process.env.AUTH_PERMISSIONS_DB;
    process.env.AUTH_PERMISSIONS_DB = 'false';
    const perms = await resolvePermissionsForUser('00000000-0000-4000-8000-000000000001');
    expect(perms).toEqual([]);
    process.env.AUTH_PERMISSIONS_DB = prev;
  });

  it('module loads', () => {
    expect(typeof resolvePermissionsForUser).toBe('function');
    vi.restoreAllMocks();
  });
});
