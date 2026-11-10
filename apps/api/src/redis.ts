import IORedis from 'ioredis';

let redis: IORedis | null = null;
let memoryWarningLogged = false;

export function getRedis(): IORedis | null {
  const url = process.env.REDIS_URL;
  if (!url) {
    if (!memoryWarningLogged) {
      memoryWarningLogged = true;
      console.warn(
        '⚠️ REDIS_URL تنظیم نشده — حالت In-Memory (فقط dev). برای Production از Upstash یا Redis خارجی استفاده کنید.',
      );
    }
    return null;
  }
  if (!redis) {
    redis = new IORedis(url, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });
  }
  return redis;
}

export function getBullConnection(): IORedis | { host: string; port: number } {
  const client = getRedis();
  if (client) return client;
  return { host: '127.0.0.1', port: 6379 };
}
