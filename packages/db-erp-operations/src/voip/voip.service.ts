import { randomUUID } from 'node:crypto';
import { recordUsage } from '../usage/usage.service.js';
import { serializeEncrypted } from '../security/kms-crypto.js';

export type CallLog = {
  id: string;
  tenantId: string;
  callId: string;
  direction: 'Inbound' | 'Outbound';
  fromNumber: string;
  toNumber: string;
  durationSec: number;
  status: string;
  transcript?: string;
  recordingUrl?: string;
};

const calls = new Map<string, CallLog>();
const sipAccounts = new Map<string, string>();

export function resetVoipStore(): void {
  calls.clear();
  sipAccounts.clear();
}

export function registerSipAccount(tenantId: string, username: string, password: string): void {
  sipAccounts.set(`${tenantId}:${username}`, serializeEncrypted(password));
}

export function completeCall(input: {
  tenantId: string;
  direction: 'Inbound' | 'Outbound';
  fromNumber: string;
  toNumber: string;
  durationSec: number;
  idempotencyKey: string;
  transcript?: string;
}): CallLog {
  const call: CallLog = {
    id: randomUUID(),
    tenantId: input.tenantId,
    callId: randomUUID(),
    direction: input.direction,
    fromNumber: input.fromNumber,
    toNumber: input.toNumber,
    durationSec: input.durationSec,
    status: 'Completed',
    transcript: input.transcript,
    recordingUrl: `/recordings/${randomUUID()}.webm`,
  };
  calls.set(call.id, call);
  const minutes = Math.max(1, Math.ceil(input.durationSec / 60));
  recordUsage({
    tenantId: input.tenantId,
    resourceType: 'VOIP_MINUTES',
    quantity: minutes,
    unitCost: 1200,
    referenceType: 'call_log',
    referenceId: call.id,
    idempotencyKey: input.idempotencyKey,
  });
  return call;
}

export function listCalls(tenantId: string): CallLog[] {
  return [...calls.values()].filter((c) => c.tenantId === tenantId);
}
