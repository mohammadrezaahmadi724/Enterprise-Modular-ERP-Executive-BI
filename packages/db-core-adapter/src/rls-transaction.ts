import { setTenantSession } from './rls.js';

/** Transaction با `SET LOCAL app.current_tenant_id` — برای هر PrismaClient چند-schema */
export async function withRlsTransaction<T, Tx extends { $executeRawUnsafe: (q: string) => Promise<number> }>(
  client: { $transaction: (fn: (tx: Tx) => Promise<T>) => Promise<T> },
  fn: (tx: Tx) => Promise<T>,
): Promise<T> {
  return client.$transaction(async (tx) => {
    await setTenantSession(tx);
    return fn(tx);
  });
}

export function rlsSessionEnabled(): boolean {
  return process.env.RLS_ENABLED === '1' || process.env.RLS_ENABLED === 'true';
}

/** کوئری خواندن با `SET LOCAL` در همان transaction — برای سیاست‌های RLS PostgreSQL */
export async function withRlsRead<T, Tx extends { $executeRawUnsafe: (q: string) => Promise<number> }>(
  client: { $transaction: (fn: (tx: Tx) => Promise<T>) => Promise<T>; findMany?: unknown },
  run: (tx: Tx) => Promise<T>,
): Promise<T> {
  if (!rlsSessionEnabled()) {
    return run(client as unknown as Tx);
  }
  return withRlsTransaction(client, run);
}
