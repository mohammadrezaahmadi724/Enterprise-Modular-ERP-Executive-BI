import { getProjectionSlice, seedProjection } from './metric-query.js';

export type ProjectsHubKpis = {
  activeProjects: number;
  nearingDeadlineCount: number;
  openTasks: number;
  overdueTasks: number;
  todayTasksInbox: number;
};

const PROJECTION = 'projection_projects_hub';
const SLICE = 'overview';

export function publishProjectsHubProjection(tenantId: string, kpis: ProjectsHubKpis): void {
  seedProjection(tenantId, PROJECTION, SLICE, { ...kpis });
}

export function readProjectsHubKpis(tenantId: string): (ProjectsHubKpis & { sources: string[] }) | null {
  const slice = getProjectionSlice(tenantId, PROJECTION, SLICE);
  if (!slice) return null;
  return {
    activeProjects: slice.activeProjects ?? 0,
    nearingDeadlineCount: slice.nearingDeadlineCount ?? 0,
    openTasks: slice.openTasks ?? 0,
    overdueTasks: slice.overdueTasks ?? 0,
    todayTasksInbox: slice.todayTasksInbox ?? 0,
    sources: ['projection_projects_hub'],
  };
}
