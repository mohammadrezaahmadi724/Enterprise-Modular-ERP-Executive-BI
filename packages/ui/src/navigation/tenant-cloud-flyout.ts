import {
  TENANT_MODULES,
  TENANT_SETTINGS,
  type TenantMenuItem,
  type TenantMenuModule,
} from './tenant-menu';
import type { TenantCloudRailItem } from './tenant-cloud-rail-menu';

export type TenantCloudFlyoutSpec =
  | { type: 'module'; moduleId: string; hrefPrefix?: string }
  | { type: 'settings'; hrefPrefix?: string };

export type TenantCloudFlyoutPanel = {
  railId: string;
  title: string;
  icon?: TenantMenuModule['icon'];
  items: TenantMenuItem[];
};

export function resolveRailFlyout(
  rail: Pick<TenantCloudRailItem, 'id' | 'label' | 'flyout'>,
): TenantCloudFlyoutPanel | null {
  if (!rail.flyout) return null;

  if (rail.flyout.type === 'settings') {
    let items = TENANT_SETTINGS;
    if (rail.flyout.hrefPrefix) {
      items = items.filter((i) => i.href.startsWith(rail.flyout.hrefPrefix!));
    }
    if (!items.length) return null;
    return { railId: rail.id, title: rail.label, items };
  }

  const mod = TENANT_MODULES.find((m) => m.id === rail.flyout.moduleId);
  if (!mod) return null;
  let items = mod.items;
  if (rail.flyout.hrefPrefix) {
    items = items.filter((i) => i.href.startsWith(rail.flyout.hrefPrefix!));
  }
  if (!items.length) return null;
  return { railId: rail.id, title: mod.label, icon: mod.icon, items };
}
