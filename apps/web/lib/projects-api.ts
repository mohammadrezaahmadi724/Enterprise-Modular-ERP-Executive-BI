import { apiBase } from './api-base';

const TENANT = process.env.NEXT_PUBLIC_DEMO_TENANT_ID ?? '11111111-1111-4111-8111-111111111111';

function apiUrl() {
  return apiBase();
}

function headers(idempotency?: string) {
  const key = idempotency ?? crypto.randomUUID();
  return {
    'Content-Type': 'application/json',
    'x-tenant-id': TENANT,
    'x-user-id': '00000000-0000-4000-8000-000000000001',
    'x-correlation-id': key,
    'Idempotency-Key': key,
    'x-super-admin': 'true',
  };
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${apiUrl()}${path}`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return (await res.json()) as T;
}

async function postJson<T>(path: string, body: unknown, idempotencyKey?: string): Promise<T> {
  const res = await fetch(`${apiUrl()}${path}`, {
    method: 'POST',
    headers: headers(idempotencyKey),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return (await res.json()) as T;
}

async function patchJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${apiUrl()}${path}`, { method: 'PATCH', headers: headers(), body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return (await res.json()) as T;
}

export type ProjectApi = {
  code: string;
  name: string;
  deadline?: string;
  status: string;
  delayDays?: number;
};

export type TaskApi = {
  number: string;
  title: string;
  projectCode?: string;
  assigneeName?: string;
  assigneeInitials?: string;
  deadline?: string;
  status: string;
  priority: string;
  overdue?: boolean;
  unassigned?: boolean;
  checklistDone?: number;
  checklistTotal?: number;
  loggedHours?: string;
  loggedMinutes?: number;
  linkType?: string;
  linkRef?: string;
};

export type ProjectFinanceContextApi = {
  costCenterCode?: string;
  costCenterName?: string;
  budgetToman: number;
  spentToman: number;
  progressPct: number;
  budgetUtilizationPct: number;
  detailHref: string;
  sources: string[];
};

export type ProjectTeamMemberApi = {
  name: string;
  role: string;
  initials?: string;
};

export type ProjectContextApi = {
  project: ProjectApi;
  team: ProjectTeamMemberApi[];
  tasks: TaskApi[];
  procurement: {
    purchaseRequests: Array<{ number: string; title: string; status: string; estimatedToman: number }>;
    purchaseOrders: Array<{ number: string; supplierName: string; status: string; totalToman: number }>;
    readyForPurchaseOrder: Array<{ purchaseRequestNumber: string; title: string; estimatedToman: number }>;
    pendingApproval: Array<{ purchaseRequestNumber: string; title: string; estimatedToman: number }>;
    readyForReceipt: Array<{
      purchaseOrderNumber: string;
      supplierName: string;
      totalToman: number;
      status: string;
      lineCount: number;
    }>;
  };
  finance: ProjectFinanceContextApi;
  links: { financeCostCenters: string; procurementHub: string };
};

export type AssistantInsightApi = {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  body: string;
  href?: string;
};

export async function fetchProjectsAssistant() {
  return getJson<{ assistant: { enabled: boolean; generatedAt: string; insights: AssistantInsightApi[] }; source: string }>(
    '/api/v1/projects/assistant/insights',
  );
}

export type ReminderApi = {
  id: string;
  title: string;
  scheduleAt: string;
  channel: string;
  pastDue?: boolean;
};

export type PersonalTaskApi = { id: string; title: string; done: boolean; noteCount?: number };

export async function fetchProjectsOverview() {
  return getJson<{
    kpis: {
      activeProjects: number;
      nearingDeadlineCount: number;
      openTasks: number;
      overdueTasks: number;
      todayTasksInbox: number;
    };
    projectsPreview: ProjectApi[];
    overdueTasksPreview: TaskApi[];
    overdueProjectsPreview: ProjectApi[];
    source?: string;
  }>('/api/v1/projects/overview');
}

export async function fetchProjects() {
  return getJson<{ projects: ProjectApi[]; source: string }>('/api/v1/projects/list');
}

export async function createProject(body: { name: string; deadline?: string }) {
  return postJson<{ project: ProjectApi; source: string }>('/api/v1/projects/list', body, `prj-${crypto.randomUUID()}`);
}

export async function fetchProjectTasks() {
  return getJson<{ tasks: TaskApi[]; source: string }>('/api/v1/projects/tasks');
}

export async function createProjectTask(body: {
  title: string;
  inProject: boolean;
  projectCode?: string;
  assignToSelf: boolean;
  assigneeName?: string;
  deadline?: string;
  priority?: string;
  linkType?: 'none' | 'purchase_request' | 'purchase_order' | 'customer' | 'document';
  linkRef?: string;
}) {
  return postJson<{ task: TaskApi; source: string }>('/api/v1/projects/tasks', body, `tsk-${crypto.randomUUID()}`);
}

export async function updateProjectTaskStatus(number: string, status: string) {
  return patchJson<{ task: TaskApi }>(`/api/v1/projects/tasks/${encodeURIComponent(number)}/status`, { status });
}

export async function patchProjectTask(
  number: string,
  body: { status?: string; incrementChecklist?: boolean; logMinutes?: number },
) {
  return patchJson<{ task: TaskApi; source: string }>(`/api/v1/projects/tasks/${encodeURIComponent(number)}`, body);
}

export async function fetchProjectContext(code: string) {
  return getJson<{ context: ProjectContextApi; source: string }>(`/api/v1/projects/list/${encodeURIComponent(code)}/context`);
}

export async function fetchReminders() {
  return getJson<{ reminders: ReminderApi[]; source: string }>('/api/v1/projects/reminders');
}

export async function createReminder(body: { title: string; scheduleAt: string; channel?: string }) {
  return postJson<{ reminder: ReminderApi; source: string }>('/api/v1/projects/reminders', body, `rem-${crypto.randomUUID()}`);
}

export async function fetchPersonalTasks() {
  return getJson<{ tasks: PersonalTaskApi[]; source: string }>('/api/v1/projects/personal-tasks');
}

export async function createPersonalTask(title: string) {
  return postJson<{ task: PersonalTaskApi; source: string }>('/api/v1/projects/personal-tasks', { title });
}

export async function togglePersonalTask(id: string) {
  return postJson<{ task: PersonalTaskApi; source: string }>(`/api/v1/projects/personal-tasks/${encodeURIComponent(id)}/toggle`, {});
}
