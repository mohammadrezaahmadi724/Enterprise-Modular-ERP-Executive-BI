'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlatformCloudRail } from './platform-cloud-rail';
import { PlatformCloudHeader } from './platform-cloud-header';
import { AdminSidebar } from './admin-sidebar';
import { Button } from '../components/button';
import { X } from 'lucide-react';
import { PLATFORM_CLOUD_RAIL } from '../navigation/platform-cloud-rail-menu';
import { cn } from '../lib/utils';

export type PlatformCloudShellProps = {
  children: React.ReactNode;
};

export function PlatformCloudShell({ children }: PlatformCloudShellProps) {
  const pathname = usePathname() ?? '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisual, setMenuVisual] = useState(false);
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [mobileDrawerMounted, setMobileDrawerMounted] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      setMenuVisual(false);
      return;
    }
    const frame = window.requestAnimationFrame(() => setMenuVisual(true));
    return () => window.cancelAnimationFrame(frame);
  }, [menuOpen]);

  useEffect(() => {
    if (mobileDrawer) {
      setMobileDrawerMounted(true);
      const frame = window.requestAnimationFrame(() => setMobileDrawerOpen(true));
      return () => window.cancelAnimationFrame(frame);
    }
    setMobileDrawerOpen(false);
    const timer = window.setTimeout(() => setMobileDrawerMounted(false), 320);
    return () => window.clearTimeout(timer);
  }, [mobileDrawer]);

  return (
    <div className="pc-shell" dir="rtl">
      <div className="pc-platform-banner" role="status">
        <strong>Super Admin</strong> — Plane مدیریت SaaS · داده in-tenant فقط از Break-Glass
      </div>
      <div className="pc-body">
        <PlatformCloudRail menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} />
        <aside id="platform-cloud-flyout" className={cn('pc-flyout', menuOpen && menuVisual && 'is-open')} aria-label="فهرست پلتفرم" aria-hidden={!menuOpen}>
          <div className="pc-flyout-head">بخش‌های سوپرادمین</div>
          <ul className="pc-flyout-list">
            {PLATFORM_CLOUD_RAIL.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.activePrefix ?? item.href}/`) || pathname === item.activePrefix;
              return (
                <li key={item.id}>
                  <Link href={item.href} className={cn('pc-flyout-link', active && 'is-active')} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
        <div className="pc-main">
          <PlatformCloudHeader onMenuClick={() => setMobileDrawer(true)} />
          <div className="pc-content">{children}</div>
        </div>
      </div>
      {mobileDrawerMounted ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className={cn('pc-drawer-backdrop absolute inset-0 bg-black/40', mobileDrawerOpen && 'is-open')}
            aria-label="بستن منو"
            onClick={() => setMobileDrawer(false)}
          />
          <div className={cn('pc-mobile-drawer absolute inset-y-0 right-0 w-[min(100%,18rem)] bg-card shadow-xl overflow-y-auto', mobileDrawerOpen && 'is-open')}>
            <div className="flex items-center justify-between border-b p-3">
              <span className="text-sm font-semibold">منوی پلتفرم</span>
              <Button variant="ghost" size="icon" type="button" onClick={() => setMobileDrawer(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <AdminSidebar />
          </div>
        </div>
      ) : null}
    </div>
  );
}
