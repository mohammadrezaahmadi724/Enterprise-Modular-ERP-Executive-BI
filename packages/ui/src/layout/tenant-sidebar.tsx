'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  LayoutDashboard,
  Settings,
} from 'lucide-react';
import { TENANT_HOME, TENANT_MODULES, TENANT_SETTINGS } from '../navigation/tenant-menu';
import { cn } from '../lib/utils';

export function TenantSidebar({
  activeModules = [],
  hideMenuHrefs = [],
}: {
  activeModules?: string[];
  hideMenuHrefs?: string[];
}) {
  const pathname = usePathname();
  const hidden = useMemo(() => new Set(hideMenuHrefs), [hideMenuHrefs]);
  const modules = useMemo(
    () =>
      TENANT_MODULES.filter(
        (m) => activeModules.length === 0 || !m.moduleCode || activeModules.includes(m.moduleCode),
      ).map((mod) => ({
        ...mod,
        items: mod.items.filter((item) => !hidden.has(item.href)),
      })),
    [activeModules, hidden],
  );

  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const next: Record<string, boolean> = {};
    for (const mod of modules) {
      const hit = mod.items.some((i) => pathname === i.href || pathname?.startsWith(`${i.href}/`));
      const prefixHit = mod.items.some((i) => {
        const seg = i.href.split('/').filter(Boolean)[0];
        return seg && pathname?.startsWith(`/${seg}`);
      });
      if (hit || prefixHit) next[mod.id] = true;
    }
    setOpenIds((prev) => ({ ...prev, ...next }));
  }, [pathname, modules]);

  const toggle = (id: string) => setOpenIds((p) => ({ ...p, [id]: !p[id] }));

  return (
    <aside className="flex h-screen w-72 flex-col border-l border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-4">
        <Link href="/dashboard" className="flex items-center gap-2 text-lg font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">E</span>
          <span>ERP ابری</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-4 overflow-y-auto px-3 py-4">
        <Box>
          <p className="mb-2 px-2 text-xs font-semibold text-muted-foreground">اصلی</p>
          <Link
            href={TENANT_HOME.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              pathname === '/dashboard' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent',
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            {TENANT_HOME.label}
          </Link>
        </Box>

        <Box>
          <p className="mb-2 px-2 text-xs font-semibold text-muted-foreground">ماژول‌ها</p>
          <ul className="space-y-1">
            {modules.map((mod) => {
              const Icon = mod.icon;
              const open = openIds[mod.id] ?? false;
              const moduleActive = mod.items.some(
                (i) => pathname === i.href || pathname?.startsWith(`${i.href}/`),
              );
              return (
                <li key={mod.id}>
                  <button
                    type="button"
                    onClick={() => toggle(mod.id)}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                      moduleActive ? 'bg-muted/80 text-foreground' : 'text-foreground hover:bg-accent',
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-primary" />
                    <span className="flex-1 text-right">{mod.label}</span>
                    <ChevronDown className={cn('h-4 w-4 transition', open && 'rotate-180')} />
                  </button>
                  {open && (
                    <ul className="mr-2 mt-1 space-y-0.5 border-r border-border/80 pr-2">
                      {mod.items.map((item) => {
                        const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className={cn(
                                'block rounded-lg px-3 py-2 text-sm transition-colors',
                                active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                              )}
                            >
                              <span className="font-medium">{item.label}</span>
                              {item.subtitle && (
                                <span className="mt-0.5 block text-[11px] text-muted-foreground">{item.subtitle}</span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </Box>

        <Box>
          <p className="mb-2 px-2 text-xs font-semibold text-muted-foreground">تنظیمات</p>
          <ul className="space-y-1">
            {TENANT_SETTINGS.map((item) => {
              const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              const Icon =
                item.href.includes('alert') ? Bell : item.href.includes('settings') ? Settings : LayoutDashboard;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium',
                      active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent',
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1">{item.label}</span>
                    {active && <ChevronLeft className="h-3 w-3 opacity-70" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Box>
      </nav>
      <Box className="border-t border-border p-3 text-center text-xs text-muted-foreground">نسخه 6.1</Box>
    </aside>
  );
}

function Box(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />;
}
