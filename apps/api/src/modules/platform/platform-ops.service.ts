import { Queue } from 'bullmq';
import { getPool } from '@repo/db-core-adapter';
import { getBullConnection, getRedis } from '../../redis';

const MONITORED_QUEUES = ['domain-events', 'notification-orchestrator', 'alert-evaluator'] as const;

export type PlatformOpsSnapshot = {
  database: {
    connected: boolean;
    database?: string;
    schemas: Array<{ name: string; tables: number; totalRows: number }>;
    error?: string;
  };
  redis: {
    mode: 'redis' | 'memory';
    status?: string;
    memoryHuman?: string;
    connectedClients?: number;
  };
  queues: Array<{ name: string; waiting: number; active: number; delayed: number; failed: number }>;
  tenancy: {
    tenants: number;
    subscriptions: Array<{
      tenantName: string;
      slug: string;
      status: string;
      seats: number;
      usedSeats: number;
      seatPressurePercent: number;
    }>;
  };
};

async function schemaStats(): Promise<PlatformOpsSnapshot['database']> {
  if (!process.env.DATABASE_URL) {
    return { connected: false, schemas: [], error: 'DATABASE_URL تنظیم نشده' };
  }
  try {
    const pool = getPool();
    const dbRes = await pool.query<{ name: string }>('SELECT current_database() AS name');
    const schemasRes = await pool.query<{ schemaname: string; tables: string; rows: string }>(`
      SELECT n.nspname AS schemaname,
             COUNT(c.oid)::text AS tables,
             COALESCE(SUM(c.reltuples), 0)::bigint::text AS rows
      FROM pg_class c
      JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE c.relkind = 'r'
        AND n.nspname IN ('platform', 'platform_outbox', 'erp_finance', 'erp_operations', 'erp_hr', 'erp_bi_risk', 'alerts', 'public')
      GROUP BY n.nspname
      ORDER BY n.nspname
    `);
    return {
      connected: true,
      database: dbRes.rows[0]?.name,
      schemas: schemasRes.rows.map((r) => ({
        name: r.schemaname,
        tables: Number(r.tables),
        totalRows: Number(r.rows),
      })),
    };
  } catch (e) {
    return {
      connected: false,
      schemas: [],
      error: e instanceof Error ? e.message : 'db error',
    };
  }
}

async function redisStats(): Promise<PlatformOpsSnapshot['redis']> {
  const client = getRedis();
  if (!client) {
    return { mode: 'memory', status: 'in-memory (REDIS_URL خالی)' };
  }
  try {
    const info = await client.info('memory');
    const memoryLine = info.split('\n').find((l) => l.startsWith('used_memory_human:'));
    const clients = await client.info('clients');
    const clientsLine = clients.split('\n').find((l) => l.startsWith('connected_clients:'));
    return {
      mode: 'redis',
      status: client.status,
      memoryHuman: memoryLine?.split(':')[1]?.trim(),
      connectedClients: clientsLine ? Number(clientsLine.split(':')[1]) : undefined,
    };
  } catch {
    return { mode: 'redis', status: client.status };
  }
}

async function queueStats(): Promise<PlatformOpsSnapshot['queues']> {
  const connection = getBullConnection();
  const out: PlatformOpsSnapshot['queues'] = [];
  for (const name of MONITORED_QUEUES) {
    try {
      const q = new Queue(name, { connection });
      const counts = await q.getJobCounts('waiting', 'active', 'delayed', 'failed');
      await q.close();
      out.push({
        name,
        waiting: counts.waiting ?? 0,
        active: counts.active ?? 0,
        delayed: counts.delayed ?? 0,
        failed: counts.failed ?? 0,
      });
    } catch {
      out.push({ name, waiting: 0, active: 0, delayed: 0, failed: 0 });
    }
  }
  return out;
}

async function tenancyStats(): Promise<PlatformOpsSnapshot['tenancy']> {
  if (!process.env.DATABASE_URL) {
    return { tenants: 0, subscriptions: [] };
  }
  try {
    const pool = getPool();
    const hasTenants = await pool.query(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'platform' AND table_name = 'tenants'
      ) AS ok
    `);
    if (!hasTenants.rows[0]?.ok) {
      return { tenants: 0, subscriptions: [] };
    }
    const countRes = await pool.query<{ c: string }>('SELECT COUNT(*)::text AS c FROM platform.tenants');
    const subsRes = await pool.query<{
      tenant_name: string;
      slug: string;
      status: string;
      seats: number;
      used_seats: number;
    }>(`
      SELECT t.name AS tenant_name, t.slug, COALESCE(s.status::text, t.status::text) AS status,
             COALESCE(s.seats, 0) AS seats, COALESCE(s.used_seats, 0) AS used_seats
      FROM platform.tenants t
      LEFT JOIN platform.subscriptions s ON s.tenant_id = t.id
      ORDER BY t.created_at DESC
      LIMIT 50
    `);
    return {
      tenants: Number(countRes.rows[0]?.c ?? 0),
      subscriptions: subsRes.rows.map((r) => {
        const seats = Number(r.seats) || 1;
        const used = Number(r.used_seats) || 0;
        const seatPressurePercent = Math.min(100, Math.round((used / seats) * 100));
        return {
          tenantName: r.tenant_name,
          slug: r.slug,
          status: r.status,
          seats,
          usedSeats: used,
          seatPressurePercent,
        };
      }),
    };
  } catch {
    return { tenants: 0, subscriptions: [] };
  }
}

export type ProdRuntimeStatus = {
  smtp: { configured: boolean; mode: string };
  kms: { keyVersion: string; configured: boolean };
  backup: { policy: string; lastRun?: string };
  persistence: { finance: boolean; crm: boolean };
  redisRequiredInProd: boolean;
};

export function getProdRuntimeStatus(): ProdRuntimeStatus {
  const redisRequiredInProd = process.env.NODE_ENV === 'production';
  return {
    smtp: {
      configured: Boolean(process.env.SMTP_HOST && process.env.SMTP_FROM),
      mode: process.env.SMTP_HOST ? 'smtp' : 'disabled',
    },
    kms: {
      keyVersion: process.env.KMS_KEY_VERSION ?? 'v1',
      configured: Boolean(process.env.KMS_MASTER_KEY || process.env.KMS_KEY_VERSION),
    },
    backup: {
      policy: process.env.BACKUP_POLICY ?? 'daily-pg-dump',
      lastRun: process.env.BACKUP_LAST_RUN,
    },
    persistence: {
      finance: process.env.FINANCE_PERSISTENCE === '1' || process.env.FINANCE_PERSISTENCE === 'true',
      crm: process.env.CRM_PERSISTENCE === '1' || process.env.CRM_PERSISTENCE === 'true',
    },
    redisRequiredInProd,
  };
}

export async function getPlatformOpsSnapshot(): Promise<PlatformOpsSnapshot> {
  const [database, redis, queues, tenancy] = await Promise.all([
    schemaStats(),
    redisStats(),
    queueStats(),
    tenancyStats(),
  ]);
  return { database, redis, queues, tenancy };
}
