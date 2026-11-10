import { createHash } from 'node:crypto';
import { IdempotencyConflictError } from '@repo/domain';

export type IdempotencyRecord = {
  tenantId: string;
  idempotencyKey: string;
  endpoint: string;
  requestHash: string;
  responseStatus?: number;
  responseBody?: unknown;
  responseReferenceId?: string;
  lockedUntil?: Date;
  expiresAt: Date;
};

const memoryStore = new Map<string, IdempotencyRecord>();

function storeKey(tenantId: string, key: string, endpoint: string): string {
  return `${tenantId}:${key}:${endpoint}`;
}

export function hashRequestBody(body: unknown): string {
  const json = typeof body === 'string' ? body : JSON.stringify(body ?? {});
  return createHash('sha256').update(json).digest('hex');
}

/** هش متادیتای آپلود — بدون محتوای فایل */
export function hashUploadMetadata(meta: { filename: string; size: number; mimetype: string }): string {
  return createHash('sha256')
    .update(`${meta.filename}|${meta.size}|${meta.mimetype}`)
    .digest('hex');
}

const MAX_INLINE_BODY = 64 * 1024;

export function resolveResponseStorage(body: unknown): {
  responseBody?: unknown;
  responseReferenceId?: string;
} {
  const serialized = JSON.stringify(body ?? {});
  if (Buffer.byteLength(serialized, 'utf8') > MAX_INLINE_BODY) {
    return { responseReferenceId: `ref_${createHash('sha256').update(serialized).digest('hex').slice(0, 16)}` };
  }
  return { responseBody: body };
}

export class IdempotencyService {
  async begin(
    tenantId: string,
    idempotencyKey: string,
    endpoint: string,
    requestHash: string,
  ): Promise<'proceed' | 'cached' | 'conflict' | 'processing'> {
    const key = storeKey(tenantId, idempotencyKey, endpoint);
    const existing = memoryStore.get(key);
    const now = new Date();

    if (existing) {
      if (existing.requestHash !== requestHash) {
        throw new IdempotencyConflictError('Same idempotency key with different request payload');
      }
      if (existing.lockedUntil && existing.lockedUntil > now) {
        return 'processing';
      }
      if (existing.responseStatus != null) {
        return 'cached';
      }
    }

    memoryStore.set(key, {
      tenantId,
      idempotencyKey,
      endpoint,
      requestHash,
      lockedUntil: new Date(now.getTime() + 30_000),
      expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000),
    });
    return 'proceed';
  }

  async complete(
    tenantId: string,
    idempotencyKey: string,
    endpoint: string,
    status: number,
    body: unknown,
  ): Promise<void> {
    const key = storeKey(tenantId, idempotencyKey, endpoint);
    const record = memoryStore.get(key);
    if (!record) return;
    const storage = resolveResponseStorage(body);
    record.responseStatus = status;
    record.responseBody = storage.responseBody;
    record.responseReferenceId = storage.responseReferenceId;
    record.lockedUntil = undefined;
    memoryStore.set(key, record);
  }

  getCached(tenantId: string, idempotencyKey: string, endpoint: string): IdempotencyRecord | undefined {
    return memoryStore.get(storeKey(tenantId, idempotencyKey, endpoint));
  }

  /** برای تست — پاک‌سازی حافظه */
  clear(): void {
    memoryStore.clear();
  }
}

export const idempotencyService = new IdempotencyService();
