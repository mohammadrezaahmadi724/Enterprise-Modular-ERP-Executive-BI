import { describe, it, expect } from 'vitest';
import { ModuleRegistry } from '../src/registry.js';
import { CircularDependencyError } from '../src/errors/circular-dependency.error.js';
import type { ModuleManifest } from '../src/manifest.js';

const base = (code: string, dependsOn: string[]): ModuleManifest => ({
  code,
  version: '1.0.0',
  displayName: code,
  displayNameFa: code,
  dependsOn,
  events: { published: [], consumed: [] },
  permissions: [],
  ui: { routes: [], menuItems: [] },
  cacheInvalidationPatterns: [],
  alertRules: [],
  notificationTemplates: [],
  lifecycle: {},
});

describe('ModuleRegistry topoSort — خلأ ۶ — بند ۳.۲', () => {
  it('گراف بدون چرخه باید مرتب‌سازی توپولوژیک انجام شود', () => {
    const registry = new ModuleRegistry();
    registry.register(base('core', []));
    registry.register(base('inventory', ['core']));
    const sorted = registry.topoSort();
    expect(sorted.map((m) => m.code)).toEqual(['core', 'inventory']);
  });

  it('گراف چرخه‌ای باید Boot را با CircularDependencyError متوقف کند', () => {
    const registry = new ModuleRegistry();
    registry.register(base('A', ['B']));
    registry.register(base('B', ['A']));
    expect(() => registry.validate()).toThrow(CircularDependencyError);
    expect(() => registry.topoSort()).toThrow(CircularDependencyError);
  });
});
