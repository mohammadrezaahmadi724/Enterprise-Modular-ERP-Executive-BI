import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export function localObjectStorageRoot(): string {
  const configured = process.env.OBJECT_STORAGE_ROOT?.trim();
  if (configured) return path.resolve(configured);
  return path.resolve(process.cwd(), '.data', 'tenant-objects');
}

export async function localPutObject(objectKey: string, body: Buffer): Promise<void> {
  const absFile = path.join(localObjectStorageRoot(), objectKey.split('/').join(path.sep));
  await mkdir(path.dirname(absFile), { recursive: true });
  await writeFile(absFile, body);
}

export async function localGetObject(objectKey: string): Promise<Buffer> {
  const absFile = path.join(localObjectStorageRoot(), objectKey.split('/').join(path.sep));
  return readFile(absFile);
}

export function localKeyWithinTenantRoot(tenantId: string, objectKey: string): boolean {
  const root = path.join(localObjectStorageRoot(), tenantId);
  const absFile = path.join(localObjectStorageRoot(), objectKey.split('/').join(path.sep));
  return absFile.startsWith(root + path.sep);
}
