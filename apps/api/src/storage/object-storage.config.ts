export function objectStorageEndpoint(): string | undefined {
  const primary = process.env.OBJECT_STORAGE_ENDPOINT?.trim();
  if (primary) return primary;
  return process.env.OBJECT_STORAGE_ENDPOINT_URL?.trim() || undefined;
}

export function s3ObjectStorageEnabled(): boolean {
  const bucket = process.env.OBJECT_STORAGE_BUCKET?.trim();
  const endpoint = objectStorageEndpoint();
  const key = process.env.OBJECT_STORAGE_ACCESS_KEY?.trim();
  const secret = process.env.OBJECT_STORAGE_SECRET_KEY?.trim();
  return Boolean(bucket && endpoint && key && secret);
}

export function brandingUploadMaxBytes(): number {
  const raw = process.env.BRANDING_UPLOAD_MAX_BYTES?.trim();
  const parsed = raw ? Number(raw) : 2 * 1024 * 1024;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 2 * 1024 * 1024;
}

export function brandingAllowedMimeTypes(): Set<string> {
  const raw = process.env.BRANDING_UPLOAD_MIME_TYPES?.trim();
  if (!raw) return new Set(['image/png', 'image/jpeg', 'image/webp']);
  const items = raw.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
  return items.length ? new Set(items) : new Set(['image/png', 'image/jpeg', 'image/webp']);
}

export function extensionForMime(mimetype: string): string {
  const m = mimetype.toLowerCase();
  if (m === 'image/png') return 'png';
  if (m === 'image/webp') return 'webp';
  if (m === 'image/gif') return 'gif';
  return 'jpg';
}

export function contentTypeForFilename(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.webp')) return 'image/webp';
  if (lower.endsWith('.gif')) return 'image/gif';
  return 'image/jpeg';
}

export function tenantObjectKey(tenantId: string, slot: string, filename: string): string {
  return `${tenantId}/branding/${slot}/${filename}`;
}
