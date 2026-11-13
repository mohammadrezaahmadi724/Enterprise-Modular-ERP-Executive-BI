import { formatToman } from './finance-receivables-demo';

export { formatToman };

export type OrderSupplyStatus = 'not_reserved' | 'partial' | 'ready' | 'shipped';

export type SalesOrder = {
  number: string;
  accountCode: string;
  supplyStatus: OrderSupplyStatus;
  deliveredLabel: string;
  amountToman: number;
};

export const ORDERS_TOTAL = 487;

export const SUPPLY_STATUS_FA: Record<OrderSupplyStatus, string> = {
  shipped: 'تحویل‌شده',
  not_reserved: 'رزرو نشده',
  partial: 'رزرو جزئی',
  ready: 'آماده تحویل',
};

export const SALES_ORDERS: SalesOrder[] = [
  { number: 'SO-0486', accountCode: 'CUS-DEMO-020', supplyStatus: 'not_reserved', deliveredLabel: '۰ از ۲ ردیف کامل', amountToman: 3_150_000 },
  { number: 'SO-0485', accountCode: 'CUS-1140', supplyStatus: 'partial', deliveredLabel: 'PCS ۶۶', amountToman: 8_920_000 },
  { number: 'SO-0484', accountCode: 'CUS-1106', supplyStatus: 'not_reserved', deliveredLabel: '۰ از ۳ ردیف کامل', amountToman: 2_100_000 },
  { number: 'SO-0483', accountCode: 'CUS-1002', supplyStatus: 'ready', deliveredLabel: '۱ از ۱ ردیف کامل', amountToman: 15_600_000 },
];

for (let i = 0; i < 24; i++) {
  SALES_ORDERS.push({
    number: `SO-${480 - i}`,
    accountCode: `CUS-${1000 + i}`,
    supplyStatus: (['not_reserved', 'partial', 'ready'] as OrderSupplyStatus[])[i % 3]!,
    deliveredLabel: i % 2 === 0 ? `۰ از ${(i % 3) + 2} ردیف کامل` : `PCS ${20 + i}`,
    amountToman: (i + 5) * 420_000,
  });
}
