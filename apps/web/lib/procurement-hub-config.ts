export type ProcurementTab = { id: string; label: string; href: string };

export const PROCUREMENT_TABS: ProcurementTab[] = [
  { id: 'overview', label: 'نمای کلی', href: '/procurement' },
  { id: 'pr', label: 'درخواست خرید', href: '/procurement/purchase-requests' },
  { id: 'suppliers', label: 'تأمین‌کنندگان', href: '/procurement/suppliers' },
  { id: 'rfq', label: 'استعلام قیمت', href: '/procurement/rfq' },
  { id: 'po', label: 'سفارش خرید', href: '/procurement/purchase-orders' },
  { id: 'receipts', label: 'رسید خرید', href: '/procurement/receipts' },
  { id: 'supplier-invoices', label: 'فاکتور تأمین‌کننده', href: '/procurement/supplier-invoices' },
  { id: 'reports', label: 'گزارش‌ها', href: '/procurement/reports' },
];
