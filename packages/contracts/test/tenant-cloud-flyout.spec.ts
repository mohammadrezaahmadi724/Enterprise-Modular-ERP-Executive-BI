import { describe, expect, it } from 'vitest';
import { TENANT_CLOUD_RAIL } from '../../ui/src/navigation/tenant-cloud-rail-menu';
import { resolveRailFlyout } from '../../ui/src/navigation/tenant-cloud-flyout';

describe('tenant cloud rail flyout', () => {
  it('maps procurement rail to procurement submenu items', () => {
    const rail = TENANT_CLOUD_RAIL.find((r) => r.id === 'procurement')!;
    const panel = resolveRailFlyout(rail);
    expect(panel?.items.every((i) => i.href.startsWith('/procurement'))).toBe(true);
    expect(panel?.items.length).toBeGreaterThan(2);
  });

  it('home and subscription have no flyout panel', () => {
    for (const id of ['home', 'subscription']) {
      const rail = TENANT_CLOUD_RAIL.find((r) => r.id === id)!;
      expect(resolveRailFlyout(rail)).toBeNull();
    }
  });
});
