import type { ErpModuleCode } from '../pricing/module-catalog';
import { TENANT_ADMIN_PERMISSIONS } from './tenant-admin';

export type PermissionCatalogEntry = {
  code: string;
  labelFa: string;
  module?: ErpModuleCode | 'platform' | 'tenant';
  descriptionFa?: string;
};

/** مرجع واحد مجوزهای API — هم‌تراز با `@RequirePermission` */
export const PERMISSION_CATALOG: PermissionCatalogEntry[] = [
  { code: 'tenant.users.read', labelFa: 'مشاهده کاربران سازمان', module: 'tenant' },
  { code: 'tenant.users.write', labelFa: 'ویرایش کاربران', module: 'tenant' },
  { code: 'tenant.users.invite', labelFa: 'دعوت کاربر', module: 'tenant' },
  { code: 'tenant.users.deactivate', labelFa: 'غیرفعال‌سازی کاربر', module: 'tenant' },
  { code: 'tenant.roles.read', labelFa: 'مشاهده نقش‌ها', module: 'tenant' },
  { code: 'tenant.roles.write', labelFa: 'مدیریت نقش و مجوز', module: 'tenant' },
  { code: 'erp.read', labelFa: 'خواندن ERP عمومی', module: 'platform' },
  { code: 'erp.write', labelFa: 'نوشتن ERP عمومی', module: 'platform' },
  { code: 'finance.read', labelFa: 'مالی — مشاهده', module: 'finance' },
  { code: 'finance.write', labelFa: 'مالی — ثبت و تأیید', module: 'finance' },
  { code: 'crm.read', labelFa: 'CRM — مشاهده', module: 'sales' },
  { code: 'crm.write', labelFa: 'CRM — ویرایش', module: 'sales' },
  { code: 'operations.read', labelFa: 'عملیات — مشاهده', module: 'inventory' },
  { code: 'operations.write', labelFa: 'عملیات — ثبت', module: 'inventory' },
  { code: 'hr.read', labelFa: 'HR — مشاهده', module: 'hr' },
  { code: 'hr.write', labelFa: 'HR — ثبت', module: 'hr' },
  { code: 'platform.ops.read', labelFa: 'عملیات پلتفرم (tenant)', module: 'platform' },
];

/** مجوزهای هر ماژول فعال — برای سقف assign در tenant UI */
export const MODULE_PERMISSION_MATRIX: Record<ErpModuleCode, string[]> = {
  finance: ['finance.read', 'finance.write', 'erp.read'],
  sales: ['crm.read', 'crm.write', 'operations.read', 'operations.write', 'erp.read', 'erp.write'],
  hr: ['hr.read', 'hr.write', 'erp.read'],
  inventory: ['operations.read', 'operations.write', 'erp.read', 'erp.write'],
  manufacturing: ['operations.read', 'operations.write', 'erp.read'],
  distribution: ['operations.read', 'operations.write', 'erp.read'],
  retail: ['operations.read', 'operations.write', 'erp.read'],
  'bi-risk': ['erp.read', 'platform.ops.read'],
  'ai-messaging': ['erp.read', 'platform.ops.read'],
};

export const DEFAULT_PLAN_ROLE_TEMPLATES: Array<{
  code: string;
  nameFa: string;
  permissions: string[];
}> = [
  {
    code: 'COMPANY_ADMIN',
    nameFa: 'مدیر سازمان',
    permissions: [
      ...TENANT_ADMIN_PERMISSIONS,
      'erp.read',
      'erp.write',
      'finance.read',
      'finance.write',
      'operations.read',
      'operations.write',
      'crm.read',
      'crm.write',
    ],
  },
  {
    code: 'CFO',
    nameFa: 'مدیر مالی',
    permissions: [
      'finance.read',
      'finance.write',
      'crm.read',
      'erp.read',
      'erp.write',
      'operations.read',
      'platform.ops.read',
    ],
  },
  {
    code: 'HR_MANAGER',
    nameFa: 'مدیر منابع انسانی',
    permissions: ['hr.read', 'hr.write', 'erp.read', 'tenant.users.read'],
  },
  {
    code: 'WAREHOUSE',
    nameFa: 'مسئول انبار',
    permissions: ['operations.read', 'operations.write', 'erp.read'],
  },
];

export function permissionsForActiveModules(moduleCodes: ErpModuleCode[]): string[] {
  const set = new Set<string>([...TENANT_ADMIN_PERMISSIONS]);
  for (const code of moduleCodes) {
    for (const p of MODULE_PERMISSION_MATRIX[code] ?? []) set.add(p);
  }
  return [...set];
}

export function filterPermissionsByGrantable(
  selected: string[],
  grantable: string[],
): string[] {
  const allow = new Set(grantable);
  return selected.filter((p) => allow.has(p));
}

export function catalogForGrantable(grantable: string[]): PermissionCatalogEntry[] {
  const allow = new Set(grantable);
  return PERMISSION_CATALOG.filter((e) => allow.has(e.code));
}

/** حداقل مجوز برای آیتم‌های ریل tenant cloud */
export const TENANT_RAIL_PERMISSION: Record<string, string> = {
  home: 'erp.read',
  sales: 'operations.read',
  finance: 'finance.read',
  procurement: 'operations.read',
  wms: 'operations.read',
  projects: 'operations.read',
  hr: 'hr.read',
  manufacturing: 'operations.read',
  distribution: 'operations.read',
  retail: 'operations.read',
  bi: 'erp.read',
  ai: 'erp.read',
  qc: 'operations.read',
  workflows: 'erp.read',
  master: 'operations.read',
  users: 'tenant.users.read',
  subscription: 'erp.read',
  security: 'erp.read',
};

export function filterRailIdsByPermissions(
  permissions: string[],
): (railId: string) => boolean {
  if (permissions.includes('*')) return () => true;
  const set = new Set(permissions);
  return (railId: string) => {
    const need = TENANT_RAIL_PERMISSION[railId];
    if (!need) return true;
    return set.has(need) || set.has('erp.write');
  };
}
