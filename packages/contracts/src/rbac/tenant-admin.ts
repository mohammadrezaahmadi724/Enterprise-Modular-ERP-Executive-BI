/** مجوزهای مدیریت سازمان — Tenant Admin plane */
export const TENANT_USERS_READ = 'tenant.users.read';
export const TENANT_USERS_WRITE = 'tenant.users.write';
export const TENANT_USERS_INVITE = 'tenant.users.invite';
export const TENANT_USERS_DEACTIVATE = 'tenant.users.deactivate';

export const TENANT_ROLES_READ = 'tenant.roles.read';
export const TENANT_ROLES_WRITE = 'tenant.roles.write';

export const TENANT_ADMIN_PERMISSIONS = [
  TENANT_USERS_READ,
  TENANT_USERS_WRITE,
  TENANT_USERS_INVITE,
  TENANT_USERS_DEACTIVATE,
  TENANT_ROLES_READ,
  TENANT_ROLES_WRITE,
] as const;

export type TenantAdminPermission = (typeof TENANT_ADMIN_PERMISSIONS)[number];
