import { randomUUID } from 'node:crypto';

export type PlanVersionSnapshot = {
  planVersionId: string;
  version: number;
  pricingModel: string;
  basePrice: number;
  features: Record<string, string>;
};

export type BillingSubscriptionRecord = {
  id: string;
  tenantId: string;
  planSnapshot: PlanVersionSnapshot;
  seats: number;
};

const planVersions = new Map<string, PlanVersionSnapshot>();
const subscriptions = new Map<string, BillingSubscriptionRecord>();

export function resetPlanVersionStore(): void {
  planVersions.clear();
  subscriptions.clear();
}

export function registerPlanVersion(snapshot: PlanVersionSnapshot): void {
  planVersions.set(snapshot.planVersionId, snapshot);
}

export function createBillingSubscription(
  tenantId: string,
  planVersionId: string,
  seats: number,
): BillingSubscriptionRecord {
  const pv = planVersions.get(planVersionId);
  if (!pv) throw new Error('Plan version not found');
  const sub: BillingSubscriptionRecord = {
    id: randomUUID(),
    tenantId,
    planSnapshot: { ...pv },
    seats,
  };
  subscriptions.set(sub.id, sub);
  return sub;
}

/** تغییر planVersion جدید نباید snapshot اشتراک قبلی را عوض کند */
export function updatePlanVersion(planVersionId: string, patch: Partial<PlanVersionSnapshot>): void {
  const current = planVersions.get(planVersionId);
  if (!current) return;
  planVersions.set(planVersionId, { ...current, ...patch, planVersionId, version: current.version + 1 });
}

export function getSubscriptionSnapshot(subscriptionId: string): PlanVersionSnapshot | undefined {
  return subscriptions.get(subscriptionId)?.planSnapshot;
}
