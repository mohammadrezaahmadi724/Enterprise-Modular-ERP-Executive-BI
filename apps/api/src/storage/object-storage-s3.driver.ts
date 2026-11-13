import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {
  objectStorageEndpoint,
  s3ObjectStorageEnabled,
} from './object-storage.config';

let client: S3Client | null = null;

function getS3Client(): S3Client {
  if (client) return client;
  const endpoint = objectStorageEndpoint();
  const ssl = process.env.OBJECT_STORAGE_SSL !== 'false';
  client = new S3Client({
    endpoint: endpoint?.startsWith('http') ? endpoint : `${ssl ? 'https' : 'http'}://${endpoint}`,
    region: process.env.OBJECT_STORAGE_REGION?.trim() || 'us-east-1',
    credentials: {
      accessKeyId: process.env.OBJECT_STORAGE_ACCESS_KEY!.trim(),
      secretAccessKey: process.env.OBJECT_STORAGE_SECRET_KEY!.trim(),
    },
    forcePathStyle: process.env.OBJECT_STORAGE_FORCE_PATH_STYLE === 'true',
  });
  return client;
}

async function bodyToBuffer(body: unknown): Promise<Buffer> {
  if (!body) return Buffer.alloc(0);
  if (Buffer.isBuffer(body)) return body;
  if (body instanceof Uint8Array) return Buffer.from(body);
  if (typeof body === 'string') return Buffer.from(body);
  const stream = body as AsyncIterable<Uint8Array>;
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks);
}

export function ensureS3Configured(): void {
  if (!s3ObjectStorageEnabled()) {
    throw new Error('s3_object_storage_not_configured');
  }
}

export async function s3PutObject(objectKey: string, body: Buffer, contentType: string): Promise<void> {
  ensureS3Configured();
  const bucket = process.env.OBJECT_STORAGE_BUCKET!.trim();
  await getS3Client().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: objectKey,
      Body: body,
      ContentType: contentType,
    }),
  );
}

export async function s3GetObject(objectKey: string): Promise<Buffer> {
  ensureS3Configured();
  const bucket = process.env.OBJECT_STORAGE_BUCKET!.trim();
  const out = await getS3Client().send(
    new GetObjectCommand({
      Bucket: bucket,
      Key: objectKey,
    }),
  );
  return bodyToBuffer(out.Body);
}
