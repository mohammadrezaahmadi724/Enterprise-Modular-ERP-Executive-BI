import { formatToman } from './finance-receivables-demo';

export { formatToman };

export type TreasuryAccountKind = 'bank' | 'cash';

export type TreasuryAccount = {
  id: string;
  code: string;
  name: string;
  netToman: number;
  kind: TreasuryAccountKind;
};

export const TREASURY_ACCOUNTS: TreasuryAccount[] = [
  {
    id: 'TR-BANK-1',
    code: 'TR-BANK-1',
    name: 'حساب جاری بانک ملی — شعبه مرکزی',
    netToman: -3_495_033_759,
    kind: 'bank',
  },
  {
    id: 'TR-CASH-1',
    code: 'TR-CASH-1',
    name: 'صندوق مرکزی شرکت',
    netToman: 491_093_287,
    kind: 'cash',
  },
  {
    id: 'TR-CHQ-COLL',
    code: 'TR-CHQ-COLL',
    name: 'اسناد واگذارشده به بانک جهت وصول',
    netToman: 0,
    kind: 'cash',
  },
  {
    id: 'TR-CHQ-SAFE',
    code: 'TR-CHQ-SAFE',
    name: 'صندوق اسناد دریافتنی (گاوصندوق چک)',
    netToman: 0,
    kind: 'cash',
  },
];

export type TreasuryTxnStatus = 'posted' | 'draft' | 'returned';
export type TreasuryTxnKind = 'receipt' | 'payment';

export type TreasuryTransaction = {
  id: string;
  date: string;
  party: string;
  accountId: string;
  inflowToman: number | null;
  outflowToman: number | null;
  method: string;
  methodRef?: string;
  sourceNo: string;
  journalNo: string;
  description: string;
  status: TreasuryTxnStatus;
  kind: TreasuryTxnKind;
};

/** نمونه گردش — عمدتاً حساب ملی؛ برای فیلتر حساب/وضعیت/نوع */
export const TREASURY_TRANSACTIONS: TreasuryTransaction[] = [
  {
    id: '149d7f5c',
    date: '۱۴۰۵/۰۸/۱۷',
    party: 'پخش سراسری لاله کرمان',
    accountId: 'TR-BANK-1',
    inflowToman: null,
    outflowToman: 57_670_810,
    method: 'حواله بانکی (ساتنا/پایا)',
    methodRef: '0103224578',
    sourceNo: 'demo-bulk-pay-140507-SUP-2104-0',
    journalNo: 'JRN-2312',
    description: 'پرداخت به پخش سراسری لاله کرمان بابت PO-00255',
    status: 'posted',
    kind: 'payment',
  },
  {
    id: 'c1c92c45',
    date: '۱۴۰۵/۰۸/۱۶',
    party: 'سوپرمارکت فدک تبریز',
    accountId: 'TR-BANK-1',
    inflowToman: 118_714_080,
    outflowToman: null,
    method: 'حواله بانکی (ساتنا/پایا)',
    methodRef: '0368914099',
    sourceNo: 'demo-bulk-rcv-140506-008',
    journalNo: 'JRN-2245',
    description: 'وصول مطالبات SO-0445 از سوپرمارکت فدک تبریز',
    status: 'posted',
    kind: 'receipt',
  },
  {
    id: 'f298bee9',
    date: '۱۴۰۵/۰۸/۱۵',
    party: 'شرکت بازرگانی آریا',
    accountId: 'TR-BANK-1',
    inflowToman: null,
    outflowToman: 97_406_760,
    method: 'حواله بانکی (ساتنا/پایا)',
    methodRef: '3684485297',
    sourceNo: 'demo-bulk-pay-140508-SUP-2001-0',
    journalNo: 'JRN-2413',
    description: 'پرداخت به شرکت بازرگانی آریا بابت PO-00268',
    status: 'posted',
    kind: 'payment',
  },
  {
    id: 'e39038b8',
    date: '۱۴۰۵/۰۸/۱۵',
    party: 'زهرا نوری (خریدار عمده)',
    accountId: 'TR-BANK-1',
    inflowToman: 31_408_786,
    outflowToman: null,
    method: 'کارت‌خوان (پوز)',
    methodRef: '3619302364',
    sourceNo: 'demo-bulk-rcv-140508-007',
    journalNo: 'JRN-2445',
    description: 'وصول مطالبات SO-0480 از زهرا نوری (خریدار عمده)',
    status: 'posted',
    kind: 'receipt',
  },
  {
    id: '6f62fd4d',
    date: '۱۴۰۵/۰۸/۱۳',
    party: 'صنایع بسته‌بندی کارتن میهن',
    accountId: 'TR-BANK-1',
    inflowToman: null,
    outflowToman: 17_387_680,
    method: 'حواله بانکی (ساتنا/پایا)',
    methodRef: '1014270508',
    sourceNo: 'demo-bulk-pay-140507-SUP-2003-0',
    journalNo: 'JRN-2305',
    description: 'پرداخت به صنایع بسته‌بندی کارتن میهن بابت PO-00250',
    status: 'posted',
    kind: 'payment',
  },
  {
    id: 'a3d008d7',
    date: '۱۴۰۵/۰۸/۱۲',
    party: 'شرکت تأمین فدک کرمان',
    accountId: 'TR-BANK-1',
    inflowToman: null,
    outflowToman: 9_028_688,
    method: 'حواله بانکی (ساتنا/پایا)',
    methodRef: '0030229425',
    sourceNo: 'demo-bulk-pay-140507-SUP-2112-0',
    journalNo: 'JRN-2323',
    description: 'پرداخت به شرکت تأمین فدک کرمان بابت PO-00263',
    status: 'posted',
    kind: 'payment',
  },
  {
    id: '6cee5601',
    date: '۱۴۰۵/۰۸/۱۲',
    party: 'بازرگانی شبنم اهواز',
    accountId: 'TR-BANK-1',
    inflowToman: null,
    outflowToman: 150_918_130,
    method: 'حواله بانکی (ساتنا/پایا)',
    methodRef: '2158979671',
    sourceNo: 'demo-bulk-pay-140507-SUP-2107-0',
    journalNo: 'JRN-2316',
    description: 'پرداخت به بازرگانی شبنم اهواز بابت PO-00258',
    status: 'posted',
    kind: 'payment',
  },
  {
    id: '7d51c5ce',
    date: '۱۴۰۵/۰۸/۰۸',
    party: 'تعاونی مصرف فرهنگیان اصفهان',
    accountId: 'TR-BANK-1',
    inflowToman: 24_642_720,
    outflowToman: null,
    method: 'کارت‌خوان (پوز)',
    methodRef: '3185978839',
    sourceNo: 'demo-bulk-rcv-140507-001',
    journalNo: 'JRN-2335',
    description: 'وصول مطالبات SO-0456 از تعاونی مصرف فرهنگیان اصفهان',
    status: 'posted',
    kind: 'receipt',
  },
  {
    id: '05a2b3d6',
    date: '۱۴۰۵/۰۸/۰۷',
    party: 'کشت و صنعت کوثر کرمان',
    accountId: 'TR-BANK-1',
    inflowToman: null,
    outflowToman: 27_967_220,
    method: 'حواله بانکی (ساتنا/پایا)',
    methodRef: '0836089206',
    sourceNo: 'demo-bulk-pay-140507-SUP-2108-0',
    journalNo: 'JRN-2318',
    description: 'پرداخت به کشت و صنعت کوثر کرمان بابت PO-00259',
    status: 'posted',
    kind: 'payment',
  },
  {
    id: '48c11aa0',
    date: '۱۴۰۵/۰۸/۰۴',
    party: 'شرکت پخش گلستان اصفهان',
    accountId: 'TR-BANK-1',
    inflowToman: 2_817_650,
    outflowToman: null,
    method: 'حواله بانکی (ساتنا/پایا)',
    methodRef: '0536690289',
    sourceNo: 'demo-bulk-rcv-140506-002',
    journalNo: 'JRN-2217',
    description: 'وصول مطالبات SO-0439 از شرکت پخش گلستان اصفهان',
    status: 'posted',
    kind: 'receipt',
  },
  {
    id: 'c5b20fb0',
    date: '۱۴۰۵/۰۸/۰۲',
    party: 'بازرگانی گندم طلایی',
    accountId: 'TR-BANK-1',
    inflowToman: null,
    outflowToman: 155_056_642,
    method: 'حواله بانکی (ساتنا/پایا)',
    methodRef: '1509301883',
    sourceNo: 'demo-bulk-pay-140507-SUP-2002-0',
    journalNo: 'JRN-2303',
    description: 'پرداخت به بازرگانی گندم طلایی بابت PO-00249',
    status: 'posted',
    kind: 'payment',
  },
  {
    id: '2469135e',
    date: '۱۴۰۵/۰۷/۱۱',
    party: 'شرکت بازرگانی آریا',
    accountId: 'TR-BANK-1',
    inflowToman: null,
    outflowToman: 150_000_000,
    method: '—',
    sourceNo: 'demo-tr-payment-1',
    journalNo: 'JRN-7',
    description: 'تسویه بدهی به شرکت بازرگانی آریا از حساب بانک',
    status: 'posted',
    kind: 'payment',
  },
  {
    id: 'draft-cash-1',
    date: '۱۴۰۵/۰۸/۱۸',
    party: 'صنایع غذایی پارس',
    accountId: 'TR-CASH-1',
    inflowToman: 12_000_000,
    outflowToman: null,
    method: 'نقد',
    sourceNo: 'demo-rcv-draft-01',
    journalNo: 'JRN-DRF-12',
    description: 'دریافت نقدی — پیش‌نویس',
    status: 'draft',
    kind: 'receipt',
  },
  {
    id: 'cash-pay-1',
    date: '۱۴۰۵/۰۸/۱۰',
    party: 'تأمین‌کننده محلی',
    accountId: 'TR-CASH-1',
    inflowToman: null,
    outflowToman: 8_500_000,
    method: 'نقد',
    sourceNo: 'demo-pay-cash-01',
    journalNo: 'JRN-2280',
    description: 'پرداخت نقدی هزینهٔ پذیرایی',
    status: 'posted',
    kind: 'payment',
  },
  {
    id: 'returned-1',
    date: '۱۴۰۵/۰۸/۰۵',
    party: 'فروشگاه زنجیره‌ای آفتاب',
    accountId: 'TR-BANK-1',
    inflowToman: 5_200_000,
    outflowToman: null,
    method: 'حواله بانکی (ساتنا/پایا)',
    methodRef: '0099887766',
    sourceNo: 'demo-rcv-bounced',
    journalNo: 'JRN-2190',
    description: 'واریز برگشت‌خورده',
    status: 'returned',
    kind: 'receipt',
  },
];

export const TREASURY_TXN_TOTAL_HINT = 497;

/** جمع نمایشی برای حساب ملی و ثبت‌شده (مطابق نمونه) */
export const TREASURY_MELLI_POSTED_FOOTER = {
  inflowToman: 9_494_466_559,
  outflowToman: 5_999_432_799,
};

export type MonthlyCashPoint = {
  label: string;
  inflowToman: number;
  outflowToman: number;
};

export const TREASURY_MONTHLY_CASH: MonthlyCashPoint[] = [
  { label: '۱۴۰۵/۰۳', inflowToman: 620_000_000, outflowToman: 710_000_000 },
  { label: '۱۴۰۵/۰۴', inflowToman: 880_000_000, outflowToman: 920_000_000 },
  { label: '۱۴۰۵/۰۵', inflowToman: 1_050_000_000, outflowToman: 1_120_000_000 },
  { label: '۱۴۰۵/۰۶', inflowToman: 928_442_653, outflowToman: 1_749_225_133 },
  { label: '۱۴۰۵/۰۷', inflowToman: 1_240_000_000, outflowToman: 1_380_000_000 },
  { label: '۱۴۰۵/۰۸', inflowToman: 890_000_000, outflowToman: 1_050_000_000 },
];

export const DEMO_BANK_MASTER = [
  { code: 'BANK-MELI-1', title: 'بانک ملی — حساب جاری اصلی' },
  { code: 'BANK-MLT-1', title: 'بانک ملت — حساب فروش و عملیاتی' },
  { code: 'BANK-TEJ-1', title: 'بانک تجارت — حساب تسویه تأمین‌کنندگان' },
] as const;

export function formatSignedToman(n: number): string {
  if (n < 0) return `‎−${formatToman(Math.abs(n))}`;
  return formatToman(n);
}

export function accountById(id: string): TreasuryAccount | undefined {
  return TREASURY_ACCOUNTS.find((a) => a.id === id);
}

export function statusLabelFa(status: TreasuryTxnStatus): string {
  if (status === 'posted') return 'ثبت‌شده';
  if (status === 'draft') return 'پیش‌نویس';
  return 'برگشت‌خورده';
}
