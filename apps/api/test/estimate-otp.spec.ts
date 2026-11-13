import { randomUUID } from 'node:crypto';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  assertCanSendOtp,
  clearOtp,
  markOtpSent,
  readOtp,
  recordFailedVerify,
  resetEstimateOtpMemoryStore,
  saveOtp,
} from '../src/modules/public/estimate-otp.store';
import { sendEstimateOtpCode, verifyEstimateOtpCode } from '../src/modules/public/estimate-otp.service';

beforeEach(() => {
  process.env.ESTIMATE_OTP_FORCE_MEMORY = 'true';
});

afterEach(() => {
  resetEstimateOtpMemoryStore();
  delete process.env.ESTIMATE_OTP_FORCE_MEMORY;
  delete process.env.ESTIMATE_OTP_SEND_COOLDOWN_SEC;
  delete process.env.ESTIMATE_OTP_VERIFY_MAX_ATTEMPTS;
});

describe('estimate otp memory store', () => {
  it('stores and verifies code', async () => {
    const phone = '09121112222';
    await saveOtp(phone, '12345');
    await expect(readOtp(phone)).resolves.toBe('12345');
    await clearOtp(phone);
    await expect(readOtp(phone)).resolves.toBeNull();
  });

  it('enforces send cooldown in memory mode', async () => {
    const phone = '09123334444';
    process.env.ESTIMATE_OTP_SEND_COOLDOWN_SEC = '120';
    const first = await assertCanSendOtp(phone);
    expect(first.ok).toBe(true);
    await markOtpSent(phone);
    const second = await assertCanSendOtp(phone);
    expect(second.ok).toBe(false);
  });

  it('locks verify after too many failures', async () => {
    const phone = '09125556666';
    process.env.ESTIMATE_OTP_VERIFY_MAX_ATTEMPTS = '2';
    await saveOtp(phone, '99999');
    await recordFailedVerify(phone);
    await recordFailedVerify(phone);
    const lock = await recordFailedVerify(phone);
    expect(lock.ok).toBe(false);
    await expect(readOtp(phone)).resolves.toBeNull();
  });
});

describe('estimate otp service (dev)', () => {
  it('send returns devCode and verify succeeds', async () => {
    process.env.ESTIMATE_OTP_SMS_PROVIDER = 'none';
    process.env.NODE_ENV = 'development';
    const phone = `09${randomUUID().replace(/\D/g, '').slice(0, 9)}`;
    const sent = await sendEstimateOtpCode(phone);
    expect(sent.accepted).toBe(true);
    expect(sent.devCode).toMatch(/^\d{5}$/);
    const verified = await verifyEstimateOtpCode(phone, sent.devCode!);
    expect(verified.verified).toBe(true);
  });
});
