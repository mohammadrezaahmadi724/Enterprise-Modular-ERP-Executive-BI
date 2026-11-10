import { globalModuleRegistry, type ModuleRegistry } from '../registry.js';

export type SnapshotStore = {
  save: (tenantId: string, moduleCode: string, label: string) => Promise<string>;
  restore: (tenantId: string, moduleCode: string, snapshotId: string) => Promise<void>;
};

export type TenantModuleStore = {
  upsertActive: (tenantId: string, moduleCode: string, version: string) => Promise<void>;
  archive: (tenantId: string, moduleCode: string) => Promise<void>;
  getVersion: (tenantId: string, moduleCode: string) => Promise<string | null>;
};

export class ModuleLifecycleRunner {
  constructor(
    private readonly snapshots: SnapshotStore,
    private readonly tenantModules: TenantModuleStore,
    private readonly registry: ModuleRegistry = globalModuleRegistry,
  ) {}

  async activateModule(tenantId: string, moduleCode: string): Promise<void> {
    const manifest = this.registry.getManifest(moduleCode);
    if (!manifest) throw new Error(`Unknown module: ${moduleCode}`);

    for (const dep of manifest.dependsOn) {
      const modules = await this.registry.getActiveModules(tenantId);
      const depActive = modules.some((m) => m.moduleCode === dep && m.status === 'Active');
      if (!depActive) {
        throw new Error(`Dependency not active: ${dep}`);
      }
    }

    await this.snapshots.save(tenantId, moduleCode, 'pre-activate');
    if (manifest.lifecycle.onActivate) {
      await manifest.lifecycle.onActivate(tenantId);
    }
    await this.tenantModules.upsertActive(tenantId, moduleCode, manifest.version);
  }

  async upgradeModule(tenantId: string, moduleCode: string, toVersion: string): Promise<void> {
    const manifest = this.registry.getManifest(moduleCode);
    if (!manifest) throw new Error(`Unknown module: ${moduleCode}`);

    const fromVersion = (await this.tenantModules.getVersion(tenantId, moduleCode)) ?? '0.0.0';
    const snapshotId = await this.snapshots.save(tenantId, moduleCode, 'pre-upgrade');
    try {
      if (manifest.lifecycle.onUpgrade) {
        await manifest.lifecycle.onUpgrade(tenantId, fromVersion, toVersion);
      }
      await this.tenantModules.upsertActive(tenantId, moduleCode, toVersion);
    } catch (err) {
      await this.snapshots.restore(tenantId, moduleCode, snapshotId);
      throw err;
    }
  }

  async deactivateModule(tenantId: string, moduleCode: string): Promise<void> {
    const manifest = this.registry.getManifest(moduleCode);
    if (manifest?.lifecycle.onDeactivate) {
      await manifest.lifecycle.onDeactivate(tenantId);
    }
    await this.tenantModules.archive(tenantId, moduleCode);
  }
}
