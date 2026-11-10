import { describe, it, expect, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import {
  hashUploadMetadata,
  idempotencyService,
  resolveResponseStorage,
} from '../src/idempotency/idempotency.service';

describe('Idempotency upload 5MB — خلأ ۸ — بند ۳.۴', () => {
  const tenantId = '11111111-1111-4111-8111-111111111111';
  const key = 'upload-key-1';
  const endpoint = '/api/uploads';

  beforeEach(() => {
    idempotencyService.clear();
  });

  const meta = {
    filename: 'invoice.pdf',
    size: 5 * 1024 * 1024,
    mimetype: 'application/pdf',
  };

  it('آپلود ۵MB با Idempotency-Key تکراری باید پاسخ کش‌شده برگرداند', async () => {
    const hash = hashUploadMetadata(meta);
    await TenantContext.runAsync(
      {
        tenantId,
        userId: 'u1',
        correlationId: 'c1',
        traceId: 't1',
        isSuperAdmin: false,
      },
      async () => {
        const first = await idempotencyService.begin(tenantId, key, endpoint, hash);
        expect(first).toBe('proceed');
        const contentHash = 'sha256-' + 'a'.repeat(128);
        const bigPayload = { ok: true, contentHash };
        const storage = resolveResponseStorage(bigPayload);
        expect(storage.responseBody ?? storage.responseReferenceId).toBeTruthy();
        await idempotencyService.complete(tenantId, key, endpoint, 201, bigPayload);

        const second = await idempotencyService.begin(tenantId, key, endpoint, hash);
        expect(second).toBe('cached');
        const cached = idempotencyService.getCached(tenantId, key, endpoint);
        expect(cached?.responseStatus).toBe(201);
        expect(cached?.responseReferenceId ?? cached?.responseBody).toBeTruthy();
      },
    );
  });

  it('همان کلید با metadata متفاوت باید conflict ایجاد کند', async () => {
    const hashA = hashUploadMetadata(meta);
    const hashB = hashUploadMetadata({ ...meta, size: meta.size + 1 });
    await idempotencyService.begin(tenantId, key, endpoint, hashA);
    await expect(idempotencyService.begin(tenantId, key, endpoint, hashB)).rejects.toThrow(
      /different request payload/i,
    );
  });
});
