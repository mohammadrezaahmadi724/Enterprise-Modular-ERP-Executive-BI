import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const PERMISSION_KEY = 'requiredPermission';

/** مسیر بدون Auth/Tenant/RBAC (health، login، public marketing) */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

/** مجوز RBAC برای handler (نیاز به AuthGuard فعال) */
export const RequirePermission = (permission: string) => SetMetadata(PERMISSION_KEY, permission);
