export type MasterStatus = 'active' | 'inactive';
export type MasterStatusFilter = 'all' | MasterStatus;
export type RowDensity = 'compact' | 'normal' | 'comfortable';

export const MASTER_DATA_BASE = '/projects/settings/master-data';

export type MasterDataSection = {
  id: string;
  href: string;
  label: string;
  countLabel: string;
  description: string;
};

export const MASTER_DATA_SECTIONS: MasterDataSection[] = [
  {
    id: 'parties',
    href: `${MASTER_DATA_BASE}/parties`,
    label: 'طرف‌حساب‌ها',
    countLabel: '۲۰۰+',
    description: 'مشتری، تأمین‌کننده و سایر طرف‌های حساب',
  },
  {
    id: 'items',
    href: `${MASTER_DATA_BASE}/items`,
    label: 'کالاها',
    countLabel: '۱۸۳',
    description: 'کد کالا، واحد پیش‌فرض و گروه‌بندی',
  },
  {
    id: 'units',
    href: `${MASTER_DATA_BASE}/units`,
    label: 'واحدهای سنجش',
    countLabel: '۱۴',
    description: 'واحدها و ضریب تبدیل',
  },
  {
    id: 'taxes',
    href: `${MASTER_DATA_BASE}/taxes`,
    label: 'مالیات‌ها',
    countLabel: '۲',
    description: 'نرخ‌های مالیات و عوارض',
  },
  {
    id: 'warehouses',
    href: `${MASTER_DATA_BASE}/warehouses`,
    label: 'انبارها',
    countLabel: '۱۲',
    description: 'انبارها و محل‌های نگهداری',
  },
  {
    id: 'locations',
    href: `${MASTER_DATA_BASE}/locations`,
    label: 'مکان‌های انبار',
    countLabel: '۱۶',
    description: 'مکان‌های نگهداری کالا درون انبارها',
  },
  {
    id: 'cost-centers',
    href: `${MASTER_DATA_BASE}/cost-centers`,
    label: 'مراکز هزینه',
    countLabel: '۴',
    description: 'مراکز هزینه برای درخواست خرید و گزارش هزینه',
  },
  {
    id: 'price-lists',
    href: `${MASTER_DATA_BASE}/price-lists`,
    label: 'لیست‌های قیمت',
    countLabel: '۲',
    description: 'قیمت فروش هر کالا به تفکیک واحد، با بازهٔ اعتبار',
  },
];

export type MasterPartyRow = {
  code: string;
  name: string;
  partyType: string;
  role: string;
  nationalId: string;
  economicCode: string;
  mobile: string;
  phone: string;
  email: string;
  postalCode: string;
  address: string;
  status: MasterStatus;
};

export const MASTER_PARTIES_META = 50;

export const MASTER_PARTIES: MasterPartyRow[] = [
  {
    code: '1',
    name: '2',
    partyType: 'person',
    role: 'مشتری',
    nationalId: '—',
    economicCode: '—',
    mobile: '—',
    phone: '—',
    email: '—',
    postalCode: '—',
    address: '—',
    status: 'active',
  },
  {
    code: 'BOTH-3001',
    name: 'کارخانه فولاد سپاهان',
    partyType: 'organization',
    role: 'مشتری، تأمین‌کننده',
    nationalId: '۱۰۲۲۰۳۶۶۸۵۵',
    economicCode: '۴۱۲۰۵۵۶۸۵۵',
    mobile: '۰۹۱۳۱۲۳۴۵۶۷',
    phone: '۰۳۱۳۶۶۶۷۷۸۸',
    email: 'info@sepahan-steel.ir',
    postalCode: '۸۱۵۷۳۱۴۴۸۴',
    address: 'اصفهان، شهرک صنعتی محمودآباد',
    status: 'inactive',
  },
  {
    code: 'CUS-1001',
    name: 'صنایع غذایی پارس',
    partyType: 'organization',
    role: 'مشتری',
    nationalId: '۱۰۱۰۳۸۶۴۵۱۲',
    economicCode: '۴۱۱۳۷۴۶۳۱۲',
    mobile: '۰۹۱۲۱۱۱۲۲۳۳',
    phone: '۰۲۱۴۴۸۸۷۷۶۶',
    email: 'sales@parsfood.ir',
    postalCode: '۱۴۵۹۶۴۴۱۱۲',
    address: 'تهران، شهرک صنعتی قدیم',
    status: 'active',
  },
  {
    code: 'CUS-1002',
    name: 'رستوران‌های زنجیره‌ای شیراز',
    partyType: 'organization',
    role: 'مشتری',
    nationalId: '۱۰۸۶۱۵۴۷۷۳۲',
    economicCode: '—',
    mobile: '۰۹۱۷۷۸۸۹۹۰۰',
    phone: '۰۷۱۳۲۴۴۵۵۶۶',
    email: 'contact@shiraz-rest.ir',
    postalCode: '۷۱۹۶۶۳۴۵۶۷',
    address: 'شیراز، بلوار معالی‌آباد',
    status: 'active',
  },
  {
    code: 'SUP-2001',
    name: 'بازرگانی مواد اولیه البرز',
    partyType: 'organization',
    role: 'تأمین‌کننده',
    nationalId: '۱۰۳۸۰۵۶۷۸۹۰',
    economicCode: '۴۰۳۸۰۵۶۷۸۹',
    mobile: '۰۹۳۵۱۲۳۴۵۶۷',
    phone: '۰۲۶۳۴۵۶۷۸۹۰',
    email: 'procurement@alborz-trade.ir',
    postalCode: '۳۱۶۵۶۳۴۱۲۳',
    address: 'کرج، فاز ۲ شهرک صنعتی',
    status: 'active',
  },
];

export type MasterCodeNameRow = { code: string; name: string; status: MasterStatus };

export const MASTER_ITEMS_META = 50;
export const MASTER_ITEMS: MasterCodeNameRow[] = [
  { code: 'AP-DET-01', name: 'پودر لباسشویی ماشینی ۵۰۰ گرمی', status: 'active' },
  { code: 'AP-DET-02', name: 'مایع ظرفشویی ۷۵۰ گرمی', status: 'active' },
  { code: 'AP-DET-03', name: 'شامپو ۴۰۰ میلی‌لیتری', status: 'active' },
  { code: 'AP-DET-04', name: 'صابون حمام ۱۲ عددی', status: 'active' },
  { code: 'RM-Steel-01', name: 'ورق فولاد ۲ میلی‌متری', status: 'active' },
];

export const MASTER_UNITS_META = 14;
export const MASTER_UNITS: MasterCodeNameRow[] = [
  { code: 'BOX', name: 'جعبه', status: 'active' },
  { code: 'BUNDLE', name: 'بندل', status: 'active' },
  { code: 'CTN', name: 'کارتن', status: 'active' },
  { code: 'KG', name: 'کیلوگرم', status: 'active' },
  { code: 'L', name: 'لیتر', status: 'active' },
  { code: 'M', name: 'متر', status: 'active' },
  { code: 'PCS', name: 'عدد', status: 'active' },
  { code: 'PK', name: 'بسته', status: 'active' },
];

export type MasterTaxRow = { code: string; name: string; rate: number; status: MasterStatus };

export const MASTER_TAXES_META = 2;
export const MASTER_TAXES: MasterTaxRow[] = [
  { code: 'VAT10', name: 'ارزش افزوده ۱۰ درصد', rate: 10, status: 'active' },
  { code: 'VAT9', name: 'ارزش افزوده ۹ درصد', rate: 9, status: 'active' },
];

export const MASTER_WAREHOUSES_META = 12;
export const MASTER_WAREHOUSES: MasterCodeNameRow[] = [
  { code: 'IND36-WH-01', name: 'انبار مرکزی بازرگانی صنعتی', status: 'active' },
  { code: 'WH-DEMO-01', name: 'انبار دمو تهران', status: 'active' },
  { code: 'WH-ESF', name: 'انبار اصفهان', status: 'active' },
  { code: 'WH-MSH', name: 'انبار مشهد', status: 'active' },
  { code: 'WH-THR', name: 'انبار تهران شمال', status: 'active' },
];

export const MASTER_LOCATIONS_META = 16;
export const MASTER_LOCATIONS: MasterCodeNameRow[] = [
  { code: 'MAIN', name: 'انبار اصلی', status: 'active' },
  { code: 'A-01', name: 'قفسه A-01', status: 'active' },
  { code: 'B-01', name: 'قفسه B-01', status: 'active' },
  { code: 'C-01', name: 'قفسه C-01', status: 'active' },
  { code: 'PLT-MSH', name: 'پالت اقلام حجیم مشهد', status: 'active' },
];

export const MASTER_COST_CENTERS_META = 4;
export const MASTER_COST_CENTERS: MasterCodeNameRow[] = [
  { code: 'CC-ADMIN', name: 'واحد اداری و مالی', status: 'active' },
  { code: 'CC-OPS', name: 'واحد عملیات', status: 'active' },
  { code: 'CC-PROD', name: 'واحد تولید و بسته‌بندی', status: 'active' },
  { code: 'CC-SALES', name: 'واحد فروش', status: 'active' },
];

export type MasterPriceListRow = {
  code: string;
  name: string;
  fromDate: string;
  toDate: string | null;
  itemCount: number;
  status: MasterStatus;
};

export const MASTER_PRICE_LISTS_META = 2;
export const MASTER_PRICE_LISTS: MasterPriceListRow[] = [
  {
    code: 'PL-DEMO-BPB',
    name: 'فهرست قیمت آهن و مصالح ساختمانی دمو',
    fromDate: '۱۴۰۵/۰۲/۰۶',
    toDate: null,
    itemCount: 48,
    status: 'active',
  },
  {
    code: 'PL-STANDARD',
    name: 'فهرست قیمت استاندارد',
    fromDate: '۱۴۰۵/۰۴/۰۸',
    toDate: null,
    itemCount: 50,
    status: 'active',
  },
];

export function filterByStatus<T extends { status: MasterStatus }>(
  rows: T[],
  status: MasterStatusFilter,
): T[] {
  if (status === 'all') return rows;
  return rows.filter((r) => r.status === status);
}

export function filterBySearch<T>(rows: T[], search: string, keys: (keyof T)[]): T[] {
  const q = search.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((r) => keys.some((k) => String(r[k]).toLowerCase().includes(q)));
}
