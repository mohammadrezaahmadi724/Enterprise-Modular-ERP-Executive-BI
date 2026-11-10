import { createCipheriv, randomBytes, createHash } from 'node:crypto';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const ALGO = 'aes-256-gcm';

function keyFromEnv(): Buffer {
  const master = process.env.KMS_MASTER_KEY ?? 'dev-only-32-byte-master-key-xx';
  return createHash('sha256').update(master).digest();
}

export function encryptBackupPayload(payload: Buffer): Buffer {
  const key = keyFromEnv();
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGO, key, iv);
  const enc = Buffer.concat([cipher.update(payload), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, enc]);
}

export function writeEncryptedBackup(content: string, baseDir = process.env.BACKUP_DIR ?? '.data/backups'): string {
  const file = join(baseDir, `backup-${Date.now()}.dump.enc`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, encryptBackupPayload(Buffer.from(content, 'utf8')));
  return file;
}
