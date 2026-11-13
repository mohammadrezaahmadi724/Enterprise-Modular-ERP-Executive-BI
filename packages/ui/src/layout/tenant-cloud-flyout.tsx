'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { TenantCloudFlyoutPanel } from '../navigation/tenant-cloud-flyout';
import { cn } from '../lib/utils';

export type TenantCloudFlyoutProps = {
  panel: TenantCloudFlyoutPanel | null;
  onNavigate?: () => void;
};

export function TenantCloudFlyout({ panel, onNavigate }: TenantCloudFlyoutProps) {
  const pathname = usePathname() ?? '/';
  const [shown, setShown] = useState(panel);
  const [openVisual, setOpenVisual] = useState(false);

  useEffect(() => {
    if (panel) setShown(panel);
    if (!panel) {
      setOpenVisual(false);
      return;
    }
    const frame = window.requestAnimationFrame(() => setOpenVisual(true));
    return () => window.cancelAnimationFrame(frame);
  }, [panel]);

  if (!shown) return null;

  const Icon = shown.icon;
  const open = openVisual && Boolean(panel);

  return (
    <aside
      id="tenant-cloud-flyout"
      className={cn('tc-flyout', open && 'is-open')}
      aria-label={`زیرمنوی ${shown.title}`}
      aria-hidden={!open}
    >
      <div className="tc-flyout-head">
        {Icon ? <Icon className="h-4 w-4 text-primary" strokeWidth={2} /> : null}
        <span className="tc-flyout-title">{shown.title}</span>
      </div>
      <ul className="tc-flyout-list">
        {shown.items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={`${item.href}:${item.label}`}>
              <Link
                href={item.href}
                className={cn('tc-flyout-link', active && 'is-active')}
                onClick={onNavigate}
              >
                <span className="tc-flyout-link-label">{item.label}</span>
                {item.subtitle ? <span className="tc-flyout-link-sub">{item.subtitle}</span> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
