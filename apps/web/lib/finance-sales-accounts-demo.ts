import { formatToman } from './finance-receivables-demo';

export { formatToman };

export type SalesOutlet = {
  id: string;
  code: string;
  name: string;
  representative: string;
  commissionPct: number;
  salesMtdToman: number;
  commissionAccruedToman: number;
  unsettledToman: number;
  status: 'فعال' | 'معلق';
};

export const SALES_OUTLETS: SalesOutlet[] = [
  {
    id: '1',
    code: 'SH-TEH-01',
    name: 'فروشگاه زنجیره‌ای افق طلایی — تهران',
    representative: 'نمایندگی مرکز',
    commissionPct: 4.5,
    salesMtdToman: 2_840_000_000,
    commissionAccruedToman: 127_800_000,
    unsettledToman: 42_500_000,
    status: 'فعال',
  },
  {
    id: '2',
    code: 'SH-ESF-02',
    name: 'پخش گلستان اصفهان',
    representative: 'علی رضایی',
    commissionPct: 6,
    salesMtdToman: 1_120_000_000,
    commissionAccruedToman: 67_200_000,
    unsettledToman: 18_300_000,
    status: 'فعال',
  },
  {
    id: '3',
    code: 'SH-MHD-03',
    name: 'هاپیرمارکت ستاره کویر — مشهد',
    representative: 'مریم صادقی',
    commissionPct: 3.5,
    salesMtdToman: 890_000_000,
    commissionAccruedToman: 31_150_000,
    unsettledToman: 0,
    status: 'فعال',
  },
];

export type CommissionSettlement = {
  id: string;
  date: string;
  representative: string;
  amountToman: number;
  method: string;
  status: string;
};

export const COMMISSION_SETTLEMENTS: CommissionSettlement[] = [
  { id: 'CS-1042', date: '۱۴۰۵/۰۸/۱۲', representative: 'علی رضایی', amountToman: 48_900_000, method: 'حواله', status: 'ثبت قطعی' },
  { id: 'CS-1038', date: '۱۴۰۵/۰۸/۰۵', representative: 'نمایندگی مرکز', amountToman: 85_000_000, method: 'چک', status: 'ثبت قطعی' },
];
