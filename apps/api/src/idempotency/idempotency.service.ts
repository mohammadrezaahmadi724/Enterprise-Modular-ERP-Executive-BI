import { createHash } from 'node:crypto';
import { IdempotencyConflictError } from '@repo/domain';
import { platformDb } from '../prisma/platform-db';

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
let persistDisabled = process.env.IDEMPOTENCY_MEMORY_ONLY === 'true';

function storeKey(tenantId: string, key: string, endpoint: string): string {
  return `${tenantId}:${key}:${endpoint}`;
}

function composite(tenantId: string, idempotencyKey: string, endpoint: string) {
  return { tenantId_idempotencyKey_endpoint: { tenantId, idempotencyKey, endpoint } };
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

function decide(existing: IdempotencyRecord | undefined, requestHash: string, now: Date): 'proceed' | 'cached' | 'processing' {
  if (!existing) return 'proceed';
  if (existing.requestHash !== requestHash) {
    throw new IdempotencyConflictError('Same idempotency key with different request payload');
  }
  if (existing.responseStatus != null) return 'cached';
  if (existing.lockedUntil && existing.lockedUntil > now) return 'processing';
  return 'proceed';
}

function fromDb(row: {
  tenantId: string;
  idempotencyKey: string;
  endpoint: string;
  requestHash: string;
  responseStatus: number | null;
  responseBody: unknown;
  responseReferenceId: string | null;
  lockedUntil: Date | null;
  expiresAt: Date;
}): IdempotencyRecord {
  return {
    tenantId: row.tenantId,
    idempotencyKey: row.idempotencyKey,
    endpoint: row.endpoint,
    requestHash: row.requestHash,
    responseStatus: row.responseStatus ?? undefined,
    responseBody: row.responseBody ?? undefined,
    responseReferenceId: row.responseReferenceId ?? undefined,
    lockedUntil: row.lockedUntil ?? undefined,
    expiresAt: row.expiresAt,
  };
}

async function readDb(tenantId: string, idempotencyKey: string, endpoint: string): Promise<IdempotencyRecord | undefined> {
  if (persistDisabled) return undefined;
  try {
    const row = await platformDb.idempotencyKey.findUnique({
      where: composite(tenantId, idempotencyKey, endpoint),
    });
    return row ? fromDb(row) : undefined;
  } catch {
    persistDisabled = true;
    return undefined;
  }
}

export class IdempotencyService {
  async begin(
    tenantId: string,
    idempotencyKey: string,
    endpoint: string,
    requestHash: string,
  ): Promise<'proceed' | 'cached' | 'conflict' | 'processing'> {
    const key = storeKey(tenantId, idempotencyKey, endpoint);
    const now = new Date();
    const cachedMem = memoryStore.get(key);
    const existing = cachedMem ?? (await readDb(tenantId, idempotencyKey, endpoint));
    if (existing) memoryStore.set(key, existing);

    const state = decide(existing, requestHash, now);
    if (state !== 'proceed') return state;

    const record: IdempotencyRecord = {
      tenantId,
      idempotencyKey,
      endpoint,
      requestHash,
      lockedUntil: new Date(now.getTime() + 30_000),
      expiresAt: existing?.expiresAt ?? new Date(now.getTime() + 24 * 60 * 60 * 1000),
    };
    memoryStore.set(key, record);

    if (!persistDisabled) {
      try {
        await platformDb.idempotencyKey.upsert({
          where: composite(tenantId, idempotencyKey, endpoint),
          create: {
            tenantId,
            idempotencyKey,
            endpoint,
            requestHash,
            lockedUntil: record.lockedUntil,
            expiresAt: record.expiresAt,
          },
          update: {
            requestHash,
            lockedUntil: record.lockedUntil,
          },
        });
      } catch {
        persistDisabled = true;
      }
    }
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
    const storage = resolveResponseStorage(body);
    if (record) {
      record.responseStatus = status;
      record.responseBody = storage.responseBody;
      record.responseReferenceId = storage.responseReferenceId;
      record.lockedUntil = undefined;
      memoryStore.set(key, record);
    }
    if (persistDisabled) return;
    try {
      await platformDb.idempotencyKey.update({
        where: composite(tenantId, idempotencyKey, endpoint),
        data: {
          responseStatus: status,
          responseBody: storage.responseBody ?? undefined,
          responseReferenceId: storage.responseReferenceId,
          lockedUntil: null,
        },
      });
    } catch {
      persistDisabled = true;
    }
  }

  getCached(tenantId: string, idempotencyKey: string, endpoint: string): IdempotencyRecord | undefined {
    return memoryStore.get(storeKey(tenantId, idempotencyKey, endpoint));
  }

  /** برای تست — پاک‌سازی حافظه */
  clear(): void {
    memoryStore.clear();
    persistDisabled = process.env.IDEMPOTENCY_MEMORY_ONLY === 'true';
  }
}

export const idempotencyService = new IdempotencyService();
