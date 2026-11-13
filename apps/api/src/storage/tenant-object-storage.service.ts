import { randomUUID } from 'node:crypto';
import { BadRequestException } from '@nestjs/common';
import { TenantContext } from '@repo/domain';
import {
  brandingAllowedMimeTypes,
  brandingUploadMaxBytes,
  contentTypeForFilename,
  extensionForMime,
  s3ObjectStorageEnabled,
  tenantObjectKey,
} from './object-storage.config';
import { localGetObject, localKeyWithinTenantRoot, localPutObject } from './object-storage-local.driver';
import { s3GetObject, s3PutObject } from './object-storage-s3.driver';

export type BrandingSlot = 'logo' | 'stamp' | 'signature';

export { s3ObjectStorageEnabled as objectStorageUsesS3 };

export function tenantAssetPublicPath(slot: BrandingSlot, filename: string): string {
  return `/api/v1/tenant-assets/branding/${slot}/${encodeURIComponent(filename)}`;
}

export async function putTenantBrandingObject(
  slot: BrandingSlot,
  file: Express.Multer.File,
): Promise<{ filename: string; publicPath: string; bytes: number; contentType: string; storage: 's3' | 'local' }> {
  if (!file?.buffer?.length) throw new BadRequestException('file_required');
  const allowed = brandingAllowedMimeTypes();
  if (!allowed.has(file.mimetype.toLowerCase())) throw new BadRequestException('unsupported_image_type');
  if (file.size > brandingUploadMaxBytes()) throw new BadRequestException('file_too_large');

  const tenantId = TenantContext.requireTenantId();
  const filename = `${slot}-${randomUUID()}.${extensionForMime(file.mimetype)}`;
  const objectKey = tenantObjectKey(tenantId, slot, filename);

  if (s3ObjectStorageEnabled()) {
    await s3PutObject(objectKey, file.buffer, file.mimetype);
    return {
      filename,
      publicPath: tenantAssetPublicPath(slot, filename),
      bytes: file.size,
      contentType: file.mimetype,
      storage: 's3',
    };
  }

  await localPutObject(objectKey, file.buffer);
  return {
    filename,
    publicPath: tenantAssetPublicPath(slot, filename),
    bytes: file.size,
    contentType: file.mimetype,
    storage: 'local',
  };
}

export async function readTenantBrandingObject(
  tenantId: string,
  slot: BrandingSlot,
  filename: string,
): Promise<{ buffer: Buffer; contentType: string }> {
  if (!/^[a-zA-Z0-9._-]+$/.test(filename)) throw new BadRequestException('invalid_filename');
  if (!['logo', 'stamp', 'signature'].includes(slot)) throw new BadRequestException('invalid_slot');

  const objectKey = tenantObjectKey(tenantId, slot, filename);

  if (s3ObjectStorageEnabled()) {
    const buffer = await s3GetObject(objectKey);
    return { buffer, contentType: contentTypeForFilename(filename) };
  }

  if (!localKeyWithinTenantRoot(tenantId, objectKey)) throw new BadRequestException('invalid_path');
  const buffer = await localGetObject(objectKey);
  return { buffer, contentType: contentTypeForFilename(filename) };
}
