'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity,
  BookOpen,
  CreditCard,
  Flag,
  LayoutDashboard,
  MessageSquare,
  Package,
  Shield,
  Ticket,
  Users,
} from 'lucide-react';
import { cn } from '../lib/utils';

const ITEMS = [
  { href: '/dashboard', label: 'داشبورد', icon: LayoutDashboard },
  { href: '/tenants', label: 'Tenantها', icon: Users },
  { href: '/subscriptions', label: 'اشتراک‌ها', icon: CreditCard },
  { href: '/plans', label: 'پلن و برآورد', icon: Package },
  { href: '/billing', label: 'پرداخت‌ها', icon: CreditCard },
  { href: '/tickets', label: 'رزرو جلسه / تیکت', icon: Ticket },
  { href: '/modules', label: 'قیمت ماژول‌ها', icon: Package },
  { href: '/notifications', label: 'Notification Hub', icon: MessageSquare },
  { href: '/audit', label: 'Audit', icon: Shield },
  { href: '/break-glass', label: 'Break-Glass', icon: Shield },
  { href: '/feature-flags', label: 'Feature Flags', icon: Flag },
  { href: '/health', label: 'سلامت سیستم', icon: Activity },
  { href: '/docs', label: 'مستندات', icon: BookOpen },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex h-screen w-64 flex-col border-l border-border bg-primary/5">
      <div className="flex h-16 items-center border-b border-border px-4">
        <span className="text-lg font-bold">مدیریت پلتفرم</span>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {ITEMS.map((item) => {
          const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm',
                active ? 'bg-primary/15 text-primary font-medium' : 'text-muted-foreground hover:bg-accent',
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
