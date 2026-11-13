export type RetailTab = { id: string; label: string; href: string };

export const RETAIL_FORMULA_FA = 'فروش خالص = فروش ناخالص − تخفیف − مرجوعی';

export const RETAIL_TABS: RetailTab[] = [
  { id: 'overview', label: 'نمای کلی', href: '/retail' },
  { id: 'stores', label: 'شعب', href: '/retail/stores' },
  { id: 'pos', label: 'صندوق', href: '/retail/pos' },
  { id: 'pricing', label: 'قیمت‌گذاری', href: '/retail/pricing' },
  { id: 'promotions', label: 'کمپین', href: '/retail/promotions' },
  { id: 'store-inv', label: 'موجودی شعب', href: '/retail/store-inventory' },
  { id: 'returns', label: 'مرجوعی', href: '/retail/returns' },
  { id: 'loyalty', label: 'وفاداری', href: '/retail/loyalty' },
  { id: 'reports', label: 'گزارش‌ها', href: '/retail/reports' },
];
