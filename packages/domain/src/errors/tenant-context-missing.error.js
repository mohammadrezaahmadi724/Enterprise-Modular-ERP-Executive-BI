export class TenantContextMissingError extends Error {
    code = 'TENANT_CONTEXT_MISSING';
    constructor(message = 'TenantContext is not available in the current async scope') {
        super(message);
        this.name = 'TenantContextMissingError';
    }
}
//# sourceMappingURL=tenant-context-missing.error.js.map