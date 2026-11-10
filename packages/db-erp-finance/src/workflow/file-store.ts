import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import type { WorkflowDefinitionRecord, WorkflowInstanceRecord } from './engine.js';

export type WorkflowSnapshot = {
  definitions: WorkflowDefinitionRecord[];
  instances: WorkflowInstanceRecord[];
};

export function workflowPersistenceEnabled(): boolean {
  return process.env.ERP_WORKFLOW_PERSISTENCE === '1';
}

function storePath(): string {
  return process.env.ERP_WORKFLOW_STORE_PATH ?? join(process.cwd(), '.data', 'workflow-store.json');
}

export function loadWorkflowSnapshot(): WorkflowSnapshot | null {
  if (!workflowPersistenceEnabled()) return null;
  const path = storePath();
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf8')) as WorkflowSnapshot;
  } catch {
    return null;
  }
}

export function saveWorkflowSnapshot(snapshot: WorkflowSnapshot): void {
  if (!workflowPersistenceEnabled()) return;
  const path = storePath();
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(snapshot, null, 2), 'utf8');
}
