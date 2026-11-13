/** دادهٔ نمایشی دریافتنی‌ها — مطابق سن مطالبات تا ۱۴۰۵/۰۸/۲۰ */

export const AR_AS_OF_LABEL = '۱۴۰۵/۰۸/۲۰';
export const AR_AS_OF_JALALI = '۲۰ آبان ۱۴۰۵';

export type ArAgingBucket = {
  key: string;
  label: string;
  amountToman: number;
  pct: number;
  itemCount: number;
  colorClass: string;
  barFlex: number;
};

export const AR_AGING_TOTAL = {
  amountToman: 1_727_182_224,
  itemCount: 93,
};

export const AR_AGING_BUCKETS: ArAgingBucket[] = [
  { key: 'current', label: 'جاری', amountToman: 250_512_956, pct: 14.5, itemCount: 21, colorClass: 'bg-emerald-500', barFlex: 145 },
  { key: 'd1_30', label: '۱ تا ۳۰ روز', amountToman: 367_057_769, pct: 21.2, itemCount: 9, colorClass: 'bg-sky-500', barFlex: 212 },
  { key: 'd31_60', label: '۳۱ تا ۶۰ روز', amountToman: 372_256_958, pct: 21.5, itemCount: 14, colorClass: 'bg-amber-500', barFlex: 215 },
  { key: 'd61_90', label: '۶۱ تا ۹۰ روز', amountToman: 95_289_322, pct: 5.5, itemCount: 6, colorClass: 'bg-orange-600', barFlex: 55 },
  { key: 'over90', label: 'بیش از ۹۰ روز', amountToman: 642_065_219, pct: 37.1, itemCount: 43, colorClass: 'bg-red-500', barFlex: 371 },
];

export type ArCustomerBalance = {
  id: string;
  name: string;
  account: string;
  balanceToman: number;
  overdueToman: number | null;
  maxDelayDays: number | null;
  status: 'جاری' | 'سررسید گذشته' | 'بیش از ۹۰ روز';
  openItemCount: number;
};

export const AR_CUSTOMER_BALANCES: ArCustomerBalance[] = [
  { id: '3f3e4ebe', name: 'صنایع غذایی پارس', account: '1102', balanceToman: 363_470_361, overdueToman: 330_090_092, maxDelayDays: 160, status: 'بیش از ۹۰ روز', openItemCount: 13 },
  { id: 'fa6ffac3', name: 'رستوران‌های زنجیره‌ای شیراز', account: '1102', balanceToman: 240_287_061, overdueToman: 234_450_111, maxDelayDays: 96, status: 'بیش از ۹۰ روز', openItemCount: 6 },
  { id: '6af89eed', name: 'گروه هتل‌های بین‌المللی مشهد', account: '1102', balanceToman: 112_794_504, overdueToman: 112_794_504, maxDelayDays: 79, status: 'سررسید گذشته', openItemCount: 2 },
  { id: '07757680', name: 'لیلا موسوی (خریدار عمده)', account: '1102', balanceToman: 75_707_040, overdueToman: 75_707_040, maxDelayDays: 30, status: 'سررسید گذشته', openItemCount: 1 },
  { id: '694c9ed9', name: 'بازرگانی طلوع اهواز', account: '1102', balanceToman: 60_675_068, overdueToman: 33_292_088, maxDelayDays: 129, status: 'بیش از ۹۰ روز', openItemCount: 4 },
  { id: '3a763960', name: 'رستوران طلوع اصفهان', account: '1102', balanceToman: 58_490_326, overdueToman: 7_428_731, maxDelayDays: 111, status: 'بیش از ۹۰ روز', openItemCount: 3 },
  { id: '5a02420d', name: 'رستوران البرز کرج', account: '1102', balanceToman: 51_635_044, overdueToman: 51_635_044, maxDelayDays: 193, status: 'بیش از ۹۰ روز', openItemCount: 2 },
  { id: '92a0fea0', name: 'سوپرمارکت رویال تهران', account: '1102', balanceToman: 50_628_429, overdueToman: 50_628_429, maxDelayDays: 187, status: 'بیش از ۹۰ روز', openItemCount: 3 },
  { id: '1e263456', name: 'تعاونی مصرف دنا اهواز', account: '1102', balanceToman: 46_610_580, overdueToman: 40_253_700, maxDelayDays: 141, status: 'بیش از ۹۰ روز', openItemCount: 3 },
  { id: 'e3abd34e', name: 'بازرگانی جهان همدان', account: '1102', balanceToman: 45_040_653, overdueToman: null, maxDelayDays: null, status: 'جاری', openItemCount: 2 },
  { id: 'efa0dad9', name: 'سوپرمارکت هامون یزد', account: '1102', balanceToman: 42_827_735, overdueToman: 40_198_110, maxDelayDays: 161, status: 'بیش از ۹۰ روز', openItemCount: 3 },
  { id: '29a59f0e', name: 'فروشگاه‌های زنجیره‌ای افق طلایی', account: '1102', balanceToman: 42_000_000, overdueToman: 42_000_000, maxDelayDays: 112, status: 'بیش از ۹۰ روز', openItemCount: 1 },
  { id: '911fb98d', name: 'شرکت پخش شبنم رشت', account: '1102', balanceToman: 41_226_416, overdueToman: 41_226_416, maxDelayDays: 230, status: 'بیش از ۹۰ روز', openItemCount: 4 },
  { id: '0543c3c2', name: 'رستوران بهار رشت', account: '1102', balanceToman: 37_147_418, overdueToman: 37_147_418, maxDelayDays: 199, status: 'بیش از ۹۰ روز', openItemCount: 2 },
  { id: 'f67df19e', name: 'کترینگ ساحل کرمان', account: '1102', balanceToman: 35_621_309, overdueToman: 9_592_000, maxDelayDays: 158, status: 'بیش از ۹۰ روز', openItemCount: 3 },
  { id: '3bbe1eba', name: 'فروشگاه زنجیره‌ای ارغوان تبریز', account: '1102', balanceToman: 35_192_939, overdueToman: 26_644_287, maxDelayDays: 128, status: 'بیش از ۹۰ روز', openItemCount: 4 },
  { id: '1723be04', name: 'سوپرمارکت پارسیان یزد', account: '1102', balanceToman: 32_246_778, overdueToman: 32_246_778, maxDelayDays: 196, status: 'بیش از ۹۰ روز', openItemCount: 1 },
  { id: '9dbe34d0', name: 'فروشگاه زنجیره‌ای چکاد تبریز', account: '1102', balanceToman: 29_273_912, overdueToman: 14_528_610, maxDelayDays: 39, status: 'سررسید گذشته', openItemCount: 3 },
  { id: '851d243e', name: 'فروشگاه زنجیره‌ای لاله تهران', account: '1102', balanceToman: 29_247_752, overdueToman: 29_247_752, maxDelayDays: 145, status: 'بیش از ۹۰ روز', openItemCount: 2 },
  { id: '018a9eaa', name: 'کترینگ ثمین قم', account: '1102', balanceToman: 28_976_124, overdueToman: 28_976_124, maxDelayDays: 60, status: 'سررسید گذشته', openItemCount: 2 },
  { id: '638738e6', name: 'هایپرمارکت ستاره کویر', account: '1102', balanceToman: 27_766_932, overdueToman: 27_766_932, maxDelayDays: 192, status: 'بیش از ۹۰ روز', openItemCount: 4 },
  { id: '1370d676', name: 'سوپرمارکت ثمین تهران', account: '1102', balanceToman: 27_043_118, overdueToman: 27_043_118, maxDelayDays: 230, status: 'بیش از ۹۰ روز', openItemCount: 1 },
  { id: '57381ac3', name: 'کترینگ کوثر شیراز', account: '1102', balanceToman: 26_667_667, overdueToman: 26_667_667, maxDelayDays: 142, status: 'بیش از ۹۰ روز', openItemCount: 3 },
  { id: '0a040d8f', name: 'فروشگاه زنجیره‌ای آفتاب تهران', account: '1102', balanceToman: 24_287_652, overdueToman: 24_287_652, maxDelayDays: 159, status: 'بیش از ۹۰ روز', openItemCount: 1 },
  { id: 'b13271cb', name: 'تعاونی مصرف بهار مشهد', account: '1102', balanceToman: 22_385_875, overdueToman: 22_385_875, maxDelayDays: 168, status: 'بیش از ۹۰ روز', openItemCount: 2 },
  { id: 'e1152c20', name: 'تعاونی مصرف تابان اهواز', account: '1102', balanceToman: 19_410_720, overdueToman: 11_399_220, maxDelayDays: 106, status: 'بیش از ۹۰ روز', openItemCount: 2 },
  { id: '05ff7087', name: 'کترینگ چکاد کرمان', account: '1102', balanceToman: 14_039_963, overdueToman: 5_759_015, maxDelayDays: 105, status: 'بیش از ۹۰ روز', openItemCount: 2 },
  { id: '67cf5bcf', name: 'تعاونی مصرف وحدت مشهد', account: '1102', balanceToman: 13_903_168, overdueToman: 13_903_168, maxDelayDays: 117, status: 'بیش از ۹۰ روز', openItemCount: 1 },
  { id: '6b21d0a7', name: 'نرگس رضایی (خریدار عمده)', account: '1102', balanceToman: 13_156_300, overdueToman: 13_156_300, maxDelayDays: 230, status: 'بیش از ۹۰ روز', openItemCount: 1 },
  { id: '5b54446d', name: 'هتل فدک کرمان', account: '1102', balanceToman: 12_289_859, overdueToman: 12_289_859, maxDelayDays: 81, status: 'سررسید گذشته', openItemCount: 1 },
  { id: '810e10c7', name: 'بازرگانی البرز همدان', account: '1102', balanceToman: 11_517_158, overdueToman: null, maxDelayDays: null, status: 'جاری', openItemCount: 1 },
  { id: 'e0a32fe0', name: 'فاطمه قاسمی (خریدار عمده)', account: '1102', balanceToman: 11_446_090, overdueToman: 11_446_090, maxDelayDays: 9, status: 'سررسید گذشته', openItemCount: 1 },
  { id: '4e01f0e3', name: 'هتل ارغوان کرمان', account: '1102', balanceToman: 11_108_953, overdueToman: 11_108_953, maxDelayDays: 168, status: 'بیش از ۹۰ روز', openItemCount: 1 },
  { id: 'c2e565e8', name: 'کترینگ صدف شیراز', account: '1102', balanceToman: 10_968_125, overdueToman: 10_968_125, maxDelayDays: 179, status: 'بیش از ۹۰ روز', openItemCount: 1 },
  { id: 'c8cb2477', name: 'فروشگاه زنجیره‌ای نگین تبریز', account: '1102', balanceToman: 9_009_395, overdueToman: 9_009_395, maxDelayDays: 99, status: 'بیش از ۹۰ روز', openItemCount: 1 },
  { id: '32bae8ce', name: 'شرکت پخش قصر رشت', account: '1102', balanceToman: 5_021_085, overdueToman: 5_021_085, maxDelayDays: 7, status: 'سررسید گذشته', openItemCount: 1 },
  { id: '155165be', name: 'بازرگانی شبنم مشهد', account: '1102', balanceToman: 3_266_730, overdueToman: 3_266_730, maxDelayDays: 145, status: 'بیش از ۹۰ روز', openItemCount: 1 },
  { id: '4da310b9', name: 'فروشگاه زنجیره‌ای خلیج یزد', account: '1102', balanceToman: 1_691_135, overdueToman: null, maxDelayDays: null, status: 'جاری', openItemCount: 1 },
  { id: '0c769aa0', name: 'سوپرمارکت ساحل تبریز', account: '1102', balanceToman: 1_415_092, overdueToman: 1_415_092, maxDelayDays: 65, status: 'سررسید گذشته', openItemCount: 1 },
  { id: '966ad60b', name: 'سوپرمارکت کوثر یزد', account: '1102', balanceToman: 941_760, overdueToman: 941_760, maxDelayDays: 148, status: 'بیش از ۹۰ روز', openItemCount: 1 },
  { id: '10cb71cf', name: 'بازرگانی مهتاب همدان', account: '1102', balanceToman: 745_996, overdueToman: 745_996, maxDelayDays: 188, status: 'بیش از ۹۰ روز', openItemCount: 1 },
];

export const AR_FOOTER_TOTALS = {
  customerCount: 41,
  balanceToman: 1_727_182_224,
  overdueToman: 1_476_669_268,
};

export type ArOpenItem = {
  docNo: string;
  customer: string;
  issueDate: string;
  dueDate: string;
  amountToman: number;
  openToman: number;
  delayDays: number;
};

export const AR_OPEN_ITEMS_SAMPLE: ArOpenItem[] = [
  { docNo: 'INV-10442', customer: 'صنایع غذایی پارس', issueDate: '۱۴۰۵/۰۳/۱۲', dueDate: '۱۴۰۵/۰۵/۱۲', amountToman: 85_000_000, openToman: 85_000_000, delayDays: 160 },
  { docNo: 'INV-10501', customer: 'صنایع غذایی پارس', issueDate: '۱۴۰۵/۰۴/۰۱', dueDate: '۱۴۰۵/۰۶/۰۱', amountToman: 120_000_000, openToman: 120_000_000, delayDays: 140 },
  { docNo: 'INV-10688', customer: 'رستوران‌های زنجیره‌ای شیراز', issueDate: '۱۴۰۵/۰۵/۲۰', dueDate: '۱۴۰۵/۰۷/۲۰', amountToman: 240_287_061, openToman: 234_450_111, delayDays: 96 },
];

export type ArReceipt = {
  no: string;
  date: string;
  customer: string;
  method: string;
  amountToman: number;
  status: string;
};

export const AR_RECEIPTS_SAMPLE: ArReceipt[] = [
  { no: 'RCP-8821', date: '۱۴۰۵/۰۸/۱۷', customer: 'سوپرمارکت فدک تبریز', method: 'حواله بانکی', amountToman: 118_714_080, status: 'ثبت قطعی' },
  { no: 'RCP-8810', date: '۱۴۰۵/۰۸/۱۵', customer: 'بازرگانی جهان همدان', method: 'POS', amountToman: 12_000_000, status: 'ثبت قطعی' },
];

export type ArSalesReturn = {
  no: string;
  date: string;
  customer: string;
  refInvoice: string;
  creditToman: number;
  status: string;
};

export const AR_RETURNS_SAMPLE: ArSalesReturn[] = [
  { no: 'CN-1204', date: '۱۴۰۵/۰۸/۱۰', customer: 'فروشگاه زنجیره‌ای افق طلایی', refInvoice: 'INV-9922', creditToman: 8_500_000, status: 'پیش‌نویس' },
];

export function formatToman(n: number): string {
  return new Intl.NumberFormat('fa-IR').format(n);
}

export function formatPct(n: number): string {
  return new Intl.NumberFormat('fa-IR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n);
}
