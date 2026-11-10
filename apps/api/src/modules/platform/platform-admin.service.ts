import { platformDb } from '../../prisma/platform-db';
import { listPlansWithModules, loadModuleCatalog } from './pricing-catalog.service';

export type AdminResource =
  | 'tenants'
  | 'subscriptions'
  | 'plans'
  | 'billing'
  | 'tickets'
  | 'modules'
  | 'audit'
  | 'break-glass'
  | 'feature-flags';

export async function listAdminResource(resource: AdminResource, q?: string) {
  const query = q?.trim().toLowerCase();
  switch (resource) {
    case 'tenants': {
      const rows = await platformDb.tenant.findMany({
        include: { subscription: { include: { planVersion: { include: { plan: true } } } } },
        orderBy: { createdAt: 'desc' },
        take: 200,
      });
      return rows
        .map((t) => ({
          id: t.id,
          name: t.name,
          slug: t.slug,
          plan: t.subscription?.planVersion?.plan?.code ?? '—',
          seats: t.subscription?.seats ?? 0,
          status: t.status,
        }))
        .filter((r) => !query || JSON.stringify(r).toLowerCase().includes(query));
    }
    case 'subscriptions': {
      const rows = await platformDb.subscription.findMany({
        include: { tenant: true, planVersion: { include: { plan: true } } },
        take: 200,
      });
      return rows.map((s) => ({
        id: s.id,
        tenant: s.tenant.slug,
        plan: s.planVersion.plan.code,
        mrr: Number(s.planVersion.basePrice),
        renewAt: s.currentPeriodEnd.toISOString().slice(0, 10),
        status: s.status,
      }));
    }
    case 'plans': {
      const rows = await listPlansWithModules();
      return rows.map((p) => ({
        id: p.id,
        code: p.code,
        name: p.nameFa,
        price: p.basePrice,
        version: `v${p.version || 1}`,
        modulesCount: p.includedModules.length,
        status: p.isActive ? 'منتشرشده' : 'غیرفعال',
      }));
    }
    case 'billing': {
      const rows = await platformDb.invoice.findMany({
        orderBy: { createdAt: 'desc' },
        take: 200,
      });
      return rows.map((i) => ({
        id: i.id,
        invoice: i.invoiceNumber,
        tenant: i.tenantId,
        amount: Number(i.total),
        paidAt: i.status === 'Paid' ? i.issueDate.toISOString().slice(0, 10) : '—',
        status: i.status,
      }));
    }
    case 'tickets': {
      const rows = await platformDb.supportTicket.findMany({ orderBy: { createdAt: 'desc' }, take: 200 });
      return rows.map((t) => {
        const meta = t.metadata as {
          meetingType?: string;
          jalaliDate?: string;
          timeSlot?: string;
          estimateId?: string | null;
          moduleCodes?: string[];
          contact?: { fullName?: string; company?: string; phone?: string };
        } | null;
        const extra =
          t.category === 'meeting_request' && meta?.jalaliDate
            ? [meta.jalaliDate, meta.timeSlot].filter(Boolean).join(' · ')
            : '—';
        const categoryLabel =
          t.category === 'meeting_request'
            ? 'رزرو جلسه'
            : t.category === 'estimate'
              ? 'برآورد'
              : t.category;
        const lead =
          t.category === 'meeting_request' && meta?.contact?.company
            ? meta.contact.company
            : t.tenantId ?? 'سرنخ وب';
        const subject =
          t.category === 'meeting_request' && meta?.contact?.fullName
            ? `${t.subject} (${meta.contact.fullName})`
            : t.subject;
        return {
          id: t.id,
          code: t.id.slice(0, 8),
          tenant: lead,
          subject,
          category: categoryLabel,
          slot: extra,
          priority: t.priority,
          status: t.status,
        };
      });
    }
    case 'modules': {
      const { modules } = await loadModuleCatalog();
      return modules.map((m) => ({
        id: m.code,
        code: m.code,
        name: m.nameFa,
        subtitle: m.subtitle,
        listPriceIrr: m.listPriceIrr,
        color: m.color,
        version: `v${3}`,
        status: m.active ? 'فعال' : 'غیرفعال',
      }));
    }
    case 'audit': {
      const rows = await platformDb.auditLog.findMany({ orderBy: { createdAt: 'desc' }, take: 200 });
      return rows.map((a) => ({
        id: a.id,
        actor: a.userId,
        action: a.action,
        resource: `${a.entityType}:${a.entityId}`,
        at: a.createdAt.toISOString(),
        result: 'موفق',
      }));
    }
    case 'break-glass': {
      const rows = await platformDb.breakGlassRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
      return rows.map((b) => ({
        id: b.id,
        session: b.id.slice(0, 8),
        tenant: b.tenantId,
        approver: b.approverId,
        expires: b.expiresAt?.toISOString() ?? '—',
        status: b.status,
      }));
    }
    case 'feature-flags': {
      const rows = await platformDb.platformFeatureFlag.findMany({ take: 200 });
      return rows.map((f) => ({
        id: f.id,
        key: f.flagKey,
        description: f.description,
        rollout: f.rollout,
        status: f.enabled ? 'فعال' : 'غیرفعال',
      }));
    }
    default:
      return [];
  }
}

export async function createAdminResource(resource: AdminResource, body: Record<string, unknown>) {
  switch (resource) {
    case 'tenants':
      return platformDb.tenant.create({
        data: {
          name: String(body.name ?? 'Tenant جدید'),
          slug: String(body.slug ?? `tenant-${Date.now()}`),
          status:
            body.status === 'فعال' || body.status === 'Active'
              ? 'Active'
              : body.status === 'معلق' || body.status === 'Suspended'
                ? 'Suspended'
                : 'Trial',
        },
      });
    case 'tickets':
      return platformDb.supportTicket.create({
        data: {
          subject: String(body.subject ?? 'بدون موضوع'),
          priority: String(body.priority ?? 'normal'),
          status: String(body.status ?? 'open'),
          tenantId: body.tenant ? String(body.tenant) : null,
        },
      });
    case 'feature-flags':
      return platformDb.platformFeatureFlag.create({
        data: {
          flagKey: String(body.key ?? `flag.${Date.now()}`),
          description: String(body.description ?? ''),
          rollout: Number(body.rollout ?? 100),
          enabled: body.status !== 'غیرفعال',
        },
      });
    case 'plans':
      return platformDb.plan.create({
        data: {
          code: String(body.code),
          nameFa: String(body.name ?? body.code),
          description: 'ایجاد از Admin',
          isActive: true,
        },
      });
    default:
      return { id: crypto.randomUUID(), ...body };
  }
}

export async function updateAdminResource(resource: AdminResource, id: string, body: Record<string, unknown>) {
  switch (resource) {
    case 'tenants':
      return platformDb.tenant.update({
        where: { id },
        data: {
          name: body.name ? String(body.name) : undefined,
          slug: body.slug ? String(body.slug) : undefined,
          status: body.status
            ? (String(body.status) as 'Active' | 'Trial' | 'Suspended' | 'Churned')
            : undefined,
        },
      });
    case 'tickets':
      return platformDb.supportTicket.update({
        where: { id },
        data: {
          subject: body.subject ? String(body.subject) : undefined,
          priority: body.priority ? String(body.priority) : undefined,
          status: body.status ? String(body.status) : undefined,
        },
      });
    case 'feature-flags':
      return platformDb.platformFeatureFlag.update({
        where: { id },
        data: {
          flagKey: body.key ? String(body.key) : undefined,
          description: body.description ? String(body.description) : undefined,
          rollout: body.rollout !== undefined ? Number(body.rollout) : undefined,
          enabled: body.status ? String(body.status) !== 'غیرفعال' : undefined,
        },
      });
    default:
      return { id, ...body };
  }
}

export async function deleteAdminResource(resource: AdminResource, id: string) {
  switch (resource) {
    case 'tenants':
      await platformDb.tenant.delete({ where: { id } });
      return { ok: true };
    case 'tickets':
      await platformDb.supportTicket.delete({ where: { id } });
      return { ok: true };
    case 'feature-flags':
      await platformDb.platformFeatureFlag.delete({ where: { id } });
      return { ok: true };
    default:
      return { ok: true };
  }
}
