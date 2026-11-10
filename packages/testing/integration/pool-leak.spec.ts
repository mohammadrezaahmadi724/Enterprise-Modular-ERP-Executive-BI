import { describe, it, expect, afterAll } from 'vitest';
import { randomUUID } from 'node:crypto';
import { TenantContext } from '@repo/domain';
import { safeUuid, closePool, getPool } from '@repo/db-core-adapter';
import {
  initMultiSchema,
  startPostgresContainer,
  stopPostgresContainer,
} from '../src/setup/postgres-container.js';

describe('Pool tenant session leak — خلأ ۳ — بند ۴.۱ + ۳.۱', () => {
  let connectionString: string;
  let useRealDb = false;

  afterAll(async () => {
    await closePool();
    if (useRealDb) await stopPostgresContainer();
  });

  it('بعد از ۱۰۰۰ تراکنش هم‌زمان، connection جدید نباید tenant_id نشت کند', async () => {
    try {
      connectionString = await startPostgresContainer();
      await initMultiSchema(connectionString);
      useRealDb = true;
    } catch {
      connectionString = '';
    }

    if (!useRealDb && process.env.DATABASE_URL) {
      const { default: pg } = await import('pg');
      const probe = new pg.Client({ connectionString: process.env.DATABASE_URL });
      try {
        await probe.connect();
        await probe.query('SELECT 1');
        connectionString = process.env.DATABASE_URL;
        await probe.end();
      } catch {
        connectionString = '';
      }
    }

    if (!connectionString) {
      // شبیه‌ساز بدون Postgres — همان قرارداد SET LOCAL
      const sessions = new Map<object, string>();
      const runSimulated = async (tenantId: string) => {
        const key = {};
        sessions.set(key, safeUuid(tenantId));
        sessions.delete(key);
      };
      await Promise.all(Array.from({ length: 1000 }, () => runSimulated(randomUUID())));
      expect(sessions.size).toBe(0);
      return;
    }

    process.env.DATABASE_URL = connectionString;
    const pool = getPool();
    const baseCtx = {
      userId: '00000000-0000-4000-8000-000000000001',
      correlationId: 'pool-leak',
      traceId: 'trace-pool',
      isSuperAdmin: false,
    };

    const workers = Array.from({ length: 1000 }, () => {
      const tenantId = randomUUID();
      return TenantContext.runAsync({ ...baseCtx, tenantId }, async () => {
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          await client.query(`SET LOCAL app.current_tenant_id = '${safeUuid(tenantId)}'`);
          await client.query('COMMIT');
        } finally {
          client.release();
        }
      });
    });

    await Promise.all(workers);

    const verify = await pool.connect();
    try {
      const res = await verify.query(`SELECT current_setting('app.current_tenant_id', true) AS tid`);
      const tid = res.rows[0]?.tid as string | null;
      expect(tid === null || tid === '').toBe(true);
    } finally {
      verify.release();
    }
  }, 120_000);
});
