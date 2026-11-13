import { formatToman } from './finance-receivables-demo';

export { formatToman };

export type InvoiceStatus = 'draft' | 'posted';

export type SalesInvoice = {
  number: string;
  customerName: string;
  customerCode?: string;
  orderNumber: string;
  invoiceDate: string;
  dueDate: string;
  status: InvoiceStatus;
  amountToman: number;
};

export const INVOICES_TOTAL = 43;

export const SALES_INVOICES: SalesInvoice[] = [
  {
    number: 'INV-140508-007',
    customerName: 'زهرا نوری (خریدار عمده)',
    customerCode: 'CUS-1110',
    orderNumber: 'SO-0480',
    invoiceDate: '۱۴۰۵/۰۸/۱۵',
    dueDate: '۱۴۰۵/۰۹/۱۵',
    status: 'posted',
    amountToman: 31_408_786,
  },
  {
    number: 'INV-140508-006',
    customerName: 'صنایع غذایی پارس',
    customerCode: 'CUS-1001',
    orderNumber: 'SO-0478',
    invoiceDate: '۱۴۰۵/۰۸/۱۴',
    dueDate: '۱۴۰۵/۰۹/۱۴',
    status: 'draft',
    amountToman: 12_200_000,
  },
  {
    number: 'INV-140508-005',
    customerName: 'فروشگاه‌های زنجیره‌ای افق طلایی',
    customerCode: 'CUS-1004',
    orderNumber: 'SO-0475',
    invoiceDate: '۱۴۰۵/۰۸/۱۲',
    dueDate: '۱۴۰۵/۰۹/۱۲',
    status: 'posted',
    amountToman: 45_890_000,
  },
];

for (let i = 0; i < 20; i++) {
  SALES_INVOICES.push({
    number: `INV-140508-${String(i).padStart(3, '0')}`,
    customerName: `مشتری نمونه ${i + 1}`,
    customerCode: `CUS-${1100 + i}`,
    orderNumber: `SO-${470 - i}`,
    invoiceDate: `۱۴۰۵/۰۸/${8 + (i % 10)}`,
    dueDate: `۱۴۰۵/۰۹/${8 + (i % 10)}`,
    status: i % 5 === 0 ? 'draft' : 'posted',
    amountToman: 5_000_000 + i * 1_250_000,
  });
}
