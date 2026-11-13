export type ManufacturingTab = { id: string; label: string; href: string };

export const MFG_FORMULA_FA = 'تحویل = سفارش تولید − WIP − توقف برنامه‌ریزی‌شده';

export const MANUFACTURING_TABS: ManufacturingTab[] = [
  { id: 'overview', label: 'نمای کلی', href: '/manufacturing' },
  { id: 'boms', label: 'BOM', href: '/manufacturing/boms' },
  { id: 'orders', label: 'سفارش تولید', href: '/manufacturing/orders' },
  { id: 'planning', label: 'برنامه‌ریزی', href: '/manufacturing/planning' },
  { id: 'materials', label: 'مواد اولیه', href: '/manufacturing/materials' },
  { id: 'work-centers', label: 'ایستگاه‌ها', href: '/manufacturing/work-centers' },
  { id: 'qc', label: 'کنترل کیفیت', href: '/qc' },
  { id: 'wip', label: 'WIP', href: '/manufacturing/wip' },
  { id: 'batch', label: 'ردیابی بچ', href: '/manufacturing/batch' },
  { id: 'reports', label: 'گزارش‌ها', href: '/manufacturing/reports' },
];
