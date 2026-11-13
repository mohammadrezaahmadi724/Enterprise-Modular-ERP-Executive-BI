import { BadRequestException } from '@nestjs/common';
import { platformDb } from '../../prisma/platform-db';

export async function countActiveTenantUsers(tenantId: string): Promise<number> {
  try {
    return await platformDb.user.count({
      where: { tenantId, isSuperAdmin: false, accountStatus: 'Active' },
    });
  } catch {
    const rows = await platformDb.user.findMany({
      where: { tenantId, isSuperAdmin: false },
      select: { id: true },
    });
    return rows.length;
  }
}

export async function syncSubscriptionUsedSeats(tenantId: string): Promise<number> {
  const used = await countActiveTenantUsers(tenantId);
  await platformDb.subscription.updateMany({
    where: { tenantId },
    data: { usedSeats: used },
  });
  return used;
}

export async function assertSeatAvailable(tenantId: string): Promise<void> {
  const sub = await platformDb.subscription.findUnique({ where: { tenantId } });
  if (!sub) return;
  const used = await countActiveTenantUsers(tenantId);
  if (used >= sub.seats) {
    throw new BadRequestException({
      code: 'SEAT_LIMIT',
      message: 'سقف صندلی اشتراک پر است.',
      seats: sub.seats,
      used,
    });
  }
}
