import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  BookOpen,
  CreditCard,
  FileText,
  Flag,
  Home,
  LayoutDashboard,
  Package,
  Shield,
  Bell,
  KeyRound,
  Ticket,
  UserCog,
  Users,
} from 'lucide-react';

export type PlatformCloudRailItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  activePrefix?: string;
};

/** ریل سوپرادمین — هم‌تراز tenant cloud rail */
export const PLATFORM_CLOUD_RAIL: PlatformCloudRailItem[] = [
  { id: 'home', label: 'خانه', href: '/dashboard', icon: Home, activePrefix: '/dashboard' },
  { id: 'tenants', label: 'مستأجران', href: '/tenants', icon: Users, activePrefix: '/tenants' },
  { id: 'users', label: 'کاربران پلتفرم', href: '/users', icon: UserCog, activePrefix: '/users' },
  { id: 'subscriptions', label: 'اشتراک‌ها', href: '/subscriptions', icon: CreditCard, activePrefix: '/subscriptions' },
  { id: 'plans', label: 'پلن‌ها', href: '/plans', icon: Package, activePrefix: '/plans' },
  { id: 'cloud', label: 'تعرفه اشتراک', href: '/cloud-pricing', icon: LayoutDashboard, activePrefix: '/cloud-pricing' },
  { id: 'site', label: 'محتوای سایت', href: '/site', icon: FileText, activePrefix: '/site' },
  { id: 'tickets', label: 'رزرو جلسه', href: '/tickets', icon: Ticket, activePrefix: '/tickets' },
  { id: 'billing', label: 'فاکتور SaaS', href: '/billing', icon: CreditCard, activePrefix: '/billing' },
  { id: 'modules', label: 'کاتالوگ ماژول', href: '/modules', icon: Package, activePrefix: '/modules' },
  { id: 'audit', label: 'ممیزی', href: '/audit', icon: Shield, activePrefix: '/audit' },
  { id: 'break-glass', label: 'Break-Glass', href: '/break-glass', icon: Shield, activePrefix: '/break-glass' },
  { id: 'flags', label: 'Feature Flags', href: '/feature-flags', icon: Flag, activePrefix: '/feature-flags' },
  { id: 'health', label: 'سلامت', href: '/health', icon: Activity, activePrefix: '/health' },
  { id: 'notifications', label: 'اعلان‌ها', href: '/notifications', icon: Bell, activePrefix: '/notifications' },
  { id: 'notification-templates', label: 'قالب اعلان', href: '/notification-templates', icon: BookOpen, activePrefix: '/notification-templates' },
  { id: 'permissions', label: 'مجوزها', href: '/permissions', icon: KeyRound, activePrefix: '/permissions' },
  { id: 'roles', label: 'نقش‌ها', href: '/roles', icon: UserCog, activePrefix: '/roles' },
  { id: 'docs', label: 'مستندات', href: '/docs', icon: BookOpen, activePrefix: '/docs' },
];

export function platformBreadcrumbForPath(pathname: string): string[] {
  if (pathname === '/' || pathname === '/dashboard') return ['خانه', 'داشبورد پلتفرم'];
  const match = PLATFORM_CLOUD_RAIL.find(
    (r) => r.activePrefix && (pathname === r.activePrefix || pathname.startsWith(`${r.activePrefix}/`)),
  );
  if (match) return ['خانه', match.label];
  return ['خانه', 'مدیریت پلتفرم'];
}
