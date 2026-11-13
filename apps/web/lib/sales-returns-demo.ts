import { formatToman } from './finance-receivables-demo';

export { formatToman };

export type SalesReturnMemo = {
  id: string;
  customerName: string;
  customerCode?: string;
  sourceInvoice: string;
  date: string;
  reason: string;
  grossToman: number;
  taxToman: number;
  creditToman: number;
  status: 'posted' | 'draft';
  glDoc?: string;
};

export const RETURN_KPIS = {
  count: 1,
  grossToman: 99_000,
  taxToman: 8_910,
  creditToman: 107_910,
};

export const SALES_RETURNS: SalesReturnMemo[] = [
  {
    id: 'SR-2E85CE82-6333',
    customerName: 'زهرا نوری (خریدار عمده)',
    sourceInvoice: 'INV-140508-007',
    date: '۱۴۰۵/۰۸/۰۹',
    reason: 'آسیب ظاهری و شکستگی قوطی‌ها در حین حمل و نقل',
    grossToman: 99_000,
    taxToman: 8_910,
    creditToman: 107_910,
    status: 'posted',
    glDoc: 'N-2454',
  },
];
