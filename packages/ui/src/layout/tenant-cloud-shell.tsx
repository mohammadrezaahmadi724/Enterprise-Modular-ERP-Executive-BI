'use client';

import { useEffect, useMemo, useState } from 'react';
import { cn } from '../lib/utils';
import { usePathname } from 'next/navigation';
import { TenantCloudRail } from './tenant-cloud-rail';
import { TenantCloudFlyout } from './tenant-cloud-flyout';
import { TenantCloudHeader } from './tenant-cloud-header';
import { TenantSidebar } from './tenant-sidebar';
import { Button } from '../components/button';
import { X } from 'lucide-react';
import { TENANT_CLOUD_RAIL } from '../navigation/tenant-cloud-rail-menu';
import { resolveRailFlyout } from '../navigation/tenant-cloud-flyout';

export type TenantCloudShellProps = {
  children: React.ReactNode;
  showDemoBanner?: boolean;
  promoText?: string;
  hideMenuHrefs?: string[];
  hiddenRailIds?: string[];
};

export function TenantCloudShell({
  children,
  showDemoBanner = true,
  promoText = 'می‌خواهم ERP خودم رو بسازم',
  hideMenuHrefs = [],
  hiddenRailIds = [],
}: TenantCloudShellProps) {
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [mobileDrawerMounted, setMobileDrawerMounted] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [openFlyoutRailId, setOpenFlyoutRailId] = useState<string | null>(null);
  const pathname = usePathname() ?? '/';

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

  useEffect(() => {
    const match = TENANT_CLOUD_RAIL.find((r) => {
      if (!r.flyout) return false;
      if (r.id === 'finance' && (pathname.startsWith('/finance') || pathname.startsWith('/treasury'))) return true;
      if (r.id === 'hr' && pathname.startsWith('/hr')) return true;
      return Boolean(r.activePrefix && (pathname === r.activePrefix || pathname.startsWith(`${r.activePrefix}/`)));
    });
    if (match) setOpenFlyoutRailId(match.id);
  }, [pathname]);

  const flyoutPanel = useMemo(() => {
    if (!openFlyoutRailId) return null;
    const rail = TENANT_CLOUD_RAIL.find((r) => r.id === openFlyoutRailId);
    if (!rail) return null;
    return resolveRailFlyout(rail);
  }, [openFlyoutRailId]);

  const toggleFlyout = (railId: string) => {
    setOpenFlyoutRailId((prev) => (prev === railId ? null : railId));
  };

  return (
    <div className="tc-shell" dir="rtl">
      {promoText ? (
        <div className="tc-promo">
          <button type="button" className="underline-offset-2 hover:underline">
            {promoText}
          </button>
        </div>
      ) : null}
      {showDemoBanner ? (
        <div className="tc-demo-banner" role="status">
          شما در محیط <strong>آزمایشی</strong> هستید — داده‌ها صرفاً برای تست فرآیندهاست.
        </div>
      ) : null}
      <div className="tc-body">
        <TenantCloudRail
          openFlyoutRailId={openFlyoutRailId}
          onFlyoutToggle={toggleFlyout}
          hiddenRailIds={hiddenRailIds}
        />
        <TenantCloudFlyout
          panel={flyoutPanel}
          onNavigate={() => setOpenFlyoutRailId(null)}
        />
        <div className="tc-main">
          <TenantCloudHeader onMenuClick={() => setMobileDrawer(true)} />
          <div className="tc-content">{children}</div>
        </div>
      </div>
      {mobileDrawerMounted ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className={cn('tc-drawer-backdrop absolute inset-0 bg-black/40', mobileDrawerOpen && 'is-open')}
            aria-label="بستن منو"
            onClick={() => setMobileDrawer(false)}
          />
          <div className={cn('tc-mobile-drawer absolute inset-y-0 right-0 w-[min(100%,18rem)] bg-card shadow-xl overflow-y-auto', mobileDrawerOpen && 'is-open')}>
            <div className="flex items-center justify-between border-b p-3">
              <span className="text-sm font-semibold">منوی ماژول‌ها</span>
              <Button variant="ghost" size="icon" type="button" onClick={() => setMobileDrawer(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <TenantSidebar hideMenuHrefs={hideMenuHrefs} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
