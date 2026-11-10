import { createHash, randomUUID } from 'node:crypto';
import { PLATFORM_EVENTS } from '@repo/contracts';

export type TrialFingerprint = {
  ip: string;
  emailDomain: string;
  cardLast4?: string;
  deviceId?: string;
};

export type TrialRecord = {
  id: string;
  tenantId: string;
  fingerprintHash: string;
  blockedAt?: Date;
};

export type TrialAlert = { type: string; tenantId: string; fingerprintHash: string };

const trials = new Map<string, TrialRecord>();
const whitelist = new Set<string>();
const alerts: TrialAlert[] = [];

export function resetTrialStore(): void {
  trials.clear();
  alerts.length = 0;
}

export function getTrialAlerts(): TrialAlert[] {
  return [...alerts];
}

export function hashFingerprint(fp: TrialFingerprint): string {
  const raw = `${fp.ip}|${fp.emailDomain}|${fp.cardLast4 ?? ''}|${fp.deviceId ?? ''}`;
  return createHash('sha256').update(raw).digest('hex');
}

export function isWhitelisted(hash: string): boolean {
  return whitelist.has(hash);
}

export function whitelistFingerprint(hash: string): void {
  whitelist.add(hash);
}

export function registerTrial(tenantId: string, fp: TrialFingerprint): TrialRecord {
  const fingerprintHash = hashFingerprint(fp);
  if (isWhitelisted(fingerprintHash)) {
    const record: TrialRecord = { id: randomUUID(), tenantId, fingerprintHash };
    trials.set(record.id, record);
    return record;
  }
  const duplicate = [...trials.values()].find(
    (t) => t.fingerprintHash === fingerprintHash && !t.blockedAt,
  );
  if (duplicate) {
    const blocked: TrialRecord = {
      id: randomUUID(),
      tenantId,
      fingerprintHash,
      blockedAt: new Date(),
    };
    trials.set(blocked.id, blocked);
    alerts.push({
      type: PLATFORM_EVENTS.TRIAL_ABUSE_BLOCKED,
      tenantId,
      fingerprintHash,
    });
    return blocked;
  }
  const record: TrialRecord = { id: randomUUID(), tenantId, fingerprintHash };
  trials.set(record.id, record);
  return record;
}
