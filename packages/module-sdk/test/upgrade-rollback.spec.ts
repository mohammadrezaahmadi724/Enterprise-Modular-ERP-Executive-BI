import { describe, it, expect } from 'vitest';
import { ModuleLifecycleRunner } from '../src/lifecycle/runner.js';
import { ModuleRegistry } from '../src/registry.js';
import type { ModuleManifest } from '../src/manifest.js';

describe('ModuleLifecycleRunner upgrade rollback — خلأ ۷ — بند ۳.۲', () => {
  const tenantId = '11111111-1111-4111-8111-111111111111';

  it('شکست onUpgrade باید از Snapshot بازگردانی کند', async () => {
    const registry = new ModuleRegistry();
    let restored = false;
    let version = '1.0.0';

    const manifest: ModuleManifest = {
      code: 'demo',
      version: '2.0.0',
      displayName: 'Demo',
      displayNameFa: 'دمو',
      dependsOn: [],
      events: { published: [], consumed: [] },
      permissions: [],
      ui: { routes: [], menuItems: [] },
      cacheInvalidationPatterns: [],
      alertRules: [],
      notificationTemplates: [],
      lifecycle: {
        onUpgrade: async () => {
          throw new Error('upgrade failed');
        },
      },
    };
    registry.register(manifest);
    registry.bindActiveModulesQuery(async () => [
      { tenantId, moduleCode: 'demo', version: '1.0.0', status: 'Active' },
    ]);

    const runner = new ModuleLifecycleRunner(
      {
        save: async () => 'snap-1',
        restore: async () => {
          restored = true;
        },
      },
      {
        upsertActive: async (_t, _c, v) => {
          version = v;
        },
        archive: async () => {},
        getVersion: async () => '1.0.0',
      },
      registry,
    );

    await expect(runner.upgradeModule(tenantId, 'demo', '2.0.0')).rejects.toThrow('upgrade failed');
    expect(restored).toBe(true);
    expect(version).toBe('1.0.0');
  });

  it('ارتقای موفق باید نسخه را به‌روز کند', async () => {
    const registry = new ModuleRegistry();
    let version = '1.0.0';
    registry.register({
      code: 'ok-mod',
      version: '2.0.0',
      displayName: 'OK',
      displayNameFa: 'باشد',
      dependsOn: [],
      events: { published: [], consumed: [] },
      permissions: [],
      ui: { routes: [], menuItems: [] },
      cacheInvalidationPatterns: [],
      alertRules: [],
      notificationTemplates: [],
      lifecycle: { onUpgrade: async () => {} },
    });
    registry.bindActiveModulesQuery(async () => []);

    const runner = new ModuleLifecycleRunner(
      {
        save: async () => 'snap',
        restore: async () => {},
      },
      {
        upsertActive: async (_t, _c, v) => {
          version = v;
        },
        archive: async () => {},
        getVersion: async () => '1.0.0',
      },
      registry,
    );

    await runner.upgradeModule(tenantId, 'ok-mod', '2.0.0');
    expect(version).toBe('2.0.0');
  });
});
