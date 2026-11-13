import type { LucideIcon } from 'lucide-react';
import type { TenantCloudFlyoutSpec } from './tenant-cloud-flyout';
import {
  BarChart3,
  CreditCard,
  Database,
  Factory,
  FolderKanban,
  GitBranch,
  Home,
  Package,
  Shield,
  ShoppingCart,
  Sparkles,
  Store,
  Truck,
  Users,
  Wallet,
} from 'lucide-react';

export type TenantCloudRailItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  /** اگر تنظیم شود، برای active از این استفاده می‌شود */
  activePrefix?: string;
  /** پنل فرعی کنار ریل؛ بدون آن کلیک مستقیم به href می‌رود */
  flyout?: TenantCloudFlyoutSpec;
};

/** منوی ریل عمودی — هم‌تراز cloud.sakhtar.net/t/demo/admin */
export const TENANT_CLOUD_RAIL: TenantCloudRailItem[] = [
  { id: 'home', label: 'خانه', href: '/dashboard', icon: Home, activePrefix: '/dashboard' },
  {
    id: 'ai',
    label: 'دستیار هوشمند',
    href: '/ai',
    icon: Sparkles,
    activePrefix: '/ai',
    flyout: { type: 'module', moduleId: 'ai' },
  },
  {
    id: 'sales',
    label: 'فروش و CRM',
    href: '/sales',
    icon: ShoppingCart,
    activePrefix: '/sales',
    flyout: { type: 'module', moduleId: 'sales' },
  },
  {
    id: 'wms',
    label: 'انبار',
    href: '/inventory',
    icon: Package,
    activePrefix: '/wms',
    flyout: { type: 'module', moduleId: 'inventory', hrefPrefix: '/wms' },
  },
  {
    id: 'procurement',
    label: 'خرید و تأمین',
    href: '/procurement',
    icon: Package,
    activePrefix: '/procurement',
    flyout: { type: 'module', moduleId: 'inventory', hrefPrefix: '/procurement' },
  },
  {
    id: 'finance',
    label: 'مالی و حسابداری',
    href: '/finance',
    icon: Wallet,
    activePrefix: '/finance',
    flyout: { type: 'module', moduleId: 'finance' },
  },
  {
    id: 'hr',
    label: 'منابع انسانی',
    href: '/hr/employees',
    icon: Users,
    activePrefix: '/hr',
    flyout: { type: 'module', moduleId: 'hr' },
  },
  {
    id: 'projects',
    label: 'پروژه‌ها و کارها',
    href: '/projects',
    icon: FolderKanban,
    activePrefix: '/projects',
    flyout: { type: 'module', moduleId: 'projects' },
  },
  {
    id: 'manufacturing',
    label: 'تولید',
    href: '/manufacturing',
    icon: Factory,
    activePrefix: '/manufacturing',
    flyout: { type: 'module', moduleId: 'manufacturing' },
  },
  {
    id: 'distribution',
    label: 'توزیع',
    href: '/distribution',
    icon: Truck,
    activePrefix: '/distribution',
    flyout: { type: 'module', moduleId: 'distribution' },
  },
  {
    id: 'retail',
    label: 'خرده‌فروشی',
    href: '/retail',
    icon: Store,
    activePrefix: '/retail',
    flyout: { type: 'module', moduleId: 'retail' },
  },
  {
    id: 'bi',
    label: 'BI و ریسک',
    href: '/bi',
    icon: BarChart3,
    activePrefix: '/bi',
    flyout: { type: 'module', moduleId: 'bi' },
  },
  {
    id: 'workflows',
    label: 'گردش‌کار',
    href: '/workflows',
    icon: GitBranch,
    activePrefix: '/workflows',
  },
  {
    id: 'master',
    label: 'اطلاعات پایه',
    href: '/projects/settings/master-data',
    icon: Database,
    activePrefix: '/projects/settings',
    flyout: { type: 'module', moduleId: 'projects', hrefPrefix: '/projects/settings' },
  },
  {
    id: 'users',
    label: 'کاربران و دسترسی‌ها',
    href: '/admin/users',
    icon: Users,
    activePrefix: '/admin/users',
    // settings/users برای سازگاری عقب
    flyout: { type: 'settings', hrefPrefix: '/settings' },
  },
  {
    id: 'subscription',
    label: 'اشتراک',
    href: '/settings/subscription',
    icon: CreditCard,
    activePrefix: '/settings/subscription',
  },
  {
    id: 'security',
    label: 'هشدارها',
    href: '/alerts',
    icon: Shield,
    activePrefix: '/alerts',
    flyout: { type: 'settings', hrefPrefix: '/alerts' },
  },
];

export function breadcrumbLabelForPath(pathname: string): string[] {
  if (pathname === '/dashboard' || pathname === '/') return ['خانه'];
  if (pathname.startsWith('/settings/subscription')) return ['خانه', 'اشتراک'];
  if (pathname.startsWith('/settings/users') || pathname.startsWith('/admin/users'))
    return ['خانه', 'کاربران و دسترسی‌ها'];
  if (pathname.startsWith('/sales')) return ['خانه', 'فروش و CRM'];
  if (pathname.startsWith('/finance') || pathname.startsWith('/treasury'))
    return ['خانه', 'مالی و حسابداری'];
  if (pathname.startsWith('/wms') || pathname.startsWith('/inventory')) return ['خانه', 'انبار'];
  if (pathname.startsWith('/procurement')) return ['خانه', 'خرید و تأمین'];
  if (pathname.startsWith('/projects')) return ['خانه', 'پروژه‌ها'];
  if (pathname.startsWith('/manufacturing')) return ['خانه', 'تولید'];
  if (pathname.startsWith('/distribution')) return ['خانه', 'توزیع'];
  if (pathname.startsWith('/retail')) return ['خانه', 'خرده‌فروشی'];
  if (pathname.startsWith('/bi')) return ['خانه', 'BI و ریسک'];
  if (pathname.startsWith('/workflows')) return ['خانه', 'گردش‌کار'];
  if (pathname.startsWith('/qc')) return ['خانه', 'تولید', 'کنترل کیفیت'];
  if (pathname.startsWith('/ai') || pathname.startsWith('/messaging') || pathname.startsWith('/voip'))
    return ['خانه', 'AI و پیام'];
  return ['خانه'];
}
