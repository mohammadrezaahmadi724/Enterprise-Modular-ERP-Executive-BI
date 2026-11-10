'use client';

import Link from 'next/link';
import { Bell, LogOut, Search, Settings, User } from 'lucide-react';
import { Button } from '../components/button';
import { ThemeToggle } from '../primitives/theme-toggle';

export type TenantHeaderProps = {
  tenantName?: string;
  unreadAlerts?: number;
  children?: React.ReactNode;
};

export function TenantHeader({ tenantName = 'شرکت من', unreadAlerts = 0, children }: TenantHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <motion className="flex-1">
        <h1 className="text-lg font-semibold">{tenantName}</h1>
      </motion>
      {children}
      <Button variant="outline" size="sm" type="button" className="hidden gap-2 md:inline-flex">
        <Search className="h-4 w-4" />
        <span className="text-xs text-muted-foreground">جستجو (Ctrl+K)</span>
      </Button>
      <Button variant="ghost" size="icon" asChild className="relative">
        <Link href="/alerts" aria-label="اعلان‌ها">
          <Bell className="h-5 w-5" />
          {unreadAlerts > 0 && (
            <span className="absolute -top-0.5 -left-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] text-destructive-foreground">
              {unreadAlerts > 99 ? '99+' : unreadAlerts}
            </span>
          )}
        </Link>
      </Button>
      <ThemeToggle />
      <details className="relative">
        <summary className="list-none cursor-pointer rounded-full border p-1">
          <User className="h-5 w-5 p-0.5" />
        </summary>
        <motion className="absolute left-0 mt-2 w-48 rounded-lg border bg-popover p-2 text-sm shadow-lg">
          <Link href="/settings/notifications" className="flex items-center gap-2 rounded px-2 py-1.5 hover:bg-accent">
            <Settings className="h-4 w-4" /> تنظیمات
          </Link>
          <Link href="/settings/subscription" className="flex items-center gap-2 rounded px-2 py-1.5 hover:bg-accent">
            <User className="h-4 w-4" /> اشتراک
          </Link>
          <Link href="/login" className="flex items-center gap-2 rounded px-2 py-1.5 text-destructive hover:bg-accent">
            <LogOut className="h-4 w-4" /> خروج
          </Link>
        </motion>
      </details>
    </header>
  );
}

function motion(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />;
}
