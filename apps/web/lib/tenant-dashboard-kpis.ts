export type DashboardKpiMap = Record<string, number>;

export async function fetchTenantDashboardKpis(tenantId?: string): Promise<DashboardKpiMap> {
  const q = tenantId ? `?tenantId=${encodeURIComponent(tenantId)}` : '';
  const res = await fetch(`/api/bi/kpis${q}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`kpis: ${res.status}`);
  const body = (await res.json()) as { kpis: DashboardKpiMap };
  return body.kpis;
}

/** نمایش میلیون تومان از مبلغ پایه (ریال/تومان) */
export function formatMillionsFa(amount: number, scale = 10_000_000): string {
  const millions = amount / scale;
  return new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 1 }).format(millions);
}

export function formatBillionsFa(amount: number, scale = 10_000_000_000): string {
  const billions = amount / scale;
  return new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 2 }).format(billions);
}

export function formatIntegerFa(n: number): string {
  return new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 }).format(n);
}
