import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import type { PersonalTaskDto, ProjectDto, ReminderDto, TaskDto } from './projects.dto';

export type ProjectsStoreSnapshot = {
  projects: ProjectDto[];
  tasks: TaskDto[];
  reminders: ReminderDto[];
  personal: PersonalTaskDto[];
};

export function projectsPersistenceEnabled(): boolean {
  return process.env.PROJECTS_PERSISTENCE === 'true';
}

function storePath(tenantId: string): string {
  const base = process.env.PROJECTS_STORE_DIR?.trim() || join(process.cwd(), '.data', 'projects-store');
  return join(base, `${tenantId}.json`);
}

export function loadProjectsSnapshot(tenantId: string): ProjectsStoreSnapshot | null {
  if (!projectsPersistenceEnabled()) return null;
  const file = storePath(tenantId);
  if (!existsSync(file)) return null;
  try {
    const raw = readFileSync(file, 'utf8');
    return JSON.parse(raw) as ProjectsStoreSnapshot;
  } catch {
    return null;
  }
}

export function saveProjectsSnapshot(tenantId: string, snapshot: ProjectsStoreSnapshot): void {
  if (!projectsPersistenceEnabled()) return;
  const file = storePath(tenantId);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(snapshot, null, 0), 'utf8');
}
