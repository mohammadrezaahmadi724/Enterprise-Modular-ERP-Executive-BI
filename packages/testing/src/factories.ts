import { randomUUID } from 'node:crypto';
import type { ModuleManifest } from '@repo/module-sdk';

export function createTenant(overrides: Partial<{ id: string; name: string; slug: string }> = {}) {
  const id = overrides.id ?? randomUUID();
  return {
    id,
    name: overrides.name ?? `Tenant ${id.slice(0, 8)}`,
    slug: overrides.slug ?? `tenant-${id.slice(0, 8)}`,
    region: 'ir',
    status: 'Trial' as const,
  };
}

export function createUser(opts: { tenantId?: string; isSuperAdmin?: boolean } = {}) {
  return {
    id: randomUUID(),
    tenantId: opts.tenantId,
    email: `user-${randomUUID().slice(0, 8)}@example.com`,
    passwordHash: 'hashed',
    fullName: 'کاربر تست',
    isSuperAdmin: opts.isSuperAdmin ?? false,
  };
}

export function createSubscription(tenantId: string) {
  return {
    id: randomUUID(),
    tenantId,
    planCode: 'starter',
    status: 'Active' as const,
  };
}

export function createModuleManifest(code: string): ModuleManifest {
  return {
    code,
    version: '1.0.0',
    displayName: code,
    displayNameFa: code,
    dependsOn: [],
    events: { published: [], consumed: [] },
    permissions: [],
    ui: { routes: [], menuItems: [] },
    cacheInvalidationPatterns: [],
    alertRules: [],
    notificationTemplates: [],
    lifecycle: {},
  };
}
