import { platformDb } from '../../prisma/platform-db';
import type { ErpModuleCode } from '@repo/contracts';
import { syncSubscriptionUsedSeats } from '../tenant-rbac/tenant-seat.service';

const DEMO_TENANT = '11111111-1111-4111-8111-111111111111';

const PLATFORM_MODULE_TO_ERP: Record<string, ErpModuleCode> = {
  'finance-base': 'finance',
  'crm-base': 'sales',
  'operations-base': 'inventory',
  'hr-base': 'hr',
  'projects-base': 'inventory',
  'bi-risk-base': 'bi-risk',
};

export type TenantInvoiceDto = {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  status: string;
  totalTomans: number;
  currency: string;
};

export type TenantSubscriptionSummaryDto = {
  tenantId: string;
  planLabel: string;
  status: string;
  seats: number;
  usedSeats: number;
  currentPeriodEnd: string | null;
  activeErpModules: ErpModuleCode[];
  source: 'database' | 'demo';
};

function demoSummary(tenantId: string): TenantSubscriptionSummaryDto {
  return {
    tenantId,
    planLabel: 'Sakhtar Cloud — Lifetime Demo',
    status: 'Active',
    seats: 25,
    usedSeats: 3,
    currentPeriodEnd: null,
    activeErpModules: ['sales', 'finance', 'inventory', 'hr'],
    source: 'demo',
  };
}

function demoInvoices(tenantId: string): TenantInvoiceDto[] {
  const now = new Date();
  const lastMonth = new Date(now);
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  return [
    {
      id: `${tenantId}-inv-demo-1`,
      invoiceNumber: 'CLD-1403-00042',
      issueDate: now.toISOString(),
      dueDate: now.toISOString(),
      status: 'Demo',
      totalTomans: 18_500_000,
      currency: 'IRR',
    },
    {
      id: `${tenantId}-inv-demo-2`,
      invoiceNumber: 'CLD-1403-00031',
      issueDate: lastMonth.toISOString(),
      dueDate: lastMonth.toISOString(),
      status: 'Demo',
      totalTomans: 17_200_000,
      currency: 'IRR',
    },
  ];
}

function decimalToNumber(v: { toNumber?: () => number } | number | string): number {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v.toNumber === 'function') return v.toNumber();
  return Number(v);
}

async function resolveActiveErpModules(tenantId: string): Promise<ErpModuleCode[]> {
  try {
    const rows = await platformDb.tenantModule.findMany({
      where: { tenantId, status: 'Active' },
      select: { moduleCode: true },
    });
    const mapped = rows
      .map((r) => PLATFORM_MODULE_TO_ERP[r.moduleCode])
      .filter((c): c is ErpModuleCode => Boolean(c));
    if (mapped.length) return [...new Set(mapped)];
  } catch {
    /* DB unavailable */
  }
  if (tenantId === DEMO_TENANT) return demoSummary(tenantId).activeErpModules;
  return [];
}

export async function getTenantSubscriptionSummary(tenantId: string): Promise<TenantSubscriptionSummaryDto> {
  try {
    const sub = await platformDb.subscription.findUnique({
      where: { tenantId },
      include: { planVersion: { include: { plan: true } } },
    });
    if (!sub) return demoSummary(tenantId);

    const snap = sub.planSnapshot as { displayNameFa?: string; nameFa?: string } | null;
    const planLabel =
      snap?.displayNameFa ||
      snap?.nameFa ||
      sub.planVersion?.plan?.nameFa ||
      sub.planVersion?.plan?.code ||
      'Sakhtar Cloud';

    const activeErpModules = await resolveActiveErpModules(tenantId);
    const usedSeats = await syncSubscriptionUsedSeats(tenantId);

    return {
      tenantId,
      planLabel,
      status: sub.status,
      seats: sub.seats,
      usedSeats,
      currentPeriodEnd: sub.currentPeriodEnd.toISOString(),
      activeErpModules: activeErpModules.length ? activeErpModules : demoSummary(tenantId).activeErpModules,
      source: 'database',
    };
  } catch {
    return demoSummary(tenantId);
  }
}

export async function listTenantInvoices(tenantId: string): Promise<{ invoices: TenantInvoiceDto[] }> {
  try {
    const rows = await platformDb.invoice.findMany({
      where: { tenantId },
      orderBy: { issueDate: 'desc' },
      take: 100,
    });
    if (!rows.length) {
      return { invoices: tenantId === DEMO_TENANT ? demoInvoices(tenantId) : [] };
    }
    return {
      invoices: rows.map((row) => ({
        id: row.id,
        invoiceNumber: row.invoiceNumber,
        issueDate: row.issueDate.toISOString(),
        dueDate: row.dueDate.toISOString(),
        status: row.status,
        totalTomans: decimalToNumber(row.total),
        currency: row.currency,
      })),
    };
  } catch {
    return { invoices: demoInvoices(tenantId) };
  }
}
