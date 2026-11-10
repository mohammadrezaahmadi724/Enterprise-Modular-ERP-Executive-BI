const cache = new Map<string, { value: unknown; expiresAt: number }>();

const MODULE_PATTERNS: Record<string, string[]> = {
  'sales.order.confirmed.v1': ['product:*', 'kpi:sales:*', 'menu:*'],
  'finance.gl_entry.posted.v1': ['kpi:finance:*'],
};

export function resetCache(): void {
  cache.clear();
}

export function cacheSet(key: string, value: unknown, ttlMs = 300_000): void {
  cache.set(key, { value, expiresAt: Date.now() + ttlMs });
}

export function cacheGet(key: string): unknown | null {
  const row = cache.get(key);
  if (!row) return null;
  if (Date.now() > row.expiresAt) {
    cache.delete(key);
    return null;
  }
  return row.value;
}

export function invalidateByEvent(eventType: string): string[] {
  const patterns = MODULE_PATTERNS[eventType] ?? [];
  const removed: string[] = [];
  for (const key of [...cache.keys()]) {
    if (patterns.some((p) => matchPattern(p, key))) {
      cache.delete(key);
      removed.push(key);
    }
  }
  return removed;
}

function matchPattern(pattern: string, key: string): boolean {
  if (pattern.endsWith(':*')) {
    return key.startsWith(pattern.slice(0, -1));
  }
  return key === pattern;
}
