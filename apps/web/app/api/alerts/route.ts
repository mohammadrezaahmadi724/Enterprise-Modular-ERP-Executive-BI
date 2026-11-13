import {
  acknowledgeAlert,
  createAlert,
  dismissAlert,
  listAlerts,
  markSeen,
  resetAlertStore,
  unseenCount,
} from '@repo/db-alerts';
import { INTEGRATION_EVENTS } from '@repo/contracts';

const DEMO_TENANT = '11111111-1111-4111-8111-111111111111';

function seed() {
  if (listAlerts(DEMO_TENANT).length > 0) return;
  createAlert({
    tenantId: DEMO_TENANT,
    moduleCode: 'platform',
    category: 'backup',
    severity: 'critical',
    titleFa: 'شکست پشتیبان‌گیری',
    bodyFa: 'Restore drill ناموفق بود',
    deduplicationKey: 'seed-backup',
    deduplicationWindowSec: 300,
    actionUrl: '/alerts',
  });
  createAlert({
    tenantId: DEMO_TENANT,
    moduleCode: 'finance',
    category: INTEGRATION_EVENTS.BACKUP_FAILED,
    severity: 'warning',
    titleFa: 'هشدار مالی',
    bodyFa: 'نیاز به بررسی',
    deduplicationKey: 'seed-fin',
    deduplicationWindowSec: 300,
  });
}

export async function GET() {
  seed();
  const alerts = listAlerts(DEMO_TENANT);
  return Response.json({
    unseen: unseenCount(DEMO_TENANT),
    latest: alerts.map((a) => ({
      id: a.id,
      titleFa: a.titleFa,
      severity: a.severity,
      seenAt: a.seenAt,
      acknowledgedAt: a.acknowledgedAt,
      createdAt: a.createdAt.toISOString(),
    })),
    items: alerts,
  });
}

export async function PATCH(req: Request) {
  const body = (await req.json()) as { action: string; ids: string[] };
  for (const id of body.ids ?? []) {
    if (body.action === 'seen') markSeen(id);
    if (body.action === 'dismiss') dismissAlert(id);
    if (body.action === 'ack') acknowledgeAlert(id);
  }
  return Response.json({ ok: true });
}

export async function POST(req: Request) {
  let body: { action?: string; titleFa?: string; bodyFa?: string; severity?: string; moduleCode?: string } = {};
  try {
    body = (await req.json()) as typeof body;
  } catch {
  }
  if (body.action === 'reset') {
    resetAlertStore();
    return Response.json({ ok: true });
  }
  if (body.titleFa?.trim()) {
    const alert = createAlert({
      tenantId: DEMO_TENANT,
      moduleCode: body.moduleCode?.trim() || 'platform',
      category: 'manual',
      severity: (body.severity as 'info' | 'warning' | 'critical') || 'info',
      titleFa: body.titleFa.trim(),
      bodyFa: body.bodyFa?.trim() || body.titleFa.trim(),
      deduplicationKey: `manual-${Date.now()}`,
      deduplicationWindowSec: 60,
      actionUrl: '/alerts',
    });
    return Response.json({ ok: true, item: alert });
  }
  resetAlertStore();
  return Response.json({ ok: true });
}
