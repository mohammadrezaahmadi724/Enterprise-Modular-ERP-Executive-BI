import { createCipheriv, createDecipheriv, randomBytes, createHash } from 'node:crypto';

const ALGO = 'aes-256-gcm';
const IV_LEN = 12;

function deriveKey(masterKey: string, keyVersion: string): Buffer {
  return createHash('sha256').update(`${keyVersion}:${masterKey}`).digest();
}

export type EncryptedPayload = {
  v: string;
  iv: string;
  tag: string;
  data: string;
};

export function encryptSecret(plain: string, keyVersion = process.env.KMS_KEY_VERSION ?? 'v1'): EncryptedPayload {
  const master = process.env.KMS_MASTER_KEY ?? 'dev-only-32-byte-master-key-xx';
  const key = deriveKey(master, keyVersion);
  const iv = randomBytes(IV_LEN);
  const cipher = createCipheriv(ALGO, key, iv);
  const enc = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    v: keyVersion,
    iv: iv.toString('base64'),
    tag: tag.toString('base64'),
    data: enc.toString('base64'),
  };
}

export function decryptSecret(payload: EncryptedPayload): string {
  const master = process.env.KMS_MASTER_KEY ?? 'dev-only-32-byte-master-key-xx';
  const key = deriveKey(master, payload.v);
  const decipher = createDecipheriv(ALGO, key, Buffer.from(payload.iv, 'base64'));
  decipher.setAuthTag(Buffer.from(payload.tag, 'base64'));
  const dec = Buffer.concat([
    decipher.update(Buffer.from(payload.data, 'base64')),
    decipher.final(),
  ]);
  return dec.toString('utf8');
}

export function serializeEncrypted(plain: string): string {
  return JSON.stringify(encryptSecret(plain));
}

export function deserializeEncrypted(serialized: string): string {
  return decryptSecret(JSON.parse(serialized) as EncryptedPayload);
}
