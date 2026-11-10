import { mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { writeEncryptedBackup } from '../src/backup.js';
import { runRestoreDrill } from '../src/restore.js';
import { INTEGRATION_EVENTS } from '@repo/contracts';

const dir = join(process.cwd(), '.data-test', 'backups');

beforeEach(() => mkdirSync(dir, { recursive: true }));
afterEach(() => rmSync(dir, { recursive: true, force: true }));

describe('Restore drill', () => {
  it('بازیابی رمزنگاری‌شده + checksum', () => {
    const file = writeEncryptedBackup('row1\nrow2\n', dir);
    const result = runRestoreDrill(file, 2);
    expect(result.ok).toBe(true);
    expect(result.outbox).toContain(INTEGRATION_EVENTS.BACKUP_RESTORED);
  });
});
