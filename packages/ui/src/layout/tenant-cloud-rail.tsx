'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { TENANT_CLOUD_RAIL } from '../navigation/tenant-cloud-rail-menu';
import { resolveRailFlyout } from '../navigation/tenant-cloud-flyout';
import { cn } from '../lib/utils';

function isActive(pathname: string, href: string, activePrefix?: string, railId?: string): boolean {
  if (railId === 'wms' && (pathname.startsWith('/wms') || pathname.startsWith('/inventory'))) return true;
  if (railId === 'finance' && (pathname.startsWith('/finance') || pathname.startsWith('/treasury'))) return true;
  if (railId === 'hr' && pathname.startsWith('/hr')) return true;
  if (
    railId === 'ai' &&
    (pathname.startsWith('/ai') || pathname.startsWith('/messaging') || pathname.startsWith('/voip'))
  ) {
    return true;
  }
  if (railId === 'manufacturing' && (pathname.startsWith('/manufacturing') || pathname.startsWith('/qc'))) {
    return true;
  }
  if (railId === 'users' && (pathname.startsWith('/admin/users') || pathname.startsWith('/settings/users'))) {
    return true;
  }
  if (activePrefix) return pathname === activePrefix || pathname.startsWith(`${activePrefix}/`);
  return pathname === href || pathname.startsWith(`${href}/`);
}

export type TenantCloudRailProps = {
  openFlyoutRailId: string | null;
  onFlyoutToggle: (railId: string) => void;
  hiddenRailIds?: string[];
};

export function TenantCloudRail({
  openFlyoutRailId,
  onFlyoutToggle,
  hiddenRailIds = [],
}: TenantCloudRailProps) {
  const pathname = usePathname() ?? '/';
  const router = useRouter();
  const hidden = new Set(hiddenRailIds);

  return (
    <nav className="tc-rail" aria-label="ناوبری اصلی">
      <div className="tc-rail-logo" aria-hidden>
        SS
      </div>
      {TENANT_CLOUD_RAIL.filter((item) => !hidden.has(item.id)).map((item) => {
        const active = isActive(pathname, item.href, item.activePrefix, item.id);
        const Icon = item.icon;
        const flyout = resolveRailFlyout(item);
        const flyoutOpen = openFlyoutRailId === item.id;

        if (!flyout) {
          return (
            <Link
              key={item.id}
              href={item.href}
              title={item.label}
              className={cn('tc-rail-link', active && 'is-active')}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={active ? 2.25 : 1.75} />
            </Link>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            title={item.label}
            className={cn('tc-rail-link', (active || flyoutOpen) && 'is-active')}
            aria-expanded={flyoutOpen}
            aria-controls="tenant-cloud-flyout"
            onClick={() => {
              if (flyoutOpen) {
                onFlyoutToggle(item.id);
                return;
              }
              onFlyoutToggle(item.id);
              if (!active) router.push(item.href);
            }}
          >
            <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={active || flyoutOpen ? 2.25 : 1.75} />
          </button>
        );
      })}
    </nav>
  );
}
