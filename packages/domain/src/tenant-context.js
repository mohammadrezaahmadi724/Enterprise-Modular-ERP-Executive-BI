import { AsyncLocalStorage } from 'node:async_hooks';
import { TenantContextMissingError } from './errors/tenant-context-missing.error.js';
export const als = new AsyncLocalStorage();
/** مدیریت کانتکست مستأجر با AsyncLocalStorage */
export class TenantContext {
    static run(data, callback) {
        return als.run(data, callback);
    }
    static async runAsync(data, callback) {
        return als.run(data, callback);
    }
    static get() {
        const store = als.getStore();
        if (!store) {
            throw new TenantContextMissingError();
        }
        return store;
    }
    static getOrNull() {
        return als.getStore() ?? null;
    }
    static requireTenantId() {
        const ctx = TenantContext.get();
        if (!ctx.tenantId) {
            throw new TenantContextMissingError('tenantId is required in TenantContext');
        }
        return ctx.tenantId;
    }
}
//# sourceMappingURL=tenant-context.js.map