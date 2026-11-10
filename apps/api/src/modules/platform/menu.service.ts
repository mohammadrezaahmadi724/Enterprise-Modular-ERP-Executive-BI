import { globalModuleRegistry } from '@repo/module-sdk';
import type { ModuleManifest } from '@repo/module-sdk';
import { platformDb } from '../../prisma/platform-db';

const DEMO_TENANT = '11111111-1111-4111-8111-111111111111';
const DEFAULT_MODULE_CODES = ['finance-base', 'crm-base', 'operations-base', 'hr-base'];

const WAVE1_MODULES: Record<string, ModuleManifest> = {
  'finance-base': {
    code: 'finance-base',
    version: '1.0.0',
    displayName: 'Finance',
    displayNameFa: 'مالی',
    dependsOn: [],
    events: { published: [], consumed: [] },
    permissions: ['finance.read'],
    ui: {
      routes: [],
      menuItems: [
        { path: '/finance/chart-of-accounts', labelFa: 'حساب‌ها', icon: 'book', order: 1 },
        { path: '/finance/journal-entries', labelFa: 'اسناد', icon: 'file', order: 2 },
        { path: '/finance/trial-balance', labelFa: 'تراز آزمایشی', icon: 'scale', order: 3 },
      ],
    },
    cacheInvalidationPatterns: [],
    alertRules: [],
    notificationTemplates: [],
    lifecycle: {},
  },
  'operations-base': {
    code: 'operations-base',
    version: '1.0.0',
    displayName: 'Operations',
    displayNameFa: 'عملیات',
    dependsOn: ['finance-base'],
    events: { published: [], consumed: [] },
    permissions: ['operations.read'],
    ui: {
      routes: [],
      menuItems: [
        { path: '/sales/orders', labelFa: 'سفارش‌ها', icon: 'cart', order: 1 },
        { path: '/distribution/deliveries', labelFa: 'پخش', icon: 'truck', order: 2 },
        { path: '/manufacturing/work-orders', labelFa: 'تولید', icon: 'factory', order: 3 },
      ],
    },
    cacheInvalidationPatterns: [],
    alertRules: [],
    notificationTemplates: [],
    lifecycle: {},
  },
  'hr-base': {
    code: 'hr-base',
    version: '1.0.0',
    displayName: 'HR',
    displayNameFa: 'منابع انسانی',
    dependsOn: ['finance-base'],
    events: { published: [], consumed: [] },
    permissions: ['hr.read'],
    ui: {
      routes: [],
      menuItems: [
        { path: '/hr/employees', labelFa: 'پرسنل', icon: 'users', order: 1 },
        { path: '/hr/payroll', labelFa: 'حقوق و دستمزد', icon: 'wallet', order: 2 },
        { path: '/hr/leave', labelFa: 'مرخصی', icon: 'calendar', order: 3 },
      ],
    },
    cacheInvalidationPatterns: [],
    alertRules: [],
    notificationTemplates: [],
    lifecycle: {},
  },
  'crm-base': {
    code: 'crm-base',
    version: '1.0.0',
    displayName: 'CRM',
    displayNameFa: 'ارتباط با مشتری',
    dependsOn: [],
    events: { published: [], consumed: [] },
    permissions: ['crm.read'],
    ui: {
      routes: [],
      menuItems: [
        { path: '/crm/contacts', labelFa: 'مخاطبین', icon: 'users', order: 1 },
        { path: '/crm/leads', labelFa: 'سرنخ‌ها', icon: 'target', order: 2 },
      ],
    },
    cacheInvalidationPatterns: [],
    alertRules: [],
    notificationTemplates: [],
    lifecycle: {},
  },
};

Object.values(WAVE1_MODULES).forEach((m) => globalModuleRegistry.register(m));

const tenantActiveModules = new Map<string, string[]>();

export function setTenantModules(tenantId: string, codes: string[]): void {
  tenantActiveModules.set(tenantId, codes);
}

globalModuleRegistry.bindActiveModulesQuery(async (tenantId) => {
  const memory = tenantActiveModules.get(tenantId);
  if (memory?.length) {
    return memory.map((code) => ({
      tenantId,
      moduleCode: code,
      version: '1.0.0',
      status: 'Active' as const,
    }));
  }
  try {
    const rows = await platformDb.tenantModule.findMany({
      where: { tenantId, status: 'Active' },
    });
    if (rows.length) {
      return rows.map((r) => ({
        tenantId,
        moduleCode: r.moduleCode,
        version: r.version,
        status: 'Active' as const,
      }));
    }
  } catch {
    /* DB unavailable in tests */
  }
  if (tenantId === DEMO_TENANT) {
    return DEFAULT_MODULE_CODES.map((code) => ({
      tenantId,
      moduleCode: code,
      version: '1.0.0',
      status: 'Active' as const,
    }));
  }
  return [];
});

export function buildMenuForTenant(tenantId: string): Array<{
  path: string;
  labelFa: string;
  icon: string;
  order: number;
}> {
  const codes = tenantActiveModules.get(tenantId) ?? [];
  const items: Array<{ path: string; labelFa: string; icon: string; order: number }> = [
    { path: '/dashboard', labelFa: 'داشبورد', icon: 'layout', order: 0 },
  ];
  for (const code of codes) {
    const manifest = WAVE1_MODULES[code];
    if (manifest) items.push(...manifest.ui.menuItems);
  }
  return items.sort((a, b) => a.order - b.order);
}
