import { randomInt } from 'node:crypto';
import {
  assertCanSendOtp,
  clearOtp,
  markOtpSent,
  otpStorageMode,
  readOtp,
  recordFailedVerify,
  saveOtp,
} from './estimate-otp.store';

const OTP_TTL_MS = 5 * 60_000;

export function normalizeEstimatePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10 && digits.startsWith('9')) return `0${digits}`;
  return digits;
}

function randomOtpCode(): string {
  return String(randomInt(10000, 100000));
}

function otpMessage(code: string): string {
  const template = process.env.ESTIMATE_OTP_SMS_TEMPLATE?.trim();
  if (template?.includes('{{code}}')) return template.replace('{{code}}', code);
  return `کد تأیید برآورد ساختار سیستم: ${code}`;
}

async function dispatchSms(phone: string, message: string, otpToken?: string): Promise<void> {
  const provider = (process.env.ESTIMATE_OTP_SMS_PROVIDER ?? 'none').toLowerCase();

  if (provider === 'none') {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.info(`[estimate-otp] sms to ${phone}: ${message}`);
    }
    return;
  }

  if (provider === 'kavenegar') {
    const apiKey = process.env.KAVENEGAR_API_KEY?.trim() || process.env.ESTIMATE_OTP_SMS_API_KEY?.trim();
    if (!apiKey) throw new Error('KAVENEGAR_API_KEY تنظیم نشده است');
    const template = process.env.KAVENEGAR_OTP_TEMPLATE?.trim();
    if (template) {
      const token = otpToken ?? message.match(/\d{4,6}/)?.[0] ?? '';
      if (!token) throw new Error('کد OTP برای قالب کاوه‌نگار یافت نشد');
      const params = new URLSearchParams({ receptor: phone, token, template });
      const res = await fetch(`https://api.kavenegar.com/v1/${apiKey}/verify/lookup.json?${params.toString()}`);
      const json = (await res.json()) as { return?: { status?: number; message?: string } };
      if (!res.ok || (json.return?.status && json.return.status >= 400)) {
        throw new Error(json.return?.message ?? `کاوه‌نگار lookup (${res.status})`);
      }
      return;
    }
    const body = new URLSearchParams({ receptor: phone, message });
    const res = await fetch(`https://api.kavenegar.com/v1/${apiKey}/sms/send.json`, { method: 'POST', body });
    const json = (await res.json()) as { return?: { status?: number; message?: string } };
    if (!res.ok || (json.return?.status && json.return.status >= 400)) {
      throw new Error(json.return?.message ?? `کاوه‌نگار send (${res.status})`);
    }
    return;
  }

  if (provider === 'http') {
    const url = process.env.ESTIMATE_OTP_SMS_URL?.trim();
    if (!url) throw new Error('ESTIMATE_OTP_SMS_URL تنظیم نشده است');
    const apiKey = process.env.ESTIMATE_OTP_SMS_API_KEY?.trim();
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({ phone, message, type: 'estimate_otp' }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`ارسال پیامک ناموفق (${res.status}) ${body.slice(0, 120)}`);
    }
    return;
  }

  throw new Error(`ESTIMATE_OTP_SMS_PROVIDER نامعتبر: ${provider}`);
}

export async function sendEstimateOtpCode(phoneRaw: string): Promise<{
  accepted: boolean;
  message: string;
  phoneMask?: string;
  devCode?: string;
  storage?: 'redis' | 'memory';
}> {
  const phone = normalizeEstimatePhone(phoneRaw);
  if (phone.length < 10) {
    return { accepted: false, message: 'شماره موبایل معتبر نیست' };
  }

  const rate = await assertCanSendOtp(phone);
  if (!rate.ok) {
    return { accepted: false, message: rate.message };
  }

  const code = randomOtpCode();
  await saveOtp(phone, code, OTP_TTL_MS);

  try {
    await dispatchSms(phone, otpMessage(code), code);
  } catch (e) {
    await clearOtp(phone);
    return {
      accepted: false,
      message: e instanceof Error ? e.message : 'ارسال پیامک ناموفق بود',
    };
  }

  await markOtpSent(phone);

  const devHint =
    process.env.NODE_ENV !== 'production' && (process.env.ESTIMATE_OTP_SMS_PROVIDER ?? 'none') === 'none'
      ? { devCode: code }
      : undefined;

  return {
    accepted: true,
    message: 'کد تأیید ارسال شد',
    phoneMask: phone.slice(0, 4) + '***' + phone.slice(-2),
    storage: otpStorageMode(),
    ...devHint,
  };
}

export async function verifyEstimateOtpCode(
  phoneRaw: string,
  code: string,
): Promise<{ verified: boolean; message?: string }> {
  const phone = normalizeEstimatePhone(phoneRaw);
  const expected = await readOtp(phone);
  if (!expected) {
    return { verified: false, message: 'کد منقضی شده — دوباره درخواست دهید' };
  }
  if (code?.trim() !== expected) {
    const fail = await recordFailedVerify(phone);
    if (!fail.ok) return { verified: false, message: fail.message };
    return { verified: false, message: 'کد نادرست است' };
  }
  await clearOtp(phone);
  return { verified: true };
}
