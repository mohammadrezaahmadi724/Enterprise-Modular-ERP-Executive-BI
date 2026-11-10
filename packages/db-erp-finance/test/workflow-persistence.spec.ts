import { readFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  registerWorkflowDefinition,
  resetWorkflowEngine,
  startWorkflow,
} from '../src/workflow/engine.js';

const storePath = join(process.cwd(), '.data-test', 'workflow-persistence.json');

describe('Workflow file persistence', () => {
  beforeEach(() => {
    process.env.ERP_WORKFLOW_PERSISTENCE = '1';
    process.env.ERP_WORKFLOW_STORE_PATH = storePath;
    mkdirSync(join(process.cwd(), '.data-test'), { recursive: true });
    if (existsSync(storePath)) rmSync(storePath);
    resetWorkflowEngine();
  });

  afterEach(() => {
    delete process.env.ERP_WORKFLOW_PERSISTENCE;
    delete process.env.ERP_WORKFLOW_STORE_PATH;
    resetWorkflowEngine();
    if (existsSync(storePath)) rmSync(storePath);
  });

  it('snapshot JSON شامل instance فعال', () => {
    registerWorkflowDefinition({
      id: 'd1',
      tenantId: 't1',
      code: 'test',
      version: 1,
      steps: [{ stepOrder: 1, nameFa: 'تایید', approverRole: 'mgr', timeoutHours: 24 }],
    });
    startWorkflow({
      tenantId: 't1',
      definitionCode: 'test',
      version: 1,
      entityType: 'entity',
      entityId: 'e-1',
    });
    expect(existsSync(storePath)).toBe(true);
    const snap = JSON.parse(readFileSync(storePath, 'utf8')) as { instances: { entityId: string }[] };
    expect(snap.instances.some((i) => i.entityId === 'e-1')).toBe(true);
  });
});
