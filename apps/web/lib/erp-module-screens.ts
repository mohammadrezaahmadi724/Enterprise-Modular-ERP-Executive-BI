import { findMenuItemByHref, type TenantMenuModule } from '@repo/ui';

export type ErpField = {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'select' | 'date';
  options?: string[];
  required?: boolean;
};

export type ErpScreen = {
  href: string;
  title: string;
  description: string;
  moduleLabel: string;
  fields: ErpField[];
  columns: Array<{ key: string; label: string }>;
  rows: Array<Record<string, string | number>>;
  statusKey?: string;
  kpis?: Array<{ label: string; value: string }>;
};

const STATUS = ['پیش‌نویس', 'در جریان', 'تأییدشده', 'بسته'];

const MODULE_PROFILE: Record<
  string,
  { fields: ErpField[]; columns: Array<{ key: string; label: string }>; statusKey: string }
> = {
  finance: {
    statusKey: 'status',
    fields: [
      { key: 'code', label: 'کد سند', required: true },
      { key: 'title', label: 'شرح', required: true },
      { key: 'amount', label: 'مبلغ (ریال)', type: 'number' },
      { key: 'date', label: 'تاریخ' },
      { key: 'status', label: 'وضعیت', type: 'select', options: STATUS },
    ],
    columns: [
      { key: 'code', label: 'کد' },
      { key: 'title', label: 'شرح' },
      { key: 'amount', label: 'مبلغ' },
      { key: 'date', label: 'تاریخ' },
      { key: 'status', label: 'وضعیت' },
    ],
  },
  sales: {
    statusKey: 'status',
    fields: [
      { key: 'code', label: 'کد', required: true },
      { key: 'party', label: 'مشتری / سرنخ', required: true },
      { key: 'amount', label: 'مبلغ', type: 'number' },
      { key: 'owner', label: 'مسئول' },
      { key: 'status', label: 'مرحله', type: 'select', options: ['سرنخ', 'پیش‌فاکتور', 'سفارش', 'فاکتور', 'بسته'] },
    ],
    columns: [
      { key: 'code', label: 'کد' },
      { key: 'party', label: 'طرف حساب' },
      { key: 'amount', label: 'مبلغ' },
      { key: 'owner', label: 'مسئول' },
      { key: 'status', label: 'مرحله' },
    ],
  },
  hr: {
    statusKey: 'status',
    fields: [
      { key: 'code', label: 'کد', required: true },
      { key: 'person', label: 'نام پرسنل', required: true },
      { key: 'unit', label: 'واحد' },
      { key: 'metric', label: 'شاخص' },
      { key: 'status', label: 'وضعیت', type: 'select', options: ['فعال', 'در انتظار', 'بسته'] },
    ],
    columns: [
      { key: 'code', label: 'کد' },
      { key: 'person', label: 'پرسنل' },
      { key: 'unit', label: 'واحد' },
      { key: 'metric', label: 'شاخص' },
      { key: 'status', label: 'وضعیت' },
    ],
  },
  inventory: {
    statusKey: 'status',
    fields: [
      { key: 'code', label: 'کد', required: true },
      { key: 'item', label: 'قلم / تأمین‌کننده', required: true },
      { key: 'qty', label: 'تعداد', type: 'number' },
      { key: 'warehouse', label: 'انبار' },
      { key: 'status', label: 'وضعیت', type: 'select', options: STATUS },
    ],
    columns: [
      { key: 'code', label: 'کد' },
      { key: 'item', label: 'قلم' },
      { key: 'qty', label: 'تعداد' },
      { key: 'warehouse', label: 'انبار' },
      { key: 'status', label: 'وضعیت' },
    ],
  },
  manufacturing: {
    statusKey: 'status',
    fields: [
      { key: 'code', label: 'کد', required: true },
      { key: 'product', label: 'محصول / خط', required: true },
      { key: 'qty', label: 'تعداد', type: 'number' },
      { key: 'workCenter', label: 'ایستگاه' },
      { key: 'status', label: 'وضعیت', type: 'select', options: ['برنامه‌ریزی', 'در حال تولید', 'QC', 'تمام'] },
    ],
    columns: [
      { key: 'code', label: 'کد' },
      { key: 'product', label: 'محصول' },
      { key: 'qty', label: 'تعداد' },
      { key: 'workCenter', label: 'ایستگاه' },
      { key: 'status', label: 'وضعیت' },
    ],
  },
  distribution: {
    statusKey: 'status',
    fields: [
      { key: 'code', label: 'کد', required: true },
      { key: 'route', label: 'مسیر / مشتری', required: true },
      { key: 'qty', label: 'تعداد', type: 'number' },
      { key: 'vehicle', label: 'خودرو' },
      { key: 'status', label: 'وضعیت', type: 'select', options: ['تخصیص', 'در مسیر', 'تحویل', 'تسویه'] },
    ],
    columns: [
      { key: 'code', label: 'کد' },
      { key: 'route', label: 'مسیر' },
      { key: 'qty', label: 'تعداد' },
      { key: 'vehicle', label: 'خودرو' },
      { key: 'status', label: 'وضعیت' },
    ],
  },
  retail: {
    statusKey: 'status',
    fields: [
      { key: 'code', label: 'کد', required: true },
      { key: 'store', label: 'شعبه', required: true },
      { key: 'amount', label: 'مبلغ', type: 'number' },
      { key: 'channel', label: 'کانال' },
      { key: 'status', label: 'وضعیت', type: 'select', options: ['باز', 'بسته', 'همگام'] },
    ],
    columns: [
      { key: 'code', label: 'کد' },
      { key: 'store', label: 'شعبه' },
      { key: 'amount', label: 'مبلغ' },
      { key: 'channel', label: 'کانال' },
      { key: 'status', label: 'وضعیت' },
    ],
  },
  bi: {
    statusKey: 'status',
    fields: [
      { key: 'code', label: 'شناسه', required: true },
      { key: 'metric', label: 'شاخص', required: true },
      { key: 'value', label: 'مقدار' },
      { key: 'source', label: 'منبع projection' },
      { key: 'status', label: 'وضعیت', type: 'select', options: ['پایدار', 'هشدار', 'بحرانی'] },
    ],
    columns: [
      { key: 'code', label: 'شناسه' },
      { key: 'metric', label: 'شاخص' },
      { key: 'value', label: 'مقدار' },
      { key: 'source', label: 'منبع' },
      { key: 'status', label: 'وضعیت' },
    ],
  },
  ai: {
    statusKey: 'status',
    fields: [
      { key: 'code', label: 'کد', required: true },
      { key: 'title', label: 'عنوان', required: true },
      { key: 'channel', label: 'کانال' },
      { key: 'owner', label: 'مسئول' },
      { key: 'status', label: 'وضعیت', type: 'select', options: ['فعال', 'آرشیو'] },
    ],
    columns: [
      { key: 'code', label: 'کد' },
      { key: 'title', label: 'عنوان' },
      { key: 'channel', label: 'کانال' },
      { key: 'owner', label: 'مسئول' },
      { key: 'status', label: 'وضعیت' },
    ],
  },
};

function slugCode(href: string, i: number) {
  const seg = href.split('/').filter(Boolean).pop() ?? 'row';
  const prefix = seg.slice(0, 3).toUpperCase();
  return `${prefix}-${1400 + i}`;
}

function buildRows(href: string, title: string, profile: (typeof MODULE_PROFILE)['finance'], module: TenantMenuModule) {
  const samples = [
    { a: '۱۲٫۴M', b: '۱۴۰۴/۰۸/۱۰', c: 'تأییدشده' },
    { a: '۸٫۱M', b: '۱۴۰۴/۰۸/۱۱', c: 'در جریان' },
    { a: '۳٫۲M', b: '۱۴۰۴/۰۸/۰۸', c: 'پیش‌نویس' },
    { a: '۱۹٫۰M', b: '۱۴۰۴/۰۸/۰۹', c: 'تأییدشده' },
  ];
  return samples.map((s, i) => {
    const code = slugCode(href, i);
    const base: Record<string, string | number> = { id: `${href}-${i}`, code, status: s.c };
    if (module.id === 'finance') {
      return { ...base, title: `${title} · ${i + 1}`, amount: s.a, date: s.b };
    }
    if (module.id === 'sales') {
      return { ...base, party: `مشتری نمونه ${i + 1}`, amount: s.a, owner: 'تیم فروش ۱' };
    }
    if (module.id === 'hr') {
      return { ...base, person: `کارمند ${i + 1}`, unit: 'عملیات', metric: 'کارکرد ۹۶٪' };
    }
    if (module.id === 'inventory') {
      return { ...base, item: `قلم ${i + 1}`, qty: 120 + i * 15, warehouse: 'انبار مرکزی' };
    }
    if (module.id === 'manufacturing') {
      return { ...base, product: `محصول ${i + 1}`, qty: 50 + i * 10, workCenter: 'خط A' };
    }
    if (module.id === 'distribution') {
      return { ...base, route: `منطقه ${i + 1}`, qty: 30 + i, vehicle: '۱۲ب۳۴۵-۶۷' };
    }
    if (module.id === 'retail') {
      return { ...base, store: `شعبه ${i + 1}`, amount: s.a, channel: 'حضوری' };
    }
    if (module.id === 'bi') {
      return { ...base, metric: title, value: s.a, source: 'metric_snapshots' };
    }
  return { ...base, title: `${title} ${i + 1}`, channel: 'درون‌سازمانی', owner: 'ادمین' };
  });
}

export function getModuleScreen(href: string): ErpScreen {
  const found = findMenuItemByHref(href);
  const module = found?.module ?? { id: 'finance', label: 'عملیاتی' } as TenantMenuModule;
  const title = found?.item.label ?? 'بخش عملیاتی';
  const description = found?.item.subtitle ?? module.label;
  const profile = MODULE_PROFILE[module.id] ?? MODULE_PROFILE.finance;

  const rows = buildRows(href, title, profile, module as TenantMenuModule);

  return {
    href,
    title,
    description,
    moduleLabel: module.label,
    fields: profile.fields,
    columns: profile.columns,
    statusKey: profile.statusKey,
    rows,
    kpis: [
      { label: 'رکورد باز', value: String(rows.filter((r) => r.status !== 'بسته').length) },
      { label: 'ماه جاری', value: '۱۴۰۴/۰۸' },
      { label: 'ماژول', value: module.label },
    ],
  };
}
