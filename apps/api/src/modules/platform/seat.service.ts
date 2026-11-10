import { SeatLimitReachedError } from '@repo/domain';
import { PLATFORM_EVENTS } from '@repo/contracts';
import { randomUUID } from 'node:crypto';

type Subscription = {
  id: string;
  tenantId: string;
  maxSeats: number;
  usedSeats: number;
  version: number;
};

const subs = new Map<string, Subscription>();
const outbox: Array<{ type: string; tenantId: string }> = [];

export function resetSeatStore(): void {
  subs.clear();
  outbox.length = 0;
}

export function getSeatOutbox() {
  return [...outbox];
}

export function createSubscription(tenantId: string, maxSeats: number): Subscription {
  const sub: Subscription = {
    id: randomUUID(),
    tenantId,
    maxSeats,
    usedSeats: 0,
    version: 0,
  };
  subs.set(tenantId, sub);
  return sub;
}

export function allocateSeat(tenantId: string): Subscription {
  const sub = subs.get(tenantId);
  if (!sub) throw new Error('Subscription not found');
  if (sub.usedSeats >= sub.maxSeats) {
    outbox.push({ type: PLATFORM_EVENTS.SEAT_LIMIT_REACHED, tenantId });
    throw new SeatLimitReachedError(sub.maxSeats);
  }
  sub.usedSeats += 1;
  sub.version += 1;
  return sub;
}
