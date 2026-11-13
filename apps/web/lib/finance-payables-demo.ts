export { formatToman, formatPct } from './finance-receivables-demo';

export const AP_AS_OF_LABEL = '۱۴۰۵/۰۸/۲۰';
export const AP_AS_OF_JALALI = '۲۰ آبان ۱۴۰۵';

export type ApAgingBucket = {
  key: string;
  label: string;
  amountToman: number;
  pct: number;
  itemCount: number;
  colorClass: string;
  barFlex: number;
};

export const AP_AGING_TOTAL = { amountToman: 4_162_181_219, itemCount: 97 };

export const AP_AGING_BUCKETS: ApAgingBucket[] = [
  { key: 'current', label: 'جاری', amountToman: 899_731_126, pct: 21.6, itemCount: 20, colorClass: 'bg-emerald-500', barFlex: 216 },
  { key: 'd1_30', label: '۱ تا ۳۰ روز', amountToman: 888_085_544, pct: 21.3, itemCount: 16, colorClass: 'bg-sky-500', barFlex: 213 },
  { key: 'd31_60', label: '۳۱ تا ۶۰ روز', amountToman: 428_281_492, pct: 10.2, itemCount: 12, colorClass: 'bg-amber-500', barFlex: 102 },
  { key: 'd61_90', label: '۶۱ تا ۹۰ روز', amountToman: 377_935_046, pct: 9, itemCount: 8, colorClass: 'bg-orange-600', barFlex: 90 },
  { key: 'over90', label: 'بیش از ۹۰ روز', amountToman: 1_568_148_011, pct: 37.6, itemCount: 41, colorClass: 'bg-red-500', barFlex: 376 },
];

export type ApSupplierBalance = {
  id: string;
  name: string;
  account: string;
  balanceToman: number;
  overdueToman: number;
  maxDelayDays: number;
  status: 'بیش از ۹۰ روز';
  openItemCount: number;
};

export const AP_SUPPLIER_BALANCES: ApSupplierBalance[] = [
  { id: '92ce2d2e', name: 'بازرگانی گندم طلایی', account: '2101', balanceToman: 665_097_079, overdueToman: 621_910_625, maxDelayDays: 213, status: 'بیش از ۹۰ روز', openItemCount: 7 },
  { id: '32b12ad4', name: 'بازرگانی بهار اصفهان', account: '2101', balanceToman: 571_734_975, overdueToman: 262_952_363, maxDelayDays: 195, status: 'بیش از ۹۰ روز', openItemCount: 5 },
  { id: 'bc02c3e7', name: 'بازرگانی شبنم اهواز', account: '2101', balanceToman: 417_412_012, overdueToman: 319_699_071, maxDelayDays: 172, status: 'بیش از ۹۰ روز', openItemCount: 5 },
  { id: '89d54e8b', name: 'بازرگانی وحدت اصفهان', account: '2101', balanceToman: 319_003_760, overdueToman: 274_767_418, maxDelayDays: 178, status: 'بیش از ۹۰ روز', openItemCount: 5 },
  { id: 'fb0054e3', name: 'شرکت بازرگانی آریا', account: '2101', balanceToman: 289_377_367, overdueToman: 289_377_367, maxDelayDays: 185, status: 'بیش از ۹۰ روز', openItemCount: 4 },
  { id: '1ea7704e', name: 'پخش سراسری ظفر کرمان', account: '2101', balanceToman: 261_730_800, overdueToman: 261_730_800, maxDelayDays: 157, status: 'بیش از ۹۰ روز', openItemCount: 5 },
  { id: '7c461c21', name: 'صنایع غذایی طلوع اهواز', account: '2101', balanceToman: 200_260_631, overdueToman: 173_185_903, maxDelayDays: 174, status: 'بیش از ۹۰ روز', openItemCount: 7 },
  { id: '9f6eff10', name: 'تولیدی زاگرس اهواز', account: '2101', balanceToman: 190_908_050, overdueToman: 156_155_035, maxDelayDays: 194, status: 'بیش از ۹۰ روز', openItemCount: 6 },
  { id: 'e9aa959e', name: 'کشت و صنعت کوثر کرمان', account: '2101', balanceToman: 172_389_168, overdueToman: 145_227_894, maxDelayDays: 170, status: 'بیش از ۹۰ روز', openItemCount: 8 },
  { id: '53d71af9', name: 'پخش سراسری لاله کرمان', account: '2101', balanceToman: 160_083_395, overdueToman: 124_538_495, maxDelayDays: 99, status: 'بیش از ۹۰ روز', openItemCount: 5 },
  { id: 'd8bc098b', name: 'کشت و صنعت خلیج تبریز', account: '2101', balanceToman: 152_260_574, overdueToman: 98_920_988, maxDelayDays: 178, status: 'بیش از ۹۰ روز', openItemCount: 7 },
  { id: '57006d6d', name: 'کشت و صنعت دشت خوزستان', account: '2101', balanceToman: 133_400_086, overdueToman: 66_739_610, maxDelayDays: 195, status: 'بیش از ۹۰ روز', openItemCount: 3 },
  { id: '02ce7674', name: 'صنایع غذایی یاس اصفهان', account: '2101', balanceToman: 123_959_596, overdueToman: 98_974_398, maxDelayDays: 164, status: 'بیش از ۹۰ روز', openItemCount: 4 },
  { id: 'e3a461df', name: 'پخش سراسری ثمین تبریز', account: '2101', balanceToman: 108_959_125, overdueToman: 74_187_035, maxDelayDays: 150, status: 'بیش از ۹۰ روز', openItemCount: 4 },
  { id: '08f08097', name: 'صنایع غذایی دنا اهواز', account: '2101', balanceToman: 107_076_313, overdueToman: 89_253_505, maxDelayDays: 158, status: 'بیش از ۹۰ روز', openItemCount: 5 },
  { id: 'e2dc9c33', name: 'کشت و صنعت پارسیان تبریز', account: '2101', balanceToman: 89_937_099, overdueToman: 64_835_380, maxDelayDays: 130, status: 'بیش از ۹۰ روز', openItemCount: 3 },
  { id: 'b74133f8', name: 'تولیدی البرز اصفهان', account: '2101', balanceToman: 69_439_267, overdueToman: 53_015_692, maxDelayDays: 201, status: 'بیش از ۹۰ روز', openItemCount: 4 },
  { id: '49729c1e', name: 'شرکت تأمین چکاد تبریز', account: '2101', balanceToman: 52_655_720, overdueToman: 19_623_488, maxDelayDays: 109, status: 'بیش از ۹۰ روز', openItemCount: 5 },
  { id: 'f538d9cb', name: 'صنایع بسته‌بندی کارتن میهن', account: '2101', balanceToman: 44_047_118, overdueToman: 34_905_942, maxDelayDays: 154, status: 'بیش از ۹۰ روز', openItemCount: 3 },
  { id: 'fc5e6302', name: 'شرکت تأمین فدک کرمان', account: '2101', balanceToman: 32_449_082, overdueToman: 32_449_082, maxDelayDays: 98, status: 'بیش از ۹۰ روز', openItemCount: 2 },
];

export const AP_FOOTER = {
  supplierCount: 20,
  balanceToman: 4_162_181_219,
  overdueToman: 3_262_450_093,
};

export type ApPaymentScheduleRow = {
  day: string;
  monthShort: string;
  supplier: string;
  ref: string;
  overdueDays: number | null;
  amountToman: number;
  upcoming?: boolean;
};

export const AP_PAYMENT_SCHEDULE_META = {
  itemCount: 82,
  totalToman: 3_540_587_682,
};

export const AP_PAYMENT_SCHEDULE: ApPaymentScheduleRow[] = [
  { day: '۲۳', monthShort: 'فروردین', supplier: 'بازرگانی گندم طلایی', ref: 'PO-00011-INV', overdueDays: 213, amountToman: 142_440_110 },
  { day: '۰۴', monthShort: 'اردیبهشت', supplier: 'تولیدی البرز اصفهان', ref: 'PO-00025-INV', overdueDays: 201, amountToman: 6_063_942 },
  { day: '۱۰', monthShort: 'اردیبهشت', supplier: 'بازرگانی بهار اصفهان', ref: 'PO-00017-INV', overdueDays: 195, amountToman: 24_180_996 },
  { day: '۱۱', monthShort: 'اردیبهشت', supplier: 'تولیدی زاگرس اهواز', ref: 'PO-00036-INV', overdueDays: 194, amountToman: 32_120_120 },
  { day: '۲۰', monthShort: 'اردیبهشت', supplier: 'شرکت بازرگانی آریا', ref: 'PO-00009-INV', overdueDays: 185, amountToman: 29_896_520 },
  { day: '۲۰', monthShort: 'آبان', supplier: 'شرکت تأمین چکاد تبریز', ref: 'PO-00257-INV', overdueDays: null, amountToman: 23_790_340, upcoming: true },
  { day: '۲۱', monthShort: 'آبان', supplier: 'کشت و صنعت دشت خوزستان', ref: 'PO-00271-INV', overdueDays: null, amountToman: 66_660_476, upcoming: true },
];

export const AP_SHARE_TOP = AP_SUPPLIER_BALANCES.slice(0, 5).map((s) => ({
  name: s.name,
  balanceToman: s.balanceToman,
  pct: Math.round((s.balanceToman / AP_FOOTER.balanceToman) * 100),
}));

export type ApPayableItem = {
  docNo: string;
  supplier: string;
  issueDate: string;
  dueDate: string;
  amountToman: number;
  openToman: number;
  delayDays: number;
};

export const AP_OPEN_ITEMS: ApPayableItem[] = [
  { docNo: 'PO-00011-INV', supplier: 'بازرگانی گندم طلایی', issueDate: '۱۴۰۴/۱۰/۰۱', dueDate: '۱۴۰۴/۱۲/۰۱', amountToman: 142_440_110, openToman: 142_440_110, delayDays: 213 },
  { docNo: 'PO-00009-INV', supplier: 'شرکت بازرگانی آریا', issueDate: '۱۴۰۵/۰۲/۱۵', dueDate: '۱۴۰۵/۰۴/۱۵', amountToman: 97_406_760, openToman: 97_406_760, delayDays: 185 },
];

export type ApPayment = {
  no: string;
  date: string;
  supplier: string;
  method: string;
  amountToman: number;
  status: string;
};

export const AP_PAYMENTS: ApPayment[] = [
  { no: 'PAY-4421', date: '۱۴۰۵/۰۸/۱۶', supplier: 'شرکت بازرگانی آریا', method: 'حواله', amountToman: 97_406_760, status: 'ثبت قطعی' },
  { no: 'PAY-4410', date: '۱۴۰۵/۰۸/۱۴', supplier: 'پخش سراسری لاله کرمان', method: 'چک', amountToman: 57_670_810, status: 'ثبت قطعی' },
];
