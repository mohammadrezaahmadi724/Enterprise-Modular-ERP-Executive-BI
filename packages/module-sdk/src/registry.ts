import type { ModuleManifest } from './manifest.js';
import { CircularDependencyError } from './errors/circular-dependency.error.js';

export type TenantModuleRow = {
  tenantId: string;
  moduleCode: string;
  version: string;
  status: 'Active' | 'Inactive' | 'Pending';
};

export class ModuleRegistry {
  private readonly manifests = new Map<string, ModuleManifest>();
  private getActiveModulesFn?: (tenantId: string) => Promise<TenantModuleRow[]>;

  register(manifest: ModuleManifest): void {
    this.manifests.set(manifest.code, manifest);
  }

  /** تزریق منبع داده tenant_modules از لایه infrastructure */
  bindActiveModulesQuery(fn: (tenantId: string) => Promise<TenantModuleRow[]>): void {
    this.getActiveModulesFn = fn;
  }

  validate(): void {
    for (const code of this.manifests.keys()) {
      this.detectCycle(code);
    }
  }

  topoSort(): ModuleManifest[] {
    this.validate();
    const sorted: ModuleManifest[] = [];
    const visited = new Set<string>();
    const visiting = new Set<string>();

    const visit = (code: string) => {
      if (visited.has(code)) return;
      if (visiting.has(code)) {
        throw new CircularDependencyError([...visiting, code]);
      }
      visiting.add(code);
      const manifest = this.manifests.get(code);
      if (!manifest) return;
      for (const dep of manifest.dependsOn) {
        visit(dep);
      }
      visiting.delete(code);
      visited.add(code);
      sorted.push(manifest);
    };

    for (const code of this.manifests.keys()) {
      visit(code);
    }
    return sorted;
  }

  getActiveModules(tenantId: string): Promise<TenantModuleRow[]> {
    if (!this.getActiveModulesFn) {
      return Promise.resolve([]);
    }
    return this.getActiveModulesFn(tenantId);
  }

  getManifest(code: string): ModuleManifest | undefined {
    return this.manifests.get(code);
  }

  private detectCycle(start: string): void {
    const seen = new Set<string>();

    const dfs = (code: string, path: string[]): void => {
      if (path.includes(code)) {
        const cycleStart = path.indexOf(code);
        throw new CircularDependencyError([...path.slice(cycleStart), code]);
      }
      if (seen.has(code)) return;
      const manifest = this.manifests.get(code);
      if (!manifest) return;
      for (const dep of manifest.dependsOn) {
        dfs(dep, [...path, code]);
      }
      seen.add(code);
    };

    dfs(start, []);
  }
}

export const globalModuleRegistry = new ModuleRegistry();
