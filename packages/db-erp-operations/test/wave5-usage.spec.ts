import { beforeEach, describe, expect, it } from 'vitest';
import {
  appendMessage,
  analyzeConversation,
  handleN8nExecution,
  resetAiStore,
  startConversation,
  getAiOutbox,
} from '../src/ai/ai.service.js';
import { resetUsageStore, recordUsage } from '../src/usage/usage.service.js';
import { INTEGRATION_EVENTS } from '@repo/contracts';

describe('Wave 5 — AI usage + n8n', () => {
  beforeEach(() => {
    resetAiStore();
    resetUsageStore();
  });

  it('کسر توکن با idempotencyKey', () => {
    const c = startConversation('t1', 'u1', 'web');
    appendMessage(c.id, 'assistant', 'سلام', 120, 'gpt-test', 'tok-1');
    appendMessage(c.id, 'assistant', 'سلام', 120, 'gpt-test', 'tok-1');
    const analyzed = analyzeConversation(c.id);
    expect(analyzed.analyses).toHaveLength(1);
  });

  it('n8n workflow outbox', () => {
    handleN8nExecution({
      tenantId: 't1',
      workflowCode: 'support-routing',
      executionId: 'ex-1',
      payload: { ok: true },
    });
    expect(getAiOutbox().some((e) => (e as { type: string }).type === INTEGRATION_EVENTS.N8N_WORKFLOW_EXECUTED)).toBe(
      true,
    );
  });

  it('usage_records idempotent', () => {
    const a = recordUsage({
      tenantId: 't1',
      resourceType: 'SMS',
      quantity: 1,
      unitCost: 100,
      referenceType: 'msg',
      referenceId: 'm1',
      idempotencyKey: 'sms-1',
    });
    const b = recordUsage({
      tenantId: 't1',
      resourceType: 'SMS',
      quantity: 1,
      unitCost: 100,
      referenceType: 'msg',
      referenceId: 'm1',
      idempotencyKey: 'sms-1',
    });
    expect(a.id).toBe(b.id);
  });
});
