import type IORedis from 'ioredis';
import { getRedis } from '../../redis';

function otpRedis(): IORedis | null {
  if (process.env.ESTIMATE_OTP_FORCE_MEMORY === 'true') return null;
  return getRedis();
}

const OTP_TTL_MS = 5 * 60_000;

const memoryOtp = new Map<string, { code: string; expiresAt: number }>();
const memorySendCooldown = new Map<string, number>();
const memorySendHour = new Map<string, { count: number; expiresAt: number }>();
const memoryVerifyFails = new Map<string, { count: number; expiresAt: number }>();

function envInt(name: string, fallback: number): number {
  const v = process.env[name];
  if (!v) return fallback;
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

function sendCooldownSec(): number {
  return envInt('ESTIMATE_OTP_SEND_COOLDOWN_SEC', 60);
}
function sendMaxHourly(): number {
  return envInt('ESTIMATE_OTP_SEND_MAX_PER_HOUR', 8);
}
function verifyMaxAttempts(): number {
  return envInt('ESTIMATE_OTP_VERIFY_MAX_ATTEMPTS', 8);
}

export type OtpGateResult = { ok: true } | { ok: false; message: string };

export function otpStorageMode(): 'redis' | 'memory' {
  return otpRedis() ? 'redis' : 'memory';
}

export async function assertCanSendOtp(phone: string): Promise<OtpGateResult> {
  const redis = otpRedis();
  const now = Date.now();

  if (redis) {
    const cooldownKey = `estimate_otp:cooldown:${phone}`;
    const cooling = await redis.get(cooldownKey);
    if (cooling) {
      const ttl = await redis.ttl(cooldownKey);
      const wait = ttl > 0 ? ttl : sendCooldownSec();
      return { ok: false, message: `لطفاً ${wait} ثانیه صبر کنید و دوباره درخواست دهید` };
    }
    const hourKey = `estimate_otp:rl:send:${phone}`;
    const count = await redis.incr(hourKey);
    if (count === 1) await redis.expire(hourKey, 3600);
    if (count > sendMaxHourly()) {
      return { ok: false, message: 'تعداد درخواست OTP از حد مجاز گذشت — یک ساعت دیگر تلاش کنید' };
    }
    return { ok: true };
  }

  const last = memorySendCooldown.get(phone);
  const cooldownMs = sendCooldownSec() * 1000;
  if (last && now - last < cooldownMs) {
    const wait = Math.ceil((cooldownMs - (now - last)) / 1000);
    return { ok: false, message: `لطفاً ${wait} ثانیه صبر کنید و دوباره درخواست دهید` };
  }
  let hour = memorySendHour.get(phone);
  if (!hour || hour.expiresAt < now) {
    hour = { count: 0, expiresAt: now + 3600_000 };
    memorySendHour.set(phone, hour);
  }
  hour.count += 1;
  if (hour.count > sendMaxHourly()) {
    return { ok: false, message: 'تعداد درخواست OTP از حد مجاز گذشت — یک ساعت دیگر تلاش کنید' };
  }
  return { ok: true };
}

export async function markOtpSent(phone: string): Promise<void> {
  const redis = otpRedis();
  if (redis) {
    await redis.set(`estimate_otp:cooldown:${phone}`, '1', 'EX', sendCooldownSec());
    return;
  }
  memorySendCooldown.set(phone, Date.now());
}

export async function saveOtp(phone: string, code: string, ttlMs = OTP_TTL_MS): Promise<void> {
  const redis = otpRedis();
  if (redis) {
    await redis.set(`estimate_otp:code:${phone}`, code, 'PX', ttlMs);
    return;
  }
  memoryOtp.set(phone, { code, expiresAt: Date.now() + ttlMs });
}

export async function readOtp(phone: string): Promise<string | null> {
  const redis = otpRedis();
  if (redis) {
    return redis.get(`estimate_otp:code:${phone}`);
  }
  const row = memoryOtp.get(phone);
  if (!row || row.expiresAt < Date.now()) {
    memoryOtp.delete(phone);
    return null;
  }
  return row.code;
}

export async function clearOtp(phone: string): Promise<void> {
  const redis = otpRedis();
  if (redis) {
    await redis.del(`estimate_otp:code:${phone}`, `estimate_otp:verify_fail:${phone}`);
    return;
  }
  memoryOtp.delete(phone);
  memoryVerifyFails.delete(phone);
}

export async function recordFailedVerify(phone: string): Promise<OtpGateResult> {
  const redis = otpRedis();
  if (redis) {
    const key = `estimate_otp:verify_fail:${phone}`;
    const count = await redis.incr(key);
    if (count === 1) await redis.pexpire(key, OTP_TTL_MS);
    if (count > verifyMaxAttempts()) {
      await redis.del(`estimate_otp:code:${phone}`);
      return { ok: false, message: 'تعداد تلاش بیش از حد — کد جدید بگیرید' };
    }
    return { ok: true };
  }
  const now = Date.now();
  let row = memoryVerifyFails.get(phone);
  if (!row || row.expiresAt < now) {
    row = { count: 0, expiresAt: now + OTP_TTL_MS };
  }
  row.count += 1;
  memoryVerifyFails.set(phone, row);
  if (row.count > verifyMaxAttempts()) {
    memoryOtp.delete(phone);
    return { ok: false, message: 'تعداد تلاش بیش از حد — کد جدید بگیرید' };
  }
  return { ok: true };
}

/** تست */
export function resetEstimateOtpMemoryStore(): void {
  memoryOtp.clear();
  memorySendCooldown.clear();
  memorySendHour.clear();
  memoryVerifyFails.clear();
}
