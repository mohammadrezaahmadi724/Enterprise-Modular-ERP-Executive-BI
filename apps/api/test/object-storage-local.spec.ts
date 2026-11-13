import { randomUUID } from 'node:crypto';
import { mkdtemp, rm } from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TenantContext } from '@repo/domain';
import { putTenantBrandingObject, readTenantBrandingObject } from '../src/storage/tenant-object-storage.service';

const TENANT = '11111111-1111-4111-8111-111111111111';

describe('tenant object storage (local driver)', () => {
  let tempRoot = '';
  const prevS3 = {
    bucket: process.env.OBJECT_STORAGE_BUCKET,
    endpoint: process.env.OBJECT_STORAGE_ENDPOINT,
    key: process.env.OBJECT_STORAGE_ACCESS_KEY,
    secret: process.env.OBJECT_STORAGE_SECRET_KEY,
  };

  beforeEach(async () => {
    tempRoot = await mkdtemp(path.join(tmpdir(), 'erp-objects-'));
    process.env.OBJECT_STORAGE_ROOT = tempRoot;
    delete process.env.OBJECT_STORAGE_BUCKET;
    delete process.env.OBJECT_STORAGE_ENDPOINT;
    delete process.env.OBJECT_STORAGE_ACCESS_KEY;
    delete process.env.OBJECT_STORAGE_SECRET_KEY;
  });

  afterEach(async () => {
    if (tempRoot) await rm(tempRoot, { recursive: true, force: true });
    process.env.OBJECT_STORAGE_ROOT = '';
    if (prevS3.bucket) process.env.OBJECT_STORAGE_BUCKET = prevS3.bucket;
    else delete process.env.OBJECT_STORAGE_BUCKET;
    if (prevS3.endpoint) process.env.OBJECT_STORAGE_ENDPOINT = prevS3.endpoint;
    else delete process.env.OBJECT_STORAGE_ENDPOINT;
    if (prevS3.key) process.env.OBJECT_STORAGE_ACCESS_KEY = prevS3.key;
    else delete process.env.OBJECT_STORAGE_ACCESS_KEY;
    if (prevS3.secret) process.env.OBJECT_STORAGE_SECRET_KEY = prevS3.secret;
    else delete process.env.OBJECT_STORAGE_SECRET_KEY;
  });

  it('round-trips branding blob via API paths', async () => {
    const png = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64',
    );
    const file = {
      buffer: png,
      mimetype: 'image/png',
      size: png.length,
      originalname: 'logo.png',
    } as Express.Multer.File;

    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const put = await putTenantBrandingObject('logo', file);
        expect(put.storage).toBe('local');
        const read = await readTenantBrandingObject(TENANT, 'logo', put.filename);
        expect(read.buffer.equals(png)).toBe(true);
      },
    );
  });
});
