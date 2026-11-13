export type DistributionTab = { id: string; label: string; href: string };

export const DIST_FORMULA_FA = 'تحویل به‌موقع = تحویل‌شده ÷ (تحویل‌شده + معوق)';

export const DISTRIBUTION_TABS: DistributionTab[] = [
  { id: 'overview', label: 'نمای کلی', href: '/distribution' },
  { id: 'orders', label: 'سفارش‌گیری', href: '/distribution/orders' },
  { id: 'allocation', label: 'تخصیص', href: '/distribution/allocation' },
  { id: 'routes', label: 'مسیرها', href: '/distribution/routes' },
  { id: 'deliveries', label: 'تحویل', href: '/distribution/deliveries' },
  { id: 'settlement', label: 'تسویه', href: '/distribution/settlement' },
  { id: 'returns', label: 'مرجوعی', href: '/distribution/returns' },
  { id: 'fleet', label: 'ناوگان', href: '/distribution/fleet' },
  { id: 'zones', label: 'مناطق', href: '/distribution/zones' },
  { id: 'reports', label: 'گزارش‌ها', href: '/distribution/reports' },
];
