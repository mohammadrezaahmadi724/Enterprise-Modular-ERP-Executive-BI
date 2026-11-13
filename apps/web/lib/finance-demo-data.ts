/** دادهٔ نمایشی مالی — ایران / تومان — تا اتصال projection */
export type DemoJournalRow = {
  id: string;
  number: string;
  date: string;
  description: string;
  debit: string;
  credit: string;
  status: 'ثبت قطعی' | 'پیش‌نویس' | 'ارسال‌شده';
  lines: Array<{ account: string; accountName: string; desc: string; debit: string; credit: string }>;
};

export const DEMO_JOURNALS: DemoJournalRow[] = [
  {
    id: 'b4b45fd6-db69-43ee-8313-ed780f4139f0',
    number: '2455',
    date: '۱۴۰۵/۰۸/۲۰',
    description: 'سرویس لیفتراک و تعمیرات انبار — 1405/08',
    debit: '۱۳٬۵۰۰٬۰۰۰',
    credit: '۱۳٬۵۰۰٬۰۰۰',
    status: 'ثبت قطعی',
    lines: [
      { account: '5107', accountName: 'تعمیرات و نگهداری', desc: 'لیفتراک و انبار', debit: '۱۳٬۵۰۰٬۰۰۰', credit: '۰' },
      { account: '1101', accountName: 'بانک / صندوق', desc: 'پرداخت', debit: '۰', credit: '۱۳٬۵۰۰٬۰۰۰' },
    ],
  },
  {
    id: '1a7f9931-1a04-42a5-802d-5463575c276a',
    number: '2312',
    date: '۱۴۰۵/۰۸/۱۷',
    description: 'پرداخت به پخش سراسری لاله کرمان بابت PO-00255',
    debit: '۵۷٬۶۷۰٬۸۱۰',
    credit: '۵۷٬۶۷۰٬۸۱۰',
    status: 'ثبت قطعی',
    lines: [
      { account: '2102', accountName: 'حساب‌های پرداختنی', desc: 'تسویه تأمین‌کننده', debit: '۵۷٬۶۷۰٬۸۱۰', credit: '۰' },
      { account: '1101', accountName: 'بانک ملی', desc: 'حواله', debit: '۰', credit: '۵۷٬۶۷۰٬۸۱۰' },
    ],
  },
  {
    id: '0c54226e-65a6-4560-a882-11f82095f2c7',
    number: '2245',
    date: '۱۴۰۵/۰۸/۱۶',
    description: 'وصول مطالبات SO-0445 از سوپرمارکت فدک تبریز',
    debit: '۱۱۸٬۷۱۴٬۰۸۰',
    credit: '۱۱۸٬۷۱۴٬۰۸۰',
    status: 'ثبت قطعی',
    lines: [
      { account: '1101', accountName: 'بانک', desc: 'واریز', debit: '۱۱۸٬۷۱۴٬۰۸۰', credit: '۰' },
      { account: '1204', accountName: 'دریافتنی تجاری', desc: 'وصول', debit: '۰', credit: '۱۱۸٬۷۱۴٬۰۸۰' },
    ],
  },
];

export const DEMO_COA = [
  { code: '1', name: 'دارایی‌ها', level: 1 },
  { code: '11', name: 'دارایی‌های جاری', level: 2 },
  { code: '1101', name: 'بانک و صندوق', level: 3 },
  { code: '1204', name: 'حساب‌های دریافتنی', level: 3 },
  { code: '2', name: 'بدهی‌ها', level: 1 },
  { code: '2102', name: 'حساب‌های پرداختنی', level: 3 },
  { code: '5', name: 'هزینه‌ها', level: 1 },
  { code: '5107', name: 'تعمیرات و نگهداری', level: 3 },
] as const;

export const DEMO_TREASURY_ACCOUNTS = [
  { name: 'بانک ملی — حساب جاری', balance: '‎−۳٬۴۹۵٬۰۳۳٬۷۵۹', active: true },
  { name: 'صندوق مرکزی شرکت', balance: '۴۹۱٬۰۹۳٬۲۸۷', active: true },
  { name: 'چک‌های ارسالی برای وصول', balance: 'فعال', active: true },
  { name: 'صندوق چک‌های دریافتی', balance: 'فعال', active: true },
] as const;
