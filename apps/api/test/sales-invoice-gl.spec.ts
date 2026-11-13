import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { resetJournalStore, resetWorkflowEngine } from '@repo/db-erp-finance';
import { createInvoice, createQuote, postInvoice } from '../src/modules/sales/sales.service';

const TENANT = '11111111-1111-4111-8111-111111111111';
const USER = '00000000-0000-4000-8000-000000000001';

const LINE = {
  sku: 'PRD-1',
  description: 'تست',
  quantity: 1,
  unit: 'عدد',
  unitPriceRial: 10_000,
  discountRial: 0,
  lineTotalRial: 10_000,
};

describe('sales invoice GL bridge', () => {
  beforeEach(() => {
    resetJournalStore();
    resetWorkflowEngine();
  });

  it('posts draft invoice to GL with balanced entry', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: USER, correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const quote = await createQuote({ accountCode: 'CUS-T', lines: [LINE] });
        expect(quote.number.startsWith('QT-')).toBe(true);

        const invoice = await createInvoice({
          customerName: 'تست',
          orderNumber: 'SO-TEST',
          lines: [LINE],
        });
        expect(invoice.status).toBe('draft');

        const posted = await postInvoice(invoice.number, USER);
        expect(posted.status).toBe('posted');
        expect(posted.glJournalId).toBeTruthy();
        expect(posted.glDocNumber).toMatch(/^N-/);
      },
    );
  });
});
