import { AsyncLocalStorage } from 'node:async_hooks';
import { TenantContextMissingError } from './errors/tenant-context-missing.error.js';

/** داده‌های کانتکست مستأجر در هر درخواست/Job */
export interface TenantContextData {
  tenantId: string;
  userId: string;
  correlationId: string;
  traceId: string;
  isSuperAdmin: boolean;
  breakGlassSessionId?: string;
}

export const als = new AsyncLocalStorage<TenantContextData>();

/** مدیریت کانتکست مستأجر با AsyncLocalStorage */
export class TenantContext {
  static run<T>(data: TenantContextData, callback: () => T): T {
    return als.run(data, callback);
  }

  static async runAsync<T>(data: TenantContextData, callback: () => Promise<T>): Promise<T> {
    return als.run(data, callback);
  }

  static get(): TenantContextData {
    const store = als.getStore();
    if (!store) {
      throw new TenantContextMissingError();
    }
    return store;
  }

  static getOrNull(): TenantContextData | null {
    return als.getStore() ?? null;
  }

  static requireTenantId(): string {
    const ctx = TenantContext.get();
    if (!ctx.tenantId) {
      throw new TenantContextMissingError('tenantId is required in TenantContext');
    }
    return ctx.tenantId;
  }
}
