import { randomUUID } from 'node:crypto';
import { calculatePrice } from '../pricing/engine';
import { nextInvoiceNumber, initSerialPattern } from './invoice-serial';
import { createBillingSubscription, registerPlanVersion } from './plan-versioning';

export const BILLING_EVENTS = {
  SUBSCRIPTION_PURCHASED: 'platform.subscription.purchased.v1',
  SUBSCRIPTION_RENEWED: 'platform.subscription.renewed.v1',
  INVOICE_ISSUED: 'platform.invoice.issued.v1',
  PAYMENT_SUCCEEDED: 'platform.payment.succeeded.v1',
  REFUND_APPROVED: 'platform.refund.approved.v1',
} as const;

type IdempotencyStore = Map<string, { status: string; body: unknown }>;

const paymentsByKey: IdempotencyStore = new Map();
const checkoutByKey = new Map<
  string,
  { status: 'ReadyForPayment' | 'PendingApproval' | 'PeriodLocked'; planCode: string; total: number; discountPercent: number }
>();
const outbox: Array<{ type: string; payload: unknown }> = [];

export function resetBillingStore(): void {
  paymentsByKey.clear();
  checkoutByKey.clear();
  subscriptionByTenant.clear();
  outbox.length = 0;
  initSerialPattern('default', 'INV-{seq}-1404', 'Yearly');
}

export function getBillingOutbox() {
  return [...outbox];
}

export function createSubscription(input: {
  tenantId: string;
  planVersionId: string;
  seats: number;
  pricingModel: 'Flat' | 'PerSeat';
  basePrice: number;
}) {
  registerPlanVersion({
    planVersionId: input.planVersionId,
    version: 1,
    pricingModel: input.pricingModel,
    basePrice: input.basePrice,
    features: {},
  });
  const sub = createBillingSubscription(input.tenantId, input.planVersionId, input.seats);
  outbox.push({ type: BILLING_EVENTS.SUBSCRIPTION_PURCHASED, payload: { tenantId: input.tenantId, subId: sub.id } });
  return sub;
}

export function issueInvoice(tenantId: string, amount: number) {
  const invoiceNumber = nextInvoiceNumber('default');
  outbox.push({ type: BILLING_EVENTS.INVOICE_ISSUED, payload: { tenantId, invoiceNumber, amount } });
  return { id: randomUUID(), tenantId, invoiceNumber, total: amount };
}

export function recordPayment(input: {
  tenantId: string;
  idempotencyKey: string;
  amount: number;
  currency: string;
  exchangeRateSnapshot: { base: string; rate: number };
}) {
  const key = `${input.tenantId}:${input.idempotencyKey}`;
  const cached = paymentsByKey.get(key);
  if (cached) return { cached: true, ...cached };

  const payment = {
    id: randomUUID(),
    status: 'Succeeded',
    body: { amount: input.amount, currency: input.currency, fx: input.exchangeRateSnapshot },
  };
  paymentsByKey.set(key, payment);
  outbox.push({ type: BILLING_EVENTS.PAYMENT_SUCCEEDED, payload: payment });
  return { cached: false, ...payment };
}

export function refundWithOriginalRate(input: {
  paymentAmount: number;
  paymentCurrency: string;
  paymentRate: number;
  refundCurrency: string;
  currentRate: number;
}) {
  const amountInBase = input.paymentAmount / input.paymentRate;
  return {
    refundAmount: amountInBase * input.paymentRate,
    currency: input.paymentCurrency,
    usedRate: input.paymentRate,
    ignoredCurrentRate: input.currentRate,
  };
}

export function previewCheckoutPrice(basePrice: number, seats: number) {
  return calculatePrice({ model: 'PerSeat', basePrice, seats });
}

export function processCheckout(input: {
  tenantId: string;
  idempotencyKey: string;
  planCode: string;
  seats: number;
  basePrice: number;
  discountPercent: number;
  periodClosed?: boolean;
}) {
  if (input.periodClosed) {
    return {
      cached: false as const,
      status: 'PeriodLocked' as const,
      planCode: input.planCode,
      total: 0,
      discountPercent: input.discountPercent,
    };
  }

  const key = `${input.tenantId}:${input.idempotencyKey}`;
  const hit = checkoutByKey.get(key);
  if (hit) return { cached: true as const, ...hit };

  const subtotal = previewCheckoutPrice(input.basePrice, input.seats);
  const total = Math.round(subtotal * (1 - input.discountPercent / 100));
  const needsApproval = input.discountPercent > 20;
  const status = needsApproval ? ('PendingApproval' as const) : ('ReadyForPayment' as const);
  const body = { status, planCode: input.planCode, total, discountPercent: input.discountPercent };
  checkoutByKey.set(key, body);

  if (needsApproval) {
    outbox.push({
      type: 'platform.checkout.pending_approval.v1',
      payload: { tenantId: input.tenantId, planCode: input.planCode, discountPercent: input.discountPercent },
    });
  } else {
    outbox.push({ type: BILLING_EVENTS.SUBSCRIPTION_PURCHASED, payload: { tenantId: input.tenantId, planCode: input.planCode, total } });
  }

  return { cached: false as const, ...body };
}

const subscriptionByTenant = new Map<string, { planCode: string; seats: number; seatLimit: number; modules: string[] }>();

export function getSubscriptionForTenant(requestingTenantId: string, targetTenantId: string) {
  if (requestingTenantId !== targetTenantId) {
    throw new Error('RLS_DENY_SUBSCRIPTION');
  }
  if (!subscriptionByTenant.has(targetTenantId)) {
    subscriptionByTenant.set(targetTenantId, { planCode: 'starter', seats: 1, seatLimit: 5, modules: ['finance'] });
  }
  return subscriptionByTenant.get(targetTenantId)!;
}

export function upgradeSubscription(tenantId: string, planCode: string, moduleSlug: string) {
  const cur = subscriptionByTenant.get(tenantId) ?? { planCode: 'starter', seats: 1, seatLimit: 5, modules: ['finance'] };
  const modules = cur.modules.includes(moduleSlug) ? cur.modules : [...cur.modules, moduleSlug];
  const next = { ...cur, planCode, modules };
  subscriptionByTenant.set(tenantId, next);
  outbox.push({ type: BILLING_EVENTS.SUBSCRIPTION_PURCHASED, payload: { tenantId, upgrade: true, moduleSlug } });
  return next;
}

export function seedSubscription(
  tenantId: string,
  data: { planCode: string; seats: number; seatLimit: number; modules: string[] },
): void {
  subscriptionByTenant.set(tenantId, { ...data });
}

export function addSeat(tenantId: string, idempotencyKey: string) {
  const key = `${tenantId}:seat:${idempotencyKey}`;
  const cur = getSubscriptionForTenant(tenantId, tenantId);
  if (cur.seats >= cur.seatLimit) {
    return { ok: false as const, reason: 'SEAT_LIMIT', needsUpgrade: true, seats: cur.seats, seatLimit: cur.seatLimit };
  }
  const cached = paymentsByKey.get(key);
  if (cached) return { ok: true as const, cached: true, seats: cur.seats + 1 };
  cur.seats += 1;
  subscriptionByTenant.set(tenantId, cur);
  paymentsByKey.set(key, { status: 'Succeeded', body: { seats: cur.seats } });
  return { ok: true as const, cached: false, seats: cur.seats, seatLimit: cur.seatLimit };
}
