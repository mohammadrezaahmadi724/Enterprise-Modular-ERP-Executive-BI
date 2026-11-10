import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TenantContext } from '@repo/domain';
import { globalEntitlementCache } from '../cache/entitlement-cache.js';
import { globalModuleRegistry } from '../registry.js';

export const MODULE_CODE_KEY = 'moduleCode';
export const RequireModule = (moduleCode: string) => SetMetadata(MODULE_CODE_KEY, moduleCode);

@Injectable()
export class ModuleEntitlementGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const moduleCode = this.reflector.get<string>(MODULE_CODE_KEY, context.getHandler());
    if (!moduleCode) return true;

    const tenantId = TenantContext.requireTenantId();
    const cached = globalEntitlementCache.get(tenantId, moduleCode);
    if (cached === false) {
      throw new ForbiddenException(`Module ${moduleCode} is not active for tenant`);
    }
    if (cached === true) return true;

    const modules = await globalModuleRegistry.getActiveModules(tenantId);
    const active = modules.some((m) => m.moduleCode === moduleCode && m.status === 'Active');
    globalEntitlementCache.set(tenantId, moduleCode, active);
    if (!active) {
      throw new ForbiddenException(`Module ${moduleCode} is not active for tenant`);
    }
    return true;
  }
}
