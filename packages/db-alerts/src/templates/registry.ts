import type { TemplateKey } from './template-keys.js';
import { TEMPLATE_KEYS } from './template-keys.js';

export type TemplateDef = {
  key: TemplateKey;
  version: number;
  subject: string;
  bodyHtml: string;
  bodyText: string;
  variables: string[];
};

const rtlShell = (body: string) =>
  `<table role="presentation"><tr><td dir="rtl" style="font-family:Vazirmatn,Tahoma,sans-serif;padding:24px">${body}</td></tr></table>`;

function def(key: TemplateKey, subject: string, body: string, variables: string[]): TemplateDef {
  return {
    key,
    version: 1,
    subject,
    bodyHtml: rtlShell(`<h2 style="margin:0 0 12px">${subject}</h2><p>{{message}}</p><p style="color:#666;font-size:12px">{{footer}}</p>`),
    bodyText: `${subject}\n{{message}}\n{{footer}}`,
    variables: ['message', 'footer', ...variables],
  };
}

const SUBJECTS: Record<TemplateKey, string> = {
  welcome_staff: 'خوش‌آمدید به تیم',
  password_reset: 'بازنشانی رمز عبور',
  '2fa_enabled': 'احراز هویت دو مرحله‌ای فعال شد',
  new_alert_critical: 'هشدار بحرانی',
  approval_assigned: 'تأیید جدید به شما محول شد',
  task_assigned: 'وظیفه جدید',
  welcome_tenant: 'خوش‌آمدید به پلتفرم',
  subscription_purchased: 'اشتراک فعال شد',
  subscription_renewed: 'تمدید اشتراک',
  subscription_expiring_7d: '۷ روز تا پایان اشتراک',
  subscription_expiring_3d: '۳ روز تا پایان اشتراک',
  subscription_expiring_0d: 'امروز پایان اشتراک',
  payment_failed: 'پرداخت ناموفق',
  invoice_issued: 'صدور فاکتور',
  refund_approved: 'استرداد تأیید شد',
  seat_limit_reached: 'سقف صندلی',
  usage_80_percent: 'مصرف ۸۰٪',
  usage_100_percent: 'مصرف ۱۰۰٪',
  module_activated: 'ماژول فعال شد',
  ticket_reply: 'پاسخ تیکت',
  break_glass_accessed: 'دسترسی اضطراری',
  new_tenant_registered: 'مستأجر جدید',
  new_ticket_created: 'تیکت جدید',
  payment_received: 'پرداخت دریافت شد',
  high_risk_tenant: 'مستأجر پرریسک',
  service_health_down: 'اختلال سرویس',
  backup_failed: 'شکست پشتیبان',
  suspicious_login: 'ورود مشکوک',
  break_glass_requested: 'درخواست Break-Glass',
  sla_breach: 'نقض SLA',
};

export const TEMPLATE_REGISTRY: TemplateDef[] = TEMPLATE_KEYS.map((key) =>
  def(key, SUBJECTS[key], '', key.includes('usage') || key.includes('payment') ? ['amount'] : []),
);

export function getTemplate(key: string, version = 1): TemplateDef | undefined {
  return TEMPLATE_REGISTRY.find((t) => t.key === key && t.version === version);
}
