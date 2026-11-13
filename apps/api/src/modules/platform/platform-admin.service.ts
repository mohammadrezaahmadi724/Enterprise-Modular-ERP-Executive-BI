import { DEFAULT_PLAN_ROLE_TEMPLATES, PERMISSION_CATALOG } from '@repo/contracts';
import { platformDb } from '../../prisma/platform-db';
import { listPlansWithModules, loadModuleCatalog } from './pricing-catalog.service';
import {
  mapSupportTicketRow,
  ticketPriorityFromFa,
  ticketStatusFromFa,
} from './support-ticket-presenter';

function mapTenantStatus(status: string) {
  if (status === 'Active') return 'فعال';
  if (status === 'Trial') return 'آزمایشی';
  if (status === 'Suspended') return 'معلق';
  if (status === 'Churned') return 'لغوشده';
  return status;
}

function mapTenantAdminRow(t: {
  id: string;
  name: string;
  slug: string;
  status: string;
  subscription?: { seats?: number; planVersion?: { plan?: { code?: string } } } | null;
}) {
  return {
    id: t.id,
    name: t.name,
    slug: t.slug,
    plan: t.subscription?.planVersion?.plan?.code ?? '—',
    seats: t.subscription?.seats ?? 0,
    status: mapTenantStatus(t.status),
  };
}

function parseTenantStatusFa(value: unknown): 'Active' | 'Trial' | 'Suspended' | 'Churned' {
  const v = String(value ?? '');
  if (v === 'فعال' || v === 'Active') return 'Active';
  if (v === 'معلق' || v === 'Suspended') return 'Suspended';
  if (v === 'لغوشده' || v === 'Churned') return 'Churned';
  return 'Trial';
}

export type AdminResource =
  | 'tenants'
  | 'users'
  | 'roles'
  | 'permissions'
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
        .map((t) => mapTenantAdminRow(t))
        .filter((r) => !query || JSON.stringify(r).toLowerCase().includes(query));
    }
    case 'permissions': {
      const rows = await platformDb.permission.findMany({ orderBy: { code: 'asc' }, take: 500 });
      return rows
        .map((p) => {
          const meta = PERMISSION_CATALOG.find((c) => c.code === p.code);
          return {
            id: p.id,
            code: p.code,
            label: meta?.labelFa ?? p.description,
            module: meta?.module ?? '—',
            description: p.description,
            status: 'فعال',
          };
        })
        .filter((row) => !query || JSON.stringify(row).toLowerCase().includes(query));
    }
    case 'roles': {
      const rows = await platformDb.role.findMany({
        include: {
          assignments: { select: { id: true } },
        },
        orderBy: [{ tenantId: 'asc' }, { code: 'asc' }],
        take: 400,
      });
      return rows
        .map((r) => ({
          id: r.id,
          code: r.code,
          name: r.name,
          tenant: r.tenantId ?? 'platform',
          permissions: Array.isArray(r.permissions)
            ? (r.permissions as string[]).join(', ')
            : typeof r.permissions === 'object' && r.permissions !== null
              ? Object.keys(r.permissions as Record<string, unknown>).join(', ')
              : String(r.permissions),
          assignees: r.assignments.length,
          status: 'فعال',
        }))
        .filter((row) => !query || JSON.stringify(row).toLowerCase().includes(query));
    }
    case 'users': {
      const rows = await platformDb.user.findMany({
        include: {
          tenant: { select: { slug: true, name: true } },
          userRoles: { include: { role: { select: { code: true, name: true } } } },
        },
        orderBy: { createdAt: 'desc' },
        take: 400,
      });
      return rows
        .map((u) => ({
          id: u.id,
          email: u.email,
          fullName: u.fullName,
          tenant: u.tenant?.slug ?? (u.isSuperAdmin ? 'platform' : '—'),
          roles: u.userRoles.map((ur) => ur.role.code).join(', ') || '—',
          isSuperAdmin: u.isSuperAdmin ? 'بله' : 'خیر',
          lastLogin: u.lastLoginAt?.toISOString().slice(0, 10) ?? '—',
          status: u.isSuperAdmin ? 'سوپرادمین' : u.tenantId ? 'فعال' : 'بدون tenant',
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
        roleTemplates: DEFAULT_PLAN_ROLE_TEMPLATES.length,
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
      const rows = await platformDb.supportTicket.findMany({ orderBy: { createdAt: 'desc' }, take: 300 });
      return rows
        .map((t) => mapSupportTicketRow(t))
        .filter((r) => !query || JSON.stringify(r).toLowerCase().includes(query));
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
    case 'tenants': {
      const created = await platformDb.tenant.create({
        data: {
          name: String(body.name ?? 'Tenant جدید'),
          slug: String(body.slug ?? `tenant-${Date.now()}`),
          status: parseTenantStatusFa(body.status),
        },
        include: { subscription: { include: { planVersion: { include: { plan: true } } } } },
      });
      return mapTenantAdminRow(created);
    }
    case 'tickets': {
      let tenantId: string | null = null;
      const tenantRef = body.tenant ? String(body.tenant).trim() : '';
      if (tenantRef) {
        const bySlug = await platformDb.tenant.findFirst({ where: { slug: tenantRef } });
        const byId = bySlug ?? (await platformDb.tenant.findFirst({ where: { id: tenantRef } }));
        tenantId = byId?.id ?? null;
      }
      return platformDb.supportTicket.create({
        data: {
          subject: String(body.subject ?? 'بدون موضوع'),
          priority: String(body.priority ?? 'normal'),
          status: String(body.status ?? 'open'),
          tenantId,
        },
      });
    }
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
    case 'roles':
      return platformDb.role.create({
        data: {
          tenantId: body.tenant && body.tenant !== 'platform' ? String(body.tenant) : null,
          code: String(body.code ?? 'TEMPLATE'),
          name: String(body.name ?? 'نقش'),
          permissions: String(body.permissions ?? '')
            .split(',')
            .map((p) => p.trim())
            .filter(Boolean),
        },
      });
    case 'permissions':
      return platformDb.permission.create({
        data: {
          code: String(body.code),
          description: String(body.description ?? body.label ?? ''),
        },
      });
    default:
      return { id: crypto.randomUUID(), ...body };
  }
}

export async function updateAdminResource(resource: AdminResource, id: string, body: Record<string, unknown>) {
  switch (resource) {
    case 'tenants': {
      const updated = await platformDb.tenant.update({
        where: { id },
        data: {
          name: body.name ? String(body.name) : undefined,
          slug: body.slug ? String(body.slug) : undefined,
          status: body.status ? parseTenantStatusFa(body.status) : undefined,
        },
        include: { subscription: { include: { planVersion: { include: { plan: true } } } } },
      });
      return mapTenantAdminRow(updated);
    }
    case 'tickets':
      return platformDb.supportTicket.update({
        where: { id },
        data: {
          subject: body.subject ? String(body.subject) : undefined,
          priority: body.priority
            ? ticketPriorityFromFa(String(body.priority))
            : undefined,
          status: body.status ? ticketStatusFromFa(String(body.status)) : undefined,
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
    case 'roles': {
      const perms =
        body.permissions && typeof body.permissions === 'string'
          ? body.permissions
              .split(',')
              .map((p) => p.trim())
              .filter(Boolean)
          : undefined;
      return platformDb.role.update({
        where: { id },
        data: {
          name: body.name ? String(body.name) : undefined,
          permissions: perms ?? undefined,
        },
      });
    }
    case 'permissions':
      return platformDb.permission.update({
        where: { id },
        data: {
          code: body.code ? String(body.code) : undefined,
          description: body.description ? String(body.description) : undefined,
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
