import { randomUUID } from 'node:crypto';
import { recordUsage } from '../usage/usage.service.js';
import { serializeEncrypted } from '../security/kms-crypto.js';

export type Channel = 'Telegram' | 'Bale' | 'SMS' | 'Email';

export type MessageRow = {
  id: string;
  tenantId: string;
  channel: Channel;
  direction: 'Inbound' | 'Outbound';
  fromAddress: string;
  toAddress: string;
  content: string;
  status: string;
};

const messages: MessageRow[] = [];
const channelConfigs = new Map<string, string>();

export function resetMessagingStore(): void {
  messages.length = 0;
  channelConfigs.clear();
}

export function upsertChannelConfig(tenantId: string, channel: Channel, config: Record<string, string>): string {
  const enc = serializeEncrypted(JSON.stringify(config));
  channelConfigs.set(`${tenantId}:${channel}`, enc);
  return enc;
}

export function ingestInboundMessage(input: {
  tenantId: string;
  channel: Channel;
  fromAddress: string;
  toAddress: string;
  content: string;
  idempotencyKey: string;
}): MessageRow {
  const row: MessageRow = {
    id: randomUUID(),
    tenantId: input.tenantId,
    channel: input.channel,
    direction: 'Inbound',
    fromAddress: input.fromAddress,
    toAddress: input.toAddress,
    content: input.content,
    status: 'Delivered',
  };
  messages.push(row);
  return row;
}

export function sendOutboundMessage(input: {
  tenantId: string;
  channel: Channel;
  toAddress: string;
  content: string;
  idempotencyKey: string;
}): MessageRow {
  const row: MessageRow = {
    id: randomUUID(),
    tenantId: input.tenantId,
    channel: input.channel,
    direction: 'Outbound',
    fromAddress: 'system',
    toAddress: input.toAddress,
    content: input.content,
    status: 'Sent',
  };
  messages.push(row);
  const resourceType = input.channel === 'SMS' ? 'SMS' : 'SURVEY';
  recordUsage({
    tenantId: input.tenantId,
    resourceType,
    quantity: 1,
    unitCost: resourceType === 'SMS' ? 150 : 50,
    referenceType: 'message',
    referenceId: row.id,
    idempotencyKey: input.idempotencyKey,
  });
  return row;
}

export function listMessages(tenantId: string, channel?: Channel): MessageRow[] {
  return messages.filter((m) => m.tenantId === tenantId && (!channel || m.channel === channel));
}
