import { Controller, Get, Post, Headers, UnauthorizedException } from '@nestjs/common';
import { Public } from './decorators/access.decorator';
import { getPool } from '@repo/db-core-adapter';
import { getRedis } from './redis';
import { getMetricsText } from '@repo/observability';

@Controller()
export class HealthController {
  @Public()
  @Get('health')
  async health() {
    const checks: Record<string, string> = { db: 'unknown', redis: 'unknown' };
    try {
      if (process.env.DATABASE_URL) {
        const pool = getPool();
        await pool.query('SELECT 1');
        checks.db = 'ok';
      } else {
        checks.db = 'skipped';
      }
    } catch {
      checks.db = 'error';
    }

    const redis = getRedis();
    checks.redis = redis ? (redis.status === 'ready' ? 'ok' : redis.status) : 'memory';

    return { status: 'ok', checks };
  }

  @Public()
  @Get('metrics')
  async metrics() {
    const body = await getMetricsText();
    return body;
  }

  @Public()
  @Post('api/internal/cron/trigger')
  cronTrigger(@Headers('x-cron-token') token?: string) {
    const secret = process.env.CRON_SECRET_TOKEN?.trim();
    if (!secret || token !== secret) {
      throw new UnauthorizedException();
    }
    return { triggered: true };
  }
}
