import { AsyncLocalStorage } from 'node:async_hooks';
/** داده‌های کانتکست مستأجر در هر درخواست/Job */
export interface TenantContextData {
    tenantId: string;
    userId: string;
    correlationId: string;
    traceId: string;
    isSuperAdmin: boolean;
    breakGlassSessionId?: string;
}
export declare const als: AsyncLocalStorage<TenantContextData>;
/** مدیریت کانتکست مستأجر با AsyncLocalStorage */
export declare class TenantContext {
    static run<T>(data: TenantContextData, callback: () => T): T;
    static runAsync<T>(data: TenantContextData, callback: () => Promise<T>): Promise<T>;
    static get(): TenantContextData;
    static getOrNull(): TenantContextData | null;
    static requireTenantId(): string;
}
//# sourceMappingURL=tenant-context.d.ts.map