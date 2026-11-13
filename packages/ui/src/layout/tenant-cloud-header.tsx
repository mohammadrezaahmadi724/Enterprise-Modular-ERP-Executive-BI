'use client';

import Link from 'next/link';
import { Bell, Calendar, CheckSquare, Menu, Plus, Search } from 'lucide-react';
import { ThemeToggle } from '../primitives/theme-toggle';
import { breadcrumbLabelForPath } from '../navigation/tenant-cloud-rail-menu';
import { usePathname } from 'next/navigation';

export type TenantCloudHeaderProps = {
  onMenuClick?: () => void;
  unreadAlerts?: number;
};

export function TenantCloudHeader({ onMenuClick, unreadAlerts = 0 }: TenantCloudHeaderProps) {
  const pathname = usePathname() ?? '/';
  const crumbs = breadcrumbLabelForPath(pathname);

  return (
    <header className="tc-header">
      <button type="button" className="tc-btn-ghost lg:hidden" aria-label="منو" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </button>
      <div className="tc-breadcrumb">
        {crumbs.map((c, i) => (
          <span key={c} className="flex items-center gap-1">
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
      </div>
      <label className="tc-search hidden md:flex">
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
        <input type="search" placeholder="جست‌وجو..." aria-label="جست‌وجو" />
      </label>
        <button type="button" className="tc-btn-ghost hidden sm:inline-flex text-xs gap-1">
          راهنما
        </button>
        <Link href="/logout" className="tc-btn-ghost hidden sm:inline-flex text-xs">
          خروج
        </Link>
      <ThemeToggle />
      <div className="tc-header-actions">
        <button type="button" className="tc-btn-ghost" aria-label="کارهای من">
          <CheckSquare className="h-4 w-4" />
        </button>
        <button type="button" className="tc-btn-ghost" aria-label="تقویم سریع">
          <Calendar className="h-4 w-4" />
        </button>
        <Link href="/alerts" className="tc-btn-ghost relative" aria-label="اعلان‌ها">
          <Bell className="h-4 w-4" />
          {unreadAlerts > 0 ? (
            <span className="absolute -top-0.5 -left-0.5 h-2 w-2 rounded-full bg-destructive" />
          ) : null}
        </Link>
        <Link href="/sales/orders?new=1" className="tc-btn-quick">
          <Plus className="h-4 w-4" />
          افزودن سریع
        </Link>
      </div>
    </header>
  );
}
