export type QcTab = { id: string; label: string; href: string };

export const QC_FORMULA_FA = 'پذیرش = بازرسی موفق ÷ (موفق + مردود + نگه‌داری)';

export const QC_TABS: QcTab[] = [
  { id: 'overview', label: 'نمای کلی', href: '/qc' },
  { id: 'inspections', label: 'بازرسی‌ها', href: '/qc/inspections' },
  { id: 'hold', label: 'نگه‌داری QC', href: '/qc/hold' },
  { id: 'manufacturing', label: 'بازگشت به تولید', href: '/manufacturing' },
];
