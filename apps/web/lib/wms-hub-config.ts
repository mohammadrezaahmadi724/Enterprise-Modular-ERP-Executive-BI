/** ناوبری ماژول انبار (WMS) */
export type WmsTab = { id: string; label: string; href: string };

export const WMS_FORMULA_FA = 'قابل استفاده = موجودی واقعی − رزرو شده − مسدود';

export const WMS_TABS: WmsTab[] = [
  { id: 'overview', label: 'نمای کلی', href: '/wms' },
  { id: 'stock', label: 'موجودی', href: '/wms/stock' },
  { id: 'kardex', label: 'کاردکس کالا', href: '/wms/kardex' },
  { id: 'stocktaking', label: 'انبارگردانی', href: '/wms/stocktaking' },
  { id: 'reconciliation', label: 'مغایرت‌گیری و تطبیق', href: '/wms/reconciliation' },
  { id: 'reservations', label: 'رزروها', href: '/wms/reservations' },
  { id: 'receipts', label: 'رسیدها', href: '/wms/receipts' },
  { id: 'issues', label: 'خروج‌ها', href: '/wms/issues' },
  { id: 'transfers', label: 'انتقال‌ها', href: '/wms/transfers' },
  { id: 'adjustments', label: 'تعدیلات', href: '/wms/adjustments' },
  { id: 'tracking', label: 'قرارداد ردیابی', href: '/wms/tracking' },
  { id: 'batches', label: 'بهر و بچ', href: '/wms/batches' },
  { id: 'serials', label: 'سریال‌ها', href: '/wms/serials' },
  { id: 'uom', label: 'تبدیل واحدها', href: '/wms/uom' },
  { id: 'reports', label: 'گزارش‌ها', href: '/wms/reports' },
  { id: 'assistant', label: 'دستیار', href: '/wms/assistant' },
];

export const WMS_WAREHOUSES = [
  { code: 'WH-ESF', label: 'انبار اصفهان' },
  { code: 'WH-MSH', label: 'انبار مشهد' },
  { code: 'WH-THR', label: 'انبار مرکزی تهران' },
] as const;
