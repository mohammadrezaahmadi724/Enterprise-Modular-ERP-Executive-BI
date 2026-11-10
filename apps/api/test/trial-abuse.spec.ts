import { describe, it, expect, beforeEach } from 'vitest';
import {
  getTrialAlerts,
  registerTrial,
  resetTrialStore,
  whitelistFingerprint,
  hashFingerprint,
} from '../src/modules/platform/trial-abuse.service';
import { PLATFORM_EVENTS } from '@repo/contracts';

describe('Trial abuse prevention — خلأ ۱۵ — بند ۵.۳', () => {
  beforeEach(() => resetTrialStore());

  const fp = {
    ip: '1.2.3.4',
    emailDomain: 'example.com',
    deviceId: 'device-1',
  };

  it('اولین trial باید مجاز باشد', () => {
    const r = registerTrial('tenant-a', fp);
    expect(r.blockedAt).toBeUndefined();
  });

  it('trial دوم با fingerprint یکسان باید Soft Block + Alert شود', () => {
    registerTrial('tenant-a', fp);
    const second = registerTrial('tenant-b', fp);
    expect(second.blockedAt).toBeDefined();
    const alerts = getTrialAlerts();
    expect(alerts.some((a) => a.type === PLATFORM_EVENTS.TRIAL_ABUSE_BLOCKED)).toBe(true);
  });

  it('whitelist باید مسیر را باز کند', () => {
    whitelistFingerprint(hashFingerprint(fp));
    registerTrial('tenant-a', fp);
    const second = registerTrial('tenant-b', fp);
    expect(second.blockedAt).toBeUndefined();
  });
});
