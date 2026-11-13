import {
  listProjectTasksPrisma,
  listProjectsPrisma,
  saveProjectsBundlePrisma,
  type ProjectRow,
  type TaskRow,
} from './projects.repository.js';
import { projectsPrismaEnabled } from './client.js';

export async function hydrateProjectsFromPrisma(): Promise<{
  projects: ProjectRow[];
  tasks: TaskRow[];
  fromDatabase: boolean;
}> {
  if (!projectsPrismaEnabled()) {
    return { projects: [], tasks: [], fromDatabase: false };
  }
  const projects = await listProjectsPrisma();
  const tasks = await listProjectTasksPrisma();
  return { projects, tasks, fromDatabase: projects.length > 0 || tasks.length > 0 };
}

export async function persistProjectsToPrisma(input: { projects: ProjectRow[]; tasks: TaskRow[] }): Promise<void> {
  if (!projectsPrismaEnabled()) return;
  await saveProjectsBundlePrisma(input);
}
