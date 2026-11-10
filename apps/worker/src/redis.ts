import IORedis from 'ioredis';

let redis: IORedis | null = null;

export function getRedis(): IORedis | null {
  const url = process.env.REDIS_URL;
  if (!url) {
    console.warn('⚠️ REDIS_URL تنظیم نشده — Worker در حالت In-Memory/Bull پیش‌فرض');
    return null;
  }
  if (!redis) {
    redis = new IORedis(url, { maxRetriesPerRequest: null, enableReadyCheck: false });
  }
  return redis;
}

export function getBullConnection(): IORedis | { host: string; port: number } {
  const client = getRedis();
  if (client) return client;
  return { host: '127.0.0.1', port: 6379 };
}
