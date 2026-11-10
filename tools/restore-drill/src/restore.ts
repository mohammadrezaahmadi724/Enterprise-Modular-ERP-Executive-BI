import { createDecipheriv } from 'node:crypto';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { INTEGRATION_EVENTS } from '@repo/contracts';

const ALGO = 'aes-256-gcm';

function keyFromEnv(): Buffer {
  const master = process.env.KMS_MASTER_KEY ?? 'dev-only-32-byte-master-key-xx';
  return createHash('sha256').update(master).digest();
}

export function decryptBackupPayload(filePath: string): string {
  const buf = readFileSync(filePath);
  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(12, 28);
  const data = buf.subarray(28);
  const decipher = createDecipheriv(ALGO, keyFromEnv(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8');
}

export function verifyRestoredDump(dump: string, expectedRows: number): { ok: boolean; checksum: string } {
  const lines = dump.split('\n').filter(Boolean);
  const checksum = createHash('sha256').update(dump).digest('hex');
  return { ok: lines.length >= expectedRows, checksum };
}

export function runRestoreDrill(encryptedPath: string, expectedRows: number): { ok: boolean; outbox: string[] } {
  const outbox: string[] = [];
  try {
    const dump = decryptBackupPayload(encryptedPath);
    const v = verifyRestoredDump(dump, expectedRows);
    if (!v.ok) outbox.push(INTEGRATION_EVENTS.BACKUP_FAILED);
    else outbox.push(INTEGRATION_EVENTS.BACKUP_RESTORED);
    return { ok: v.ok, outbox };
  } catch {
    outbox.push(INTEGRATION_EVENTS.BACKUP_FAILED);
    return { ok: false, outbox };
  }
}
