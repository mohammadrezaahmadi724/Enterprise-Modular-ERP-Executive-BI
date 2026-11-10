import { beforeEach, describe, expect, it } from 'vitest';
import { createSubscription, getBillingOutbox, issueInvoice, recordPayment, resetBillingStore } from '@repo/db-platform';
import {
  appendMessage,
  resetAiStore,
  resetMessagingStore,
  resetUsageStore,
  resetVoipStore,
  sendOutboundMessage,
  startConversation,
  completeCall,
} from '@repo/db-erp-operations';

const TENANT = '11111111-1111-4111-8111-111111111111';

describe('E2E full platform flow — Wave 5', () => {
  beforeEach(() => {
    resetBillingStore();
    resetAiStore();
    resetMessagingStore();
    resetVoipStore();
    resetUsageStore();
  });

  it('Register → Subscribe → Use Module → Invoice → Payment → Support (messaging)', () => {
    createSubscription({
      tenantId: TENANT,
      planVersionId: 'plan-pro-v1',
      seats: 5,
      pricingModel: 'Flat',
      basePrice: 5_000_000,
    });

    const conv = startConversation(TENANT, 'admin', 'support');
    appendMessage(conv.id, 'user', 'نیاز به پشتیبانی', 40, 'gpt', 'ai-use-1');

    sendOutboundMessage({
      tenantId: TENANT,
      channel: 'SMS',
      toAddress: '+989121234567',
      content: 'تیکت شما ثبت شد',
      idempotencyKey: 'sms-support-1',
    });

    completeCall({
      tenantId: TENANT,
      direction: 'Outbound',
      fromNumber: '02191000000',
      toNumber: '+989121234567',
      durationSec: 90,
      idempotencyKey: 'voip-1',
      transcript: 'مشتری درخواست فاکتور دارد',
    });

    issueInvoice(TENANT, 5_000_000);
    recordPayment({
      tenantId: TENANT,
      idempotencyKey: 'pay-full-flow',
      amount: 5_000_000,
      currency: 'IRR',
      exchangeRateSnapshot: { base: 'IRR', rate: 1 },
    });

    const outbox = getBillingOutbox();
    expect(outbox.some((e) => e.type.includes('subscription'))).toBe(true);
    expect(outbox.some((e) => e.type.includes('payment'))).toBe(true);
  });
});
