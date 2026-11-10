/** کاتالوگ ماژول‌های ERP — مرجع مشترک Admin، API و Marketing */
export const PRICE_CATALOG_SETTING_KEY = 'price_catalog_v1';
export const PRICE_CATALOG_VERSION = 3;

export type ErpModuleCode =
  | 'finance'
  | 'sales'
  | 'hr'
  | 'inventory'
  | 'manufacturing'
  | 'distribution'
  | 'retail'
  | 'bi-risk'
  | 'ai-messaging';

export type ModuleCatalogEntry = {
  code: ErpModuleCode;
  nameFa: string;
  subtitle: string;
  color: string;
  listPriceIrr: number;
  active: boolean;
};

export const DEFAULT_ERP_MODULE_CATALOG: ModuleCatalogEntry[] = [
  {
    code: 'finance',
    nameFa: 'مالی',
    subtitle: 'خزانه، GL و گزارش مالی',
    color: '#22C55E',
    listPriceIrr: 850_000_000,
    active: true,
  },
  {
    code: 'sales',
    nameFa: 'فروش',
    subtitle: 'CRM، سفارش و قرارداد',
    color: '#0EA5E9',
    listPriceIrr: 620_000_000,
    active: true,
  },
  {
    code: 'hr',
    nameFa: 'منابع انسانی',
    subtitle: 'پرسنل، حقوق و حضور',
    color: '#8B5CF6',
    listPriceIrr: 480_000_000,
    active: true,
  },
  {
    code: 'inventory',
    nameFa: 'انبار و تدارکات',
    subtitle: 'خرید، انبار و موجودی',
    color: '#F59E0B',
    listPriceIrr: 720_000_000,
    active: true,
  },
  {
    code: 'manufacturing',
    nameFa: 'تولید',
    subtitle: 'BOM، دستور کار و کیفیت',
    color: '#84CC16',
    listPriceIrr: 980_000_000,
    active: true,
  },
  {
    code: 'distribution',
    nameFa: 'توزیع',
    subtitle: 'پخش، مسیر و ویزیتور',
    color: '#F97316',
    listPriceIrr: 540_000_000,
    active: true,
  },
  {
    code: 'retail',
    nameFa: 'خرده‌فروشی',
    subtitle: 'POS و فروشگاه',
    color: '#EC4899',
    listPriceIrr: 560_000_000,
    active: true,
  },
  {
    code: 'bi-risk',
    nameFa: 'BI و ریسک',
    subtitle: 'داشبورد و رادار ریسک',
    color: '#38BDF8',
    listPriceIrr: 390_000_000,
    active: true,
  },
  {
    code: 'ai-messaging',
    nameFa: 'AI و پیام',
    subtitle: 'ساختار یار و کانال‌های پیام',
    color: '#14B8A6',
    listPriceIrr: 320_000_000,
    active: true,
  },
];

export const CORE_PLATFORM_FEE_IRR = 450_000_000;

export type PlanModulePricing = {
  includedModules: ErpModuleCode[];
  modulePrices: Partial<Record<ErpModuleCode, number>>;
};

export function mergeCatalogWithOverrides(
  overrides: Partial<Record<ErpModuleCode, Partial<ModuleCatalogEntry>>> | undefined,
): ModuleCatalogEntry[] {
  return DEFAULT_ERP_MODULE_CATALOG.map((base) => {
    const patch = overrides?.[base.code];
    if (!patch) return { ...base };
    return { ...base, ...patch, code: base.code };
  });
}
