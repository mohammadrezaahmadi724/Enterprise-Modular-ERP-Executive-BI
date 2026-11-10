import { platformDb } from '../../prisma/platform-db';

function screenKeyFromHref(href: string) {
  return href.replace(/^\//, '').replace(/\//g, '.');
}

export async function listErpRecords(tenantId: string, href: string, q?: string) {
  const screenKey = screenKeyFromHref(href);
  const rows = await platformDb.erpScreenRecord.findMany({
    where: { tenantId, screenKey },
    orderBy: { updatedAt: 'desc' },
    take: 500,
  });
  const query = q?.trim().toLowerCase();
  return rows
    .map((r) => ({ id: r.id, ...(r.payload as Record<string, unknown>) }))
    .filter((r) => !query || JSON.stringify(r).toLowerCase().includes(query));
}

export async function createErpRecord(tenantId: string, href: string, payload: Record<string, unknown>) {
  const screenKey = screenKeyFromHref(href);
  const row = await platformDb.erpScreenRecord.create({
    data: { tenantId, screenKey, payload },
  });
  return { id: row.id, ...payload };
}

export async function updateErpRecord(tenantId: string, id: string, payload: Record<string, unknown>) {
  const existing = await platformDb.erpScreenRecord.findFirst({ where: { id, tenantId } });
  if (!existing) throw new Error('not_found');
  const merged = { ...(existing.payload as Record<string, unknown>), ...payload, id };
  await platformDb.erpScreenRecord.update({
    where: { id },
    data: { payload: merged },
  });
  return merged;
}

export async function deleteErpRecord(tenantId: string, id: string) {
  await platformDb.erpScreenRecord.deleteMany({ where: { id, tenantId } });
  return { ok: true };
}

export async function seedErpRecordsIfEmpty(tenantId: string, href: string, seeds: Record<string, unknown>[]) {
  const screenKey = screenKeyFromHref(href);
  const count = await platformDb.erpScreenRecord.count({ where: { tenantId, screenKey } });
  if (count > 0) return;
  for (const s of seeds) {
    await platformDb.erpScreenRecord.create({ data: { tenantId, screenKey, payload: s } });
  }
}
