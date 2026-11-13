import { globalModuleRegistry } from '@repo/module-sdk';
import type { ModuleManifest } from '@repo/module-sdk';
import { platformDb } from '../../prisma/platform-db';

const DEMO_TENANT = '11111111-1111-4111-8111-111111111111';
const DEFAULT_MODULE_CODES = ['finance-base', 'crm-base', 'operations-base', 'projects-base', 'hr-base'];

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
        { path: '/finance/reports', labelFa: 'گزارش مالی', icon: 'scale', order: 3 },
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
        { path: '/manufacturing/orders', labelFa: 'تولید', icon: 'factory', order: 3 },
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
        { path: '/hr/payroll/run', labelFa: 'حقوق و دستمزد', icon: 'wallet', order: 2 },
        { path: '/hr/leave-requests', labelFa: 'مرخصی', icon: 'calendar', order: 3 },
      ],
    },
    cacheInvalidationPatterns: [],
    alertRules: [],
    notificationTemplates: [],
    lifecycle: {},
  },
  'projects-base': {
    code: 'projects-base',
    version: '1.0.0',
    displayName: 'Projects',
    displayNameFa: 'پروژه‌ها',
    dependsOn: ['operations-base'],
    events: {
      published: ['operations.project.created.v1', 'operations.project.task.created.v1', 'operations.project.task.updated.v1'],
      consumed: ['operations.purchase_request.approved.v1', 'operations.purchase_order.approved.v1', 'operations.procurement.completed.v1'],
    },
    permissions: ['operations.read', 'operations.write'],
    ui: {
      routes: [{ path: '/projects', component: 'ProjectsHub', menuLabelFa: 'نمای کلی پروژه‌ها', icon: 'folder' }],
      menuItems: [],
    },
    cacheInvalidationPatterns: ['projection_projects_hub'],
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
    permissions: ['crm.read', 'operations.read'],
    ui: {
      routes: [],
      menuItems: [
        { path: '/sales/contacts', labelFa: 'مخاطبین', icon: 'users', order: 1 },
        { path: '/sales/leads', labelFa: 'سرنخ‌ها', icon: 'target', order: 2 },
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

export async function activeModuleCodes(tenantId: string): Promise<string[]> {
  const memory = tenantActiveModules.get(tenantId);
  if (memory?.length) return memory;
  try {
    const rows = await platformDb.tenantModule.findMany({
      where: { tenantId, status: 'Active' },
    });
    if (rows.length) return rows.map((row) => row.moduleCode);
  } catch {
    /* DB unavailable in tests */
  }
  if (tenantId === DEMO_TENANT) return [...DEFAULT_MODULE_CODES];
  return [];
}

export async function activateTenantModules(tenantId: string, codes: string[]): Promise<string[]> {
  setTenantModules(tenantId, codes);
  try {
    for (const code of codes) {
      await platformDb.tenantModule.upsert({
        where: { tenantId_moduleCode: { tenantId, moduleCode: code } },
        create: {
          tenantId,
          moduleCode: code,
          version: '1.0.0',
          status: 'Active',
          activatedAt: new Date(),
        },
        update: { status: 'Active', activatedAt: new Date(), deactivatedAt: null },
      });
    }
  } catch {
    /* DB unavailable in tests */
  }
  return codes;
}

globalModuleRegistry.bindActiveModulesQuery(async (tenantId) => {
  const codes = await activeModuleCodes(tenantId);
  return codes.map((moduleCode) => ({
    tenantId,
    moduleCode,
    version: '1.0.0',
    status: 'Active' as const,
  }));
});

function menuFromCodes(codes: string[]) {
  const items: Array<{ path: string; labelFa: string; icon: string; order: number }> = [
    { path: '/dashboard', labelFa: 'داشبورد', icon: 'layout', order: 0 },
  ];
  for (const code of codes) {
    const manifest = WAVE1_MODULES[code];
    if (manifest) items.push(...manifest.ui.menuItems);
  }
  return items.sort((a, b) => a.order - b.order);
}

export function buildMenuForTenant(tenantId: string) {
  return menuFromCodes(tenantActiveModules.get(tenantId) ?? []);
}

export async function buildMenuForTenantResolved(tenantId: string) {
  return menuFromCodes(await activeModuleCodes(tenantId));
}
