/** برند type برای شناسه مستأجر */
export type TenantId = string & {
    readonly __brand: 'TenantId';
};
export declare function validateTenantId(raw: string): TenantId;
//# sourceMappingURL=tenant-id.d.ts.map