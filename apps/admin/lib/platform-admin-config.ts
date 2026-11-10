import type { AdminResourceConfig } from '../components/admin-resource-crud';

let seed = 0;
const id = () => `row-${++seed}`;

export const ADMIN_RESOURCES: Record<string, AdminResourceConfig> = {
  tenants: {
    title: 'مستأجران',
    description: 'Provisioning، دامنه و صورتحساب — بدون دسترسی Break-Glass به داده in-tenant',
    statusKey: 'status',
    fields: [
      { key: 'name', label: 'نام سازمان', required: true },
      { key: 'slug', label: 'شناسه (slug)', required: true },
      { key: 'plan', label: 'پلن', type: 'select', options: ['Starter', 'Growth', 'Enterprise'] },
      { key: 'seats', label: 'صندلی', type: 'number' },
      { key: 'status', label: 'وضعیت', type: 'select', options: ['فعال', 'آزمایشی', 'معلق'] },
    ],
    columns: [
      { key: 'name', label: 'نام' },
      { key: 'slug', label: 'Slug' },
      { key: 'plan', label: 'پلن' },
      { key: 'seats', label: 'صندلی' },
      { key: 'status', label: 'وضعیت' },
    ],
    rows: [
      { id: id(), name: 'شرکت نمونه', slug: 'demo-company', plan: 'Enterprise', seats: 25, status: 'فعال' },
      { id: id(), name: 'آرمان صنعت', slug: 'arman-industry', plan: 'Growth', seats: 12, status: 'فعال' },
      { id: id(), name: 'پخش البرز', slug: 'alborz-dist', plan: 'Starter', seats: 5, status: 'آزمایشی' },
    ],
  },
  subscriptions: {
    title: 'اشتراک‌ها',
    description: 'تمدید، ارتقا، seat و snapshot پلن',
    statusKey: 'status',
    fields: [
      { key: 'tenant', label: 'مستأجر', required: true },
      { key: 'plan', label: 'پلن', type: 'select', options: ['Starter', 'Growth', 'Enterprise'] },
      { key: 'mrr', label: 'MRR (میلیون)', type: 'number' },
      { key: 'renewAt', label: 'تمدید' },
      { key: 'status', label: 'وضعیت', type: 'select', options: ['فعال', 'در انتظار پرداخت', 'منقضی'] },
    ],
    columns: [
      { key: 'tenant', label: 'مستأجر' },
      { key: 'plan', label: 'پلن' },
      { key: 'mrr', label: 'MRR' },
      { key: 'renewAt', label: 'تمدید' },
      { key: 'status', label: 'وضعیت' },
    ],
    rows: [
      { id: id(), tenant: 'demo-company', plan: 'Enterprise', mrr: 48, renewAt: '۱۴۰۴/۱۲/۰۱', status: 'فعال' },
      { id: id(), tenant: 'arman-industry', plan: 'Growth', mrr: 18, renewAt: '۱۴۰۴/۱۱/۲۸', status: 'فعال' },
    ],
  },
  plans: {
    title: 'پلن‌ها',
    description: 'قیمت‌گذاری ماژولار و نسخه snapshot',
    statusKey: 'status',
    fields: [
      { key: 'code', label: 'کد پلن', required: true },
      { key: 'name', label: 'نام', required: true },
      { key: 'price', label: 'قیمت ماهانه', type: 'number' },
      { key: 'version', label: 'نسخه' },
      { key: 'status', label: 'وضعیت', type: 'select', options: ['منتشرشده', 'پیش‌نویس', 'آرشیو'] },
    ],
    columns: [
      { key: 'code', label: 'کد' },
      { key: 'name', label: 'نام' },
      { key: 'price', label: 'قیمت' },
      { key: 'version', label: 'نسخه' },
      { key: 'status', label: 'وضعیت' },
    ],
    rows: [
      { id: id(), code: 'starter', name: 'استارتر', price: 4_900_000, version: 'v3', status: 'منتشرشده' },
      { id: id(), code: 'growth', name: 'رشد', price: 12_900_000, version: 'v3', status: 'منتشرشده' },
      { id: id(), code: 'enterprise', name: 'سازمانی', price: 0, version: 'v3', status: 'منتشرشده' },
    ],
  },
  billing: {
    title: 'پرداخت‌ها',
    description: 'فاکتور SaaS و وضعیت درگاه',
    statusKey: 'status',
    fields: [
      { key: 'invoice', label: 'شماره فاکتور', required: true },
      { key: 'tenant', label: 'مستأجر', required: true },
      { key: 'amount', label: 'مبلغ', type: 'number' },
      { key: 'paidAt', label: 'تاریخ پرداخت' },
      { key: 'status', label: 'وضعیت', type: 'select', options: ['پرداخت‌شده', 'در انتظار', 'ناموفق'] },
    ],
    columns: [
      { key: 'invoice', label: 'فاکتور' },
      { key: 'tenant', label: 'مستأجر' },
      { key: 'amount', label: 'مبلغ (ریال)' },
      { key: 'paidAt', label: 'پرداخت' },
      { key: 'status', label: 'وضعیت' },
    ],
    rows: [
      { id: id(), invoice: 'INV-1042', tenant: 'demo-company', amount: 48_000_000, paidAt: '۱۴۰۴/۰۸/۱۲', status: 'پرداخت‌شده' },
      { id: id(), invoice: 'INV-1043', tenant: 'alborz-dist', amount: 4_900_000, paidAt: '—', status: 'در انتظار' },
    ],
  },
  tickets: {
    title: 'رزرو جلسه و تیکت‌ها',
    description: 'درخواست‌های برآورد و رزرو جلسه از مارکتینگ (category: meeting_request) در اینجا نمایش داده می‌شوند',
    statusKey: 'status',
    fields: [
      { key: 'code', label: 'کد', required: true },
      { key: 'tenant', label: 'مستأجر', required: true },
      { key: 'subject', label: 'موضوع', required: true },
      { key: 'priority', label: 'اولویت', type: 'select', options: ['عادی', 'بالا', 'بحرانی'] },
      { key: 'status', label: 'وضعیت', type: 'select', options: ['باز', 'در حال بررسی', 'بسته'] },
    ],
    columns: [
      { key: 'code', label: 'کد' },
      { key: 'tenant', label: 'مستأجر' },
      { key: 'subject', label: 'موضوع' },
      { key: 'category', label: 'دسته' },
      { key: 'slot', label: 'زمان جلسه' },
      { key: 'priority', label: 'اولویت' },
      { key: 'status', label: 'وضعیت' },
    ],
    rows: [
      { id: id(), code: '#481', tenant: 'demo-company', subject: 'خطای Webhook پرداخت', priority: 'بحرانی', status: 'در حال بررسی' },
      { id: id(), code: '#482', tenant: 'arman-industry', subject: 'افزایش seat', priority: 'عادی', status: 'باز' },
    ],
  },
  modules: {
    title: 'ماژول‌ها',
    description: 'Entitlement و نسخه ماژول‌های ERP',
    statusKey: 'status',
    fields: [
      { key: 'code', label: 'کد', required: true },
      { key: 'name', label: 'نام', required: true },
      { key: 'version', label: 'نسخه' },
      { key: 'status', label: 'وضعیت', type: 'select', options: ['فعال', 'غیرفعال', 'بتا'] },
    ],
    columns: [
      { key: 'code', label: 'کد' },
      { key: 'name', label: 'نام' },
      { key: 'version', label: 'نسخه' },
      { key: 'status', label: 'وضعیت' },
    ],
    rows: [
      { id: id(), code: 'finance', name: 'مالی', version: '6.1.0', status: 'فعال' },
      { id: id(), code: 'sales', name: 'فروش', version: '6.1.0', status: 'فعال' },
      { id: id(), code: 'bi-risk', name: 'BI و ریسک', version: '6.1.0', status: 'بتا' },
    ],
  },
  audit: {
    title: 'ممیزی پلتفرم',
    description: 'رویدادهای حساس با correlation_id',
    statusKey: 'result',
    fields: [
      { key: 'actor', label: 'کاربر', required: true },
      { key: 'action', label: 'عملیات', required: true },
      { key: 'resource', label: 'منبع' },
      { key: 'at', label: 'زمان' },
      { key: 'result', label: 'نتیجه', type: 'select', options: ['موفق', 'رد', 'هشدار'] },
    ],
    columns: [
      { key: 'actor', label: 'کاربر' },
      { key: 'action', label: 'عملیات' },
      { key: 'resource', label: 'منبع' },
      { key: 'at', label: 'زمان' },
      { key: 'result', label: 'نتیجه' },
    ],
    rows: [
      { id: id(), actor: 'super@mashhad.host', action: 'tenant.provision', resource: 'demo-company', at: '۱۴۰۴/۰۸/۱۲ ۱۰:۲۲', result: 'موفق' },
      { id: id(), actor: 'super@mashhad.host', action: 'plan.publish', resource: 'growth@v3', at: '۱۴۰۴/۰۸/۱۱ ۱۸:۰۱', result: 'موفق' },
    ],
  },
  'break-glass': {
    title: 'Break-Glass',
    description: 'نشست‌های اضطراری با مجوز زمان‌دار',
    statusKey: 'status',
    fields: [
      { key: 'session', label: 'شناسه نشست', required: true },
      { key: 'tenant', label: 'مستأجر', required: true },
      { key: 'approver', label: 'تأییدکننده' },
      { key: 'expires', label: 'انقضا' },
      { key: 'status', label: 'وضعیت', type: 'select', options: ['فعال', 'منقضی', 'لغو'] },
    ],
    columns: [
      { key: 'session', label: 'نشست' },
      { key: 'tenant', label: 'مستأجر' },
      { key: 'approver', label: 'تأیید' },
      { key: 'expires', label: 'انقضا' },
      { key: 'status', label: 'وضعیت' },
    ],
    rows: [
      { id: id(), session: 'BG-0091', tenant: 'demo-company', approver: 'company-admin', expires: '۱۴۰۴/۰۸/۱۲ ۱۲:۰۰', status: 'منقضی' },
    ],
  },
  'feature-flags': {
    title: 'Feature Flags',
    description: 'Rollout تدریجی قابلیت‌ها',
    statusKey: 'status',
    fields: [
      { key: 'key', label: 'کلید', required: true },
      { key: 'description', label: 'توضیح' },
      { key: 'rollout', label: 'درصد rollout', type: 'number' },
      { key: 'status', label: 'وضعیت', type: 'select', options: ['فعال', 'غیرفعال', 'آزمایشی'] },
    ],
    columns: [
      { key: 'key', label: 'کلید' },
      { key: 'description', label: 'توضیح' },
      { key: 'rollout', label: '%' },
      { key: 'status', label: 'وضعیت' },
    ],
    rows: [
      { id: id(), key: 'checkout.v2', description: 'چک‌اوت ۷ مرحله‌ای', rollout: 100, status: 'فعال' },
      { id: id(), key: 'bi.risk-radar', description: 'رادار ریسک هوشمند', rollout: 35, status: 'آزمایشی' },
    ],
  },
};
