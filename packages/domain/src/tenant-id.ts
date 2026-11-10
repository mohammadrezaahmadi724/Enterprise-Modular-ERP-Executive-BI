import { InvariantViolationError } from './errors/invariant-violation.error.js';

/** برند type برای شناسه مستأجر */
export type TenantId = string & { readonly __brand: 'TenantId' };

const UUID_V4 =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function validateTenantId(raw: string): TenantId {
  if (!UUID_V4.test(raw)) {
    throw new InvariantViolationError(`Invalid tenant id (expected UUID v4): ${raw}`);
  }
  return raw as TenantId;
}
