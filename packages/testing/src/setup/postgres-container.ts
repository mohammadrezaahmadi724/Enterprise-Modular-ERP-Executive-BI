import { PostgreSqlContainer, type StartedPostgreSqlContainer } from '@testcontainers/postgresql';

const SCHEMAS = [
  'platform',
  'platform_outbox',
  'erp_finance',
  'erp_operations',
  'erp_hr',
  'erp_bi_risk',
  'alerts',
];

let container: StartedPostgreSqlContainer | null = null;

export async function startPostgresContainer(): Promise<string> {
  container = await new PostgreSqlContainer('postgres:16-alpine').start();
  const url = container.getConnectionUri();
  process.env.DATABASE_URL = url;
  return url;
}

export async function initMultiSchema(connectionString: string): Promise<void> {
  const { default: pg } = await import('pg');
  const client = new pg.Client({ connectionString });
  await client.connect();
  for (const schema of SCHEMAS) {
    await client.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`);
  }
  await client.end();
}

export async function stopPostgresContainer(): Promise<void> {
  if (container) {
    await container.stop();
    container = null;
  }
}
