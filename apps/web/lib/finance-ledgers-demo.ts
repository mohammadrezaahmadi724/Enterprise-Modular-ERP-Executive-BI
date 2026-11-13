export type LedgerBook = {
  code: string;
  type: 'قانونی' | 'مدیریتی';
  titleFa: string;
  series: string;
  vatMoadian: boolean;
  status: 'فعال' | 'غیرفعال';
  isDefault?: boolean;
  journalCountMtd: number;
  lastPostedAt: string | null;
};

export const LEDGER_BOOKS: LedgerBook[] = [
  {
    code: 'STATUTORY',
    type: 'قانونی',
    titleFa: 'دفتر قانونی — حسابداری ایران',
    series: 'MAIN',
    vatMoadian: true,
    status: 'فعال',
    isDefault: true,
    journalCountMtd: 248,
    lastPostedAt: '۱۴۰۵/۰۸/۲۰',
  },
  {
    code: 'MANAGEMENT',
    type: 'مدیریتی',
    titleFa: 'دفتر مدیریتی — گزارش‌های داخلی',
    series: 'MGMT',
    vatMoadian: false,
    status: 'فعال',
    journalCountMtd: 186,
    lastPostedAt: '۱۴۰۵/۰۸/۱۹',
  },
];
