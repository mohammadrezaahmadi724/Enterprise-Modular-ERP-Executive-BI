export class TenantContextMissingError extends Error {
  readonly code = 'TENANT_CONTEXT_MISSING';
  constructor(message = 'TenantContext is not available in the current async scope') {
    super(message);
    this.name = 'TenantContextMissingError';
  }
}
