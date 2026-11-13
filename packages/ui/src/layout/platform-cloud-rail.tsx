'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PLATFORM_CLOUD_RAIL } from '../navigation/platform-cloud-rail-menu';
import { cn } from '../lib/utils';

function isActive(pathname: string, href: string, activePrefix?: string): boolean {
  if (activePrefix) return pathname === activePrefix || pathname.startsWith(`${activePrefix}/`);
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PlatformCloudRail({
  menuOpen = false,
  onToggleMenu,
}: {
  menuOpen?: boolean;
  onToggleMenu?: () => void;
}) {
  const pathname = usePathname() ?? '/';

  return (
    <nav className="pc-rail" aria-label="ناوبری پلتفرم">
      <button type="button" className="pc-rail-logo" title={menuOpen ? 'بستن فهرست' : 'باز کردن فهرست'} aria-expanded={menuOpen} aria-controls="platform-cloud-flyout" onClick={onToggleMenu}>
        SA
      </button>
      {PLATFORM_CLOUD_RAIL.map((item) => {
        const active = isActive(pathname, item.href, item.activePrefix);
        const Icon = item.icon;
        return (
          <Link
            key={item.id}
            href={item.href}
            title={item.label}
            className={cn('pc-rail-link', active && 'is-active')}
            aria-current={active ? 'page' : undefined}
          >
            <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={active ? 2.25 : 1.75} />
          </Link>
        );
      })}
    </nav>
  );
}
