import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { initSentry } from '@repo/observability';

async function bootstrap(): Promise<void> {
  initSentry();
  const app = await NestFactory.create(AppModule, { logger: ['log', 'error', 'warn'] });
  const devOrigins = [
    'http://127.0.0.1:3001',
    'http://localhost:3001',
    'http://127.0.0.1:3002',
    'http://localhost:3002',
    'http://127.0.0.1:3003',
    'http://localhost:3003',
  ];
  app.enableCors({
    origin: process.env.CORS_ORIGINS?.split(',').map((s) => s.trim()).filter(Boolean) ?? devOrigins,
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Idempotency-Key',
      'x-super-admin',
      'x-tenant-id',
      'x-user-id',
      'x-correlation-id',
    ],
  });
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );
  app.use(compression());
  app.use(cookieParser());
  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`API listening on :${port}`);
}

void bootstrap();
