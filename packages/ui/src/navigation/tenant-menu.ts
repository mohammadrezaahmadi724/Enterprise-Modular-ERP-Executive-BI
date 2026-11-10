import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  Factory,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Sparkles,
  Store,
  Truck,
  Users,
  Wallet,
} from 'lucide-react';

export type TenantMenuItem = {
  href: string;
  label: string;
  subtitle?: string;
};

export type TenantMenuModule = {
  id: string;
  label: string;
  icon: LucideIcon;
  moduleCode?: string;
  items: TenantMenuItem[];
};

export const TENANT_MODULES: TenantMenuModule[] = [
  {
    id: 'finance',
    label: 'مالی',
    icon: Wallet,
    moduleCode: 'finance',
    items: [
      { href: '/finance/ledger', label: 'دفتر کل', subtitle: 'ثبت و کنترل' },
      { href: '/treasury/dashboard', label: 'دریافت و پرداخت', subtitle: 'جریان نقدی' },
      { href: '/treasury/bank-accounts', label: 'خزانه‌داری', subtitle: 'نقدینگی' },
      { href: '/treasury/checks', label: 'مدیریت چک', subtitle: 'سررسیدها' },
      { href: '/finance/receivables', label: 'دریافتنی/پرداختنی', subtitle: 'تعهدات' },
      { href: '/finance/fixed-assets', label: 'دارایی ثابت', subtitle: 'استهلاک' },
      { href: '/finance/moadian', label: 'سامانه مودیان', subtitle: 'صورتحساب' },
      { href: '/finance/budget', label: 'بودجه و هزینه', subtitle: 'انحراف بودجه' },
      { href: '/finance/costing', label: 'بهای تمام‌شده', subtitle: 'هزینه واقعی' },
      { href: '/finance/reports', label: 'گزارش‌های مالی', subtitle: 'تحلیل مدیریتی' },
    ],
  },
  {
    id: 'sales',
    label: 'فروش',
    icon: ShoppingCart,
    moduleCode: 'sales',
    items: [
      { href: '/sales/leads', label: 'سرنخ‌ها', subtitle: 'جذب اولیه' },
      { href: '/sales/customers', label: 'مشتریان', subtitle: 'پروفایل و سوابق' },
      { href: '/sales/opportunities', label: 'فرصت فروش', subtitle: 'پایپ‌لاین' },
      { href: '/workflows/my-tasks', label: 'پیگیری و وظایف', subtitle: 'اقدام بعدی' },
      { href: '/sales/quotes', label: 'پیش‌فاکتور', subtitle: 'پیشنهاد فروش' },
      { href: '/sales/orders', label: 'سفارش فروش', subtitle: 'ثبت سفارش' },
      { href: '/sales/invoices', label: 'فاکتور', subtitle: 'تبدیل و صدور' },
      { href: '/sales/returns', label: 'مرجوعی', subtitle: 'کنترل چرخه' },
      { href: '/sales/channels', label: 'کانال‌های فروش', subtitle: 'ورودی‌ها' },
      { href: '/sales/reports', label: 'گزارش فروش', subtitle: 'تحلیل عملکرد' },
    ],
  },
  {
    id: 'hr',
    label: 'منابع انسانی',
    icon: Users,
    moduleCode: 'hr',
    items: [
      { href: '/hr/employees', label: 'پرونده کارکنان', subtitle: 'اطلاعات پرسنلی' },
      { href: '/hr/org', label: 'ساختار سازمانی', subtitle: 'واحدها و سمت‌ها' },
      { href: '/hr/attendance', label: 'حضور و غیاب', subtitle: 'کارکرد' },
      { href: '/hr/leave-requests', label: 'مرخصی و مأموریت', subtitle: 'درخواست‌ها' },
      { href: '/hr/payroll/run', label: 'حقوق و دستمزد', subtitle: 'محاسبه' },
      { href: '/hr/contracts', label: 'قرارداد کارکنان', subtitle: 'سوابق' },
      { href: '/hr/performance', label: 'ارزیابی عملکرد', subtitle: 'شاخص‌ها' },
      { href: '/hr/training', label: 'آموزش', subtitle: 'توسعه' },
      { href: '/hr/recruitment', label: 'جذب و استخدام', subtitle: 'فرآیند جذب' },
      { href: '/hr/reports', label: 'گزارش‌های HR', subtitle: 'تحلیل' },
    ],
  },
  {
    id: 'inventory',
    label: 'انبار و تدارکات',
    icon: Package,
    moduleCode: 'inventory',
    items: [
      { href: '/procurement/purchase-requests', label: 'درخواست خرید', subtitle: 'نیازسنجی' },
      { href: '/procurement/suppliers', label: 'تأمین‌کنندگان', subtitle: 'ارزیابی' },
      { href: '/procurement/rfq', label: 'استعلام قیمت', subtitle: 'مقایسه' },
      { href: '/procurement/purchase-orders', label: 'سفارش خرید', subtitle: 'تعهد خرید' },
      { href: '/procurement/receipts', label: 'رسید خرید', subtitle: 'تحویل کالا' },
      { href: '/wms/zones', label: 'انبار', subtitle: 'نگهداری' },
      { href: '/wms/tasks', label: 'کنترل موجودی', subtitle: 'موجودی' },
      { href: '/wms/logistics', label: 'لجستیک', subtitle: 'جابجایی' },
      { href: '/wms/carriers', label: 'حمل‌کنندگان', subtitle: 'ناوگان' },
      { href: '/procurement/reports', label: 'گزارش تدارکات', subtitle: 'تحلیل' },
    ],
  },
  {
    id: 'manufacturing',
    label: 'تولید',
    icon: Factory,
    moduleCode: 'manufacturing',
    items: [
      { href: '/manufacturing/boms', label: 'فرمول و ساختار محصول', subtitle: 'BOM' },
      { href: '/manufacturing/orders', label: 'سفارش تولید', subtitle: 'برنامه اجرا' },
      { href: '/manufacturing/planning', label: 'برنامه‌ریزی تولید', subtitle: 'ظرفیت' },
      { href: '/manufacturing/materials', label: 'مواد اولیه', subtitle: 'مصرف و کسری' },
      { href: '/manufacturing/work-centers', label: 'ایستگاه‌های کاری', subtitle: 'جریان عملیات' },
      { href: '/qc/inspections', label: 'کنترل کیفیت', subtitle: 'بازرسی' },
      { href: '/manufacturing/pm', label: 'نگهداری تجهیزات', subtitle: 'PM' },
      { href: '/manufacturing/wip', label: 'موجودی در جریان', subtitle: 'WIP' },
      { href: '/manufacturing/batch', label: 'ردیابی بچ', subtitle: 'Traceability' },
      { href: '/manufacturing/reports', label: 'گزارش تولید', subtitle: 'تحلیل کارخانه' },
    ],
  },
  {
    id: 'distribution',
    label: 'توزیع',
    icon: Truck,
    moduleCode: 'distribution',
    items: [
      { href: '/distribution/orders', label: 'سفارش‌گیری', subtitle: 'ثبت درخواست' },
      { href: '/distribution/allocation', label: 'تخصیص موجودی', subtitle: 'اولویت تخصیص' },
      { href: '/distribution/routes', label: 'مسیر توزیع', subtitle: 'برنامه مسیر' },
      { href: '/distribution/deliveries', label: 'تحویل', subtitle: 'کنترل عملیات' },
      { href: '/distribution/settlement', label: 'تسویه', subtitle: 'وصول و مانده' },
      { href: '/distribution/returns', label: 'مرجوعی پخش', subtitle: 'بازگشت کالا' },
      { href: '/distribution/fleet', label: 'ناوگان', subtitle: 'خودرو و راننده' },
      { href: '/distribution/zones', label: 'مناطق پخش', subtitle: 'پوشش جغرافیایی' },
      { href: '/distribution/visitors', label: 'ویزیتورها', subtitle: 'عملکرد میدانی' },
      { href: '/distribution/reports', label: 'گزارش پخش', subtitle: 'تحلیل عملیات' },
    ],
  },
  {
    id: 'retail',
    label: 'خرده‌فروشی',
    icon: Store,
    moduleCode: 'retail',
    items: [
      { href: '/retail/stores', label: 'شعب و فروشگاه‌ها', subtitle: 'ساختار سیستم فروش' },
      { href: '/retail/pos', label: 'صندوق فروش', subtitle: 'تراکنش حضوری' },
      { href: '/retail/pricing', label: 'قیمت‌گذاری', subtitle: 'سیاست قیمت' },
      { href: '/retail/promotions', label: 'تخفیف و کمپین', subtitle: 'پروموشن' },
      { href: '/retail/store-inventory', label: 'موجودی فروشگاهی', subtitle: 'موجودی شعب' },
      { href: '/retail/returns', label: 'مرجوعی مشتری', subtitle: 'بازگشت کالا' },
      { href: '/retail/loyalty', label: 'باشگاه مشتریان', subtitle: 'وفاداری' },
      { href: '/retail/cash', label: 'مدیریت صندوق', subtitle: 'کنترل نقدی' },
      { href: '/retail/online', label: 'فروش آنلاین', subtitle: 'همگام‌سازی' },
      { href: '/retail/reports', label: 'گزارش خرده‌فروشی', subtitle: 'تحلیل شعب' },
    ],
  },
  {
    id: 'bi',
    label: 'BI و ریسک',
    icon: BarChart3,
    moduleCode: 'bi-risk',
    items: [
      { href: '/bi/dashboard', label: 'داشبورد مدیریتی', subtitle: 'KPI مدیرعامل' },
      { href: '/bi/risk-radar', label: 'رادار ریسک', subtitle: 'هشدار هوشمند' },
    ],
  },
  {
    id: 'ai',
    label: 'AI و پیام',
    icon: Sparkles,
    moduleCode: 'ai-messaging',
    items: [
      { href: '/ai/conversations', label: 'مکالمات AI', subtitle: 'تحلیل' },
      { href: '/messaging/inbox', label: 'صندوق پیام', subtitle: 'یکپارچه' },
      { href: '/voip/dialer', label: 'VoIP', subtitle: 'تماس' },
    ],
  },
];

export const TENANT_SETTINGS: TenantMenuItem[] = [
  { href: '/alerts', label: 'آلارم‌ها' },
  { href: '/settings/subscription', label: 'اشتراک من' },
  { href: '/settings/notifications', label: 'تنظیمات' },
  { href: '/billing/plans', label: 'پلن‌ها و قیمت' },
];

export const TENANT_HOME: TenantMenuItem = { href: '/dashboard', label: 'داشبورد' };

export function findMenuItemByHref(href: string): { module: TenantMenuModule; item: TenantMenuItem } | null {
  for (const mod of TENANT_MODULES) {
    const item = mod.items.find((i) => i.href === href);
    if (item) return { module: mod, item };
  }
  return null;
}
