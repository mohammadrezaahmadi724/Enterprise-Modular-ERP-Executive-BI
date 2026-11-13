import { PrismaClient } from '@repo/db-platform';
import { logger } from '@repo/observability';

const prisma = new PrismaClient();
const API_URL = (process.env.API_URL ?? 'http://127.0.0.1:3000').replace(/\/$/, '');
const SCAN_INTERVAL_MS = Number(process.env.WMS_EXPIRY_SCAN_MS ?? 6 * 3_600_000);

async function scanTenantExpiry(tenantId: string): Promise<void> {
  const day = new Date().toISOString().slice(0, 10);
  const idempotencyKey = `wms-expiry-scan:${tenantId}:${day}`;
  const res = await fetch(`${API_URL}/api/v1/wms/batches/expiry-scan?withinDays=30`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-tenant-id': tenantId,
      'x-user-id': '00000000-0000-4000-8000-000000000099',
      'x-correlation-id': idempotencyKey,
      'Idempotency-Key': idempotencyKey,
    },
    body: '{}',
  });
  if (!res.ok) {
    const text = await res.text();
    logger.warn({ tenantId, status: res.status, body: text.slice(0, 120) }, 'WMS expiry scan HTTP failed');
    return;
  }
  const body = (await res.json()) as { expired: number; expiringCount: number };
  logger.info({ tenantId, ...body }, 'WMS expiry scan completed');
}

export function startWmsExpiryScanWorker(): { close: () => Promise<void> } {
  const tick = async () => {
    try {
      const tenants = await prisma.tenant.findMany({
        where: { status: { in: ['Active', 'Trial'] } },
        select: { id: true },
        take: 100,
      });
      const fallback = process.env.DEFAULT_TENANT_ID;
      const ids = new Set(tenants.map((t) => t.id));
      if (fallback) ids.add(fallback);
      for (const tenantId of ids) {
        try {
          await scanTenantExpiry(tenantId);
        } catch (err) {
          logger.error({ tenantId, err }, 'WMS expiry scan tenant error');
        }
      }
    } catch (err) {
      logger.error({ err }, 'WMS expiry scan tick error');
    }
  };

  void tick();
  const handle = setInterval(() => void tick(), SCAN_INTERVAL_MS);

  return {
    close: async () => {
      clearInterval(handle);
      await prisma.$disconnect();
    },
  };
}
