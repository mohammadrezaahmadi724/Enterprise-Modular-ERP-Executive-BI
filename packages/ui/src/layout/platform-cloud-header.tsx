'use client';

import Link from 'next/link';
import { Bell, Menu, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '../primitives/theme-toggle';
import { platformBreadcrumbForPath } from '../navigation/platform-cloud-rail-menu';
import { EnvironmentBadge } from './environment-badge';

export type PlatformCloudHeaderProps = {
  onMenuClick?: () => void;
};

export function PlatformCloudHeader({ onMenuClick }: PlatformCloudHeaderProps) {
  const pathname = usePathname() ?? '/';
  const crumbs = platformBreadcrumbForPath(pathname);

  return (
    <header className="pc-header">
      <button type="button" className="pc-btn-ghost lg:hidden" aria-label="منو" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </button>
      <HeaderCrumb className="pc-breadcrumb">
        {crumbs.map((c, i) => (
          <span key={`${c}-${i}`} className="flex items-center gap-1">
            {i > 0 ? <span aria-hidden>/</span> : null}
            {i === 0 ? (
              <Link href="/dashboard" className="hover:text-primary">
                {c}
              </Link>
            ) : (
              <strong>{c}</strong>
            )}
          </span>
        ))}
      </HeaderCrumb>
      <label className="pc-search hidden md:flex">
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
        <input type="search" placeholder="جست‌وجو در پلتفرم..." aria-label="جست‌وجو" />
      </label>
      <EnvironmentBadge />
      <ThemeToggle />
      <Link href="/tickets" className="pc-btn-ghost relative" aria-label="تیکت‌های باز">
        <Bell className="h-4 w-4" />
      </Link>
      <Link href="/logout" className="pc-btn-ghost hidden sm:inline-flex text-xs">
        خروج
      </Link>
    </header>
  );
}

function HeaderCrumb(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />;
}
