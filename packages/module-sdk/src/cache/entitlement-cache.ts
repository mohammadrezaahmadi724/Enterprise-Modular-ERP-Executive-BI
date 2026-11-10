const DEFAULT_TTL_MS = 5 * 60 * 1000;

type CacheEntry = {
  value: boolean;
  expiresAt: number;
};

/** کش ساده entitlement — TTL پیش‌فرض ۵ دقیقه */
export class EntitlementCache {
  private readonly store = new Map<string, CacheEntry>();

  constructor(private readonly ttlMs = DEFAULT_TTL_MS) {}

  private key(tenantId: string, moduleCode: string): string {
    return `${tenantId}:${moduleCode}`;
  }

  get(tenantId: string, moduleCode: string): boolean | null {
    const entry = this.store.get(this.key(tenantId, moduleCode));
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(this.key(tenantId, moduleCode));
      return null;
    }
    return entry.value;
  }

  set(tenantId: string, moduleCode: string, active: boolean): void {
    this.store.set(this.key(tenantId, moduleCode), {
      value: active,
      expiresAt: Date.now() + this.ttlMs,
    });
  }

  invalidate(tenantId: string, moduleCode: string): void {
    this.store.delete(this.key(tenantId, moduleCode));
  }
}

export const globalEntitlementCache = new EntitlementCache();
