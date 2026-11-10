import pg from 'pg';

const { Pool } = pg;

let pool: pg.Pool | null = null;

/** Singleton مشترک pg.Pool — lazy init */
export function getPool(): pg.Pool {
  if (!pool) {
    const max = Number(process.env.PG_POOL_MAX ?? 10);
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    });
  }
  return pool;
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
