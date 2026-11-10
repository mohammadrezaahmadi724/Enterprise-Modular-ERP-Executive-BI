import { randomUUID } from 'node:crypto';
import { INTEGRATION_EVENTS } from '@repo/contracts';
import { recordUsage } from '../usage/usage.service.js';
import { serializeEncrypted } from '../security/kms-crypto.js';

export type Conversation = {
  id: string;
  tenantId: string;
  userId: string;
  channel: string;
  messages: { role: 'user' | 'assistant' | 'system'; content: string; tokensUsed: number }[];
  analyses: { analysisType: string; result: Record<string, unknown>; confidence: number }[];
};

const conversations = new Map<string, Conversation>();
const tenantApiKeys = new Map<string, string>();
const workflowLogs: unknown[] = [];
const outbox: unknown[] = [];

export function resetAiStore(): void {
  conversations.clear();
  tenantApiKeys.clear();
  workflowLogs.length = 0;
  outbox.length = 0;
}

export function getAiOutbox() {
  return [...outbox];
}

export function setTenantAiApiKey(tenantId: string, apiKey: string): string {
  const enc = serializeEncrypted(apiKey);
  tenantApiKeys.set(tenantId, enc);
  return enc;
}

export function startConversation(tenantId: string, userId: string, channel: string): Conversation {
  const c: Conversation = {
    id: randomUUID(),
    tenantId,
    userId,
    channel,
    messages: [],
    analyses: [],
  };
  conversations.set(c.id, c);
  return c;
}

export function appendMessage(
  conversationId: string,
  role: 'user' | 'assistant' | 'system',
  content: string,
  tokensUsed: number,
  model: string,
  idempotencyKey: string,
): void {
  const c = conversations.get(conversationId);
  if (!c) throw new Error('conversation not found');
  c.messages.push({ role, content, tokensUsed });
  recordUsage({
    tenantId: c.tenantId,
    resourceType: 'AI_TOKENS',
    quantity: tokensUsed,
    unitCost: 0.00002,
    referenceType: 'ai_message',
    referenceId: conversationId,
    idempotencyKey,
  });
  void model;
}

export function analyzeConversation(conversationId: string): Conversation {
  const c = conversations.get(conversationId);
  if (!c) throw new Error('conversation not found');
  const sentiment = c.messages.some((m) => m.content.includes('مشکل')) ? 'negative' : 'positive';
  const analysis = {
    analysisType: 'insight_extraction',
    result: { sentiment, actionItems: ['پیگیری مشتری'], topics: ['پشتیبانی'] },
    confidence: 0.86,
  };
  c.analyses.push(analysis);
  return c;
}

export function handleN8nExecution(input: {
  tenantId: string;
  workflowCode: string;
  executionId: string;
  payload: unknown;
}): void {
  workflowLogs.push({ ...input, status: 'success', createdAt: new Date() });
  outbox.push({ type: INTEGRATION_EVENTS.N8N_WORKFLOW_EXECUTED, payload: input });
}

export function listConversations(tenantId: string): Conversation[] {
  return [...conversations.values()].filter((c) => c.tenantId === tenantId);
}
