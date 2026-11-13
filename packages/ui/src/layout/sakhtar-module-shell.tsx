'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export type SakhtarModuleTab = { id: string; label: string; href: string };

export type SakhtarModuleTheme =
  | 'inventory'
  | 'sales'
  | 'finance'
  | 'procurement'
  | 'hr'
  | 'projects'
  | 'bi'
  | 'manufacturing'
  | 'distribution'
  | 'retail'
  | 'ai'
  | 'qc'
  | 'workflows';

export type SakhtarModuleShellProps = {
  children: React.ReactNode;
  theme: SakhtarModuleTheme;
  title: string;
  subtitle?: string;
  formula?: string;
  tabs: SakhtarModuleTab[];
  cta?: { href: string; label: string };
  demoNote?: string;
  toolbar?: React.ReactNode;
  mascot?: { href: string; label: string; icon: LucideIcon };
  icon: LucideIcon;
};

function resolveActiveTab(pathname: string, tabs: SakhtarModuleTab[]): string {
  const overviewHref = tabs.find((t) => t.id === 'overview')?.href;
  const sorted = [...tabs].sort((a, b) => b.href.length - a.href.length);
  const hit = sorted.find(
    (t) =>
      pathname === t.href ||
      (overviewHref != null && t.href !== overviewHref && pathname.startsWith(t.href)),
  );
  return hit?.id ?? tabs.find((t) => t.id === 'overview')?.id ?? tabs[0]?.id ?? 'overview';
}

export function SakhtarModuleShell({
  children,
  theme,
  title,
  subtitle,
  formula,
  tabs,
  cta,
  demoNote,
  toolbar,
  mascot,
  icon: Icon,
}: SakhtarModuleShellProps) {
  const pathname = usePathname() ?? '/';
  const activeTab = resolveActiveTab(pathname, tabs);
  const MascotIcon = mascot?.icon;

  return (
    <div className={cn('smh-root', `smh-theme-${theme}`)} dir="rtl">
      {formula ? (
        <p className="smh-formula" dir="rtl">
          {formula}
        </p>
      ) : null}
      {demoNote ? <p className="smh-demo-note">{demoNote}</p> : null}

      <header className="smh-head">
        <div className="smh-title-row">
          <span className="smh-icon" aria-hidden>
            <Icon className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <h1 className="smh-title">{title}</h1>
            {subtitle ? <p className="smh-subtitle">{subtitle}</p> : null}
          </div>
        </div>
        {cta ? (
          <Link href={cta.href} className="smh-cta">
            {cta.label}
          </Link>
        ) : null}
      </header>

      {toolbar ? <div className="smh-toolbar">{toolbar}</div> : null}

      <nav className="smh-tabs" aria-label={`زیرمنوی ${title}`}>
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={cn('smh-tab', activeTab === tab.id && 'is-active')}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <div className="smh-body">{children}</div>

      {mascot && MascotIcon ? (
        <Link href={mascot.href} className="smh-mascot" title={mascot.label} aria-label={mascot.label}>
          <MascotIcon className="h-5 w-5" />
        </Link>
      ) : null}
    </div>
  );
}

export type SakhtarModuleAssistantProps = {
  title: string;
  description: string;
  upsell?: string;
  ctaLabel?: string;
  ctaHref?: string;
  active?: boolean;
};

export function SakhtarModuleAssistant({
  title,
  description,
  upsell,
  ctaLabel = 'می‌خواهم ERP خودم را بسازم',
  ctaHref = '/settings/subscription',
  active = false,
}: SakhtarModuleAssistantProps) {
  return (
    <div className="smh-ai-card">
      <div className="flex items-start gap-3 flex-1 min-w-[16rem]">
        <span className="smh-ai-avatar" aria-hidden>
          🤖
        </span>
        <div>
          <p className="font-semibold text-sm flex items-center gap-2">
            {title}
            <span className="text-[10px] font-normal px-2 py-0.5 rounded-full border bg-background/80">
              {active ? 'فعال' : 'غیرفعال'}
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xl leading-relaxed">{description}</p>
        </div>
      </div>
      {!active && upsell ? (
        <motion className="smh-ai-upsell">
          <p>{upsell}</p>
          {ctaHref ? (
            <Link href={ctaHref} className="smh-cta inline-flex mt-2 text-xs">
              {ctaLabel}
            </Link>
          ) : null}
        </motion>
      ) : null}
    </div>
  );
}

export function SakhtarModuleKpi({
  label,
  value,
  sub,
  variant = 'default',
}: {
  label: string;
  value: string;
  sub?: string;
  variant?: 'default' | 'primary';
}) {
  return (
    <div className={cn('smh-kpi', variant === 'primary' && 'smh-kpi-primary')}>
      <p className="smh-kpi-label">{label}</p>
      <p className="smh-kpi-value">{value}</p>
      {sub ? <p className="smh-kpi-sub">{sub}</p> : null}
      {variant === 'primary' ? (
        <div className="smh-kpi-bar">
          <span />
        </div>
      ) : null}
    </div>
  );
}

function motion(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />;
}
