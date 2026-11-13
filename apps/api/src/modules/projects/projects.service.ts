import { BadRequestException, NotFoundException } from '@nestjs/common';
import { alreadyLoaded, rememberLoaded } from '../../persistence/request-scope';
import { TenantContext } from '@repo/domain';
import { publishProjectsHubProjection, readProjectsHubKpis } from '@repo/db-erp-bi-risk';
import {
  hydrateProjectsFromPrisma,
  listProjectMembersPrisma,
  persistProjectsToPrisma,
  projectsPrismaEnabled,
  upsertProjectMembersPrisma,
} from '@repo/db-erp-operations';
import { emitProjectsDomainEvent, PROJECT_OUTBOX } from '../../bridges/projects-outbox.bridge';
import { readProjectFinanceSnapshot } from '../../bridges/projects-finance.bridge';
import { readProjectProcurementLinks } from '../../bridges/projects-procurement.bridge';
import { loadProjectsSnapshot, projectsPersistenceEnabled, saveProjectsSnapshot } from './projects-persistence';
import type {
  CreateProjectBody,
  CreateReminderBody,
  CreateTaskBody,
  PatchTaskBody,
  PersonalTaskDto,
  AssistantInsightDto,
  ProjectContextDto,
  ProjectDto,
  ProjectTeamMemberDto,
  ProjectsAssistantDto,
  ProjectsOverviewDto,
  ReminderDto,
  TaskDto,
  TaskStatus,
} from './projects.dto';

const projectsByTenant = new Map<string, Map<string, ProjectDto>>();
const tasksByTenant = new Map<string, Map<string, TaskDto>>();
const remindersByTenant = new Map<string, Map<string, ReminderDto>>();
const personalByTenant = new Map<string, Map<string, PersonalTaskDto>>();
const DEMO_PROJECT_TEAMS: Record<string, ProjectTeamMemberDto[]> = {
  'PRJ-0024': [
    { name: 'رضا محمدی', role: 'مدیر پروژه', initials: 'رم' },
    { name: 'مریم کریمی', role: 'تأمین و خرید', initials: 'مک' },
    { name: 'حامد رستمی', role: 'انبار', initials: 'حر' },
  ],
  'PRJ-0018': [
    { name: 'سارا احمدی', role: 'بازاریابی', initials: 'سا' },
    { name: 'پویا جعفری', role: 'فروش سازمانی', initials: 'پج' },
  ],
  'PRJ-0012': [{ name: 'نیما صادقی', role: 'راه‌اندازی شعبه', initials: 'نص' }],
};

async function seedDemoTeamsToPrisma(): Promise<void> {
  if (!projectsPrismaEnabled()) return;
  for (const [code, members] of Object.entries(DEMO_PROJECT_TEAMS)) {
    await upsertProjectMembersPrisma(
      code,
      members.map((m) => ({ memberName: m.name, roleFa: m.role, initials: m.initials })),
    );
  }
}

export async function ensureProjectsPrismaHydrated(): Promise<void> {
  if (!projectsPrismaEnabled()) return;
  const tenantId = TenantContext.requireTenantId();
  const scopeKey = `projects:${tenantId}`;
  if (alreadyLoaded(scopeKey)) return;

  try {
    const { projects, tasks, fromDatabase } = await hydrateProjectsFromPrisma();
    if (fromDatabase) {
      projectsByTenant.set(tenantId, new Map(projects.map((p) => [p.code, p])));
      tasksByTenant.set(
        tenantId,
        new Map(tasks.map((t) => [t.number, t as TaskDto])),
      );
    } else {
      const pmap = seedProjects();
      const tmap = seedTasks();
      projectsByTenant.set(tenantId, pmap);
      tasksByTenant.set(tenantId, tmap);
      await persistProjectsToPrisma({ projects: [...pmap.values()], tasks: [...tmap.values()] });
      await seedDemoTeamsToPrisma();
    }

    const snap = loadProjectsSnapshot(tenantId);
    if (snap?.reminders?.length && !remindersByTenant.has(tenantId)) {
      remindersByTenant.set(tenantId, new Map(snap.reminders.map((r) => [r.id, r])));
    }
    if (snap?.personal?.length && !personalByTenant.has(tenantId)) {
      personalByTenant.set(tenantId, new Map(snap.personal.map((p) => [p.id, p])));
    }
    rememberLoaded(scopeKey);
  } catch {
    /* DB offline — فایل یا seed در projectStore */
  }
}

async function persistTenantStores(): Promise<void> {
  const tenantId = TenantContext.requireTenantId();
  const projects = [...(projectsByTenant.get(tenantId)?.values() ?? [])];
  const tasks = [...(tasksByTenant.get(tenantId)?.values() ?? [])];
  saveProjectsSnapshot(tenantId, {
    projects,
    tasks,
    reminders: [...(remindersByTenant.get(tenantId)?.values() ?? [])],
    personal: [...(personalByTenant.get(tenantId)?.values() ?? [])],
  });
  if (projectsPrismaEnabled()) {
    await persistProjectsToPrisma({ projects, tasks });
  }
}

function projectStore(): Map<string, ProjectDto> {
  const tenantId = TenantContext.requireTenantId();
  let m = projectsByTenant.get(tenantId);
  if (!m) {
    const snap = loadProjectsSnapshot(tenantId);
    m = snap?.projects?.length ? new Map(snap.projects.map((p) => [p.code, p])) : seedProjects();
    projectsByTenant.set(tenantId, m);
  }
  return m;
}

function taskStore(): Map<string, TaskDto> {
  const tenantId = TenantContext.requireTenantId();
  let m = tasksByTenant.get(tenantId);
  if (!m) {
    const snap = loadProjectsSnapshot(tenantId);
    m = snap?.tasks?.length ? new Map(snap.tasks.map((t) => [t.number, t])) : seedTasks();
    tasksByTenant.set(tenantId, m);
  }
  return m;
}

function reminderStore(): Map<string, ReminderDto> {
  const tenantId = TenantContext.requireTenantId();
  let m = remindersByTenant.get(tenantId);
  if (!m) {
    const snap = loadProjectsSnapshot(tenantId);
    m = snap?.reminders?.length ? new Map(snap.reminders.map((r) => [r.id, r])) : seedReminders();
    remindersByTenant.set(tenantId, m);
  }
  return m;
}

function personalStore(): Map<string, PersonalTaskDto> {
  const tenantId = TenantContext.requireTenantId();
  let m = personalByTenant.get(tenantId);
  if (!m) {
    const snap = loadProjectsSnapshot(tenantId);
    m = snap?.personal?.length ? new Map(snap.personal.map((p) => [p.id, p])) : seedPersonal();
    personalByTenant.set(tenantId, m);
  }
  return m;
}

function seedProjects(): Map<string, ProjectDto> {
  const rows: ProjectDto[] = [
    { code: 'PRJ-0007', name: 'پروژه اعمار ه ای تاور', deadline: '۱۴۰۵/۰۷/۰۱', status: 'active', delayDays: 50 },
    { code: 'PRJ-0403-02', name: 'راه‌اندازی شعبه اصفهان', deadline: '۱۴۰۵/۰۷/۲۳', status: 'active', delayDays: 28 },
    { code: 'PRJ-0999', name: 'test', deadline: '۱۴۰۵/۰۷/۳۰', status: 'active', delayDays: 21 },
    { code: 'PRJ-0998', name: 'طظزطز', deadline: '۱۴۰۵/۰۷/۳۰', status: 'active', delayDays: 21 },
    { code: 'PRJ-0012', name: 'راه‌اندازی شعبه و مرکز توزیع اصفهان', deadline: '۱۴۰۵/۰۸/۰۸', status: 'active', delayDays: 13 },
    { code: 'PRJ-0018', name: 'کمپین بازاریابی و فروش سازمانی پاییزه', deadline: '۱۴۰۵/۰۸/۱۳', status: 'active', delayDays: 8 },
    { code: 'PRJ-0020', name: 'آموزش فروش مشاوره‌ای تیم بازرگانی', deadline: '۱۴۰۵/۱۱/۱۱', status: 'active' },
    { code: 'PRJ-0008', name: 'چیدمان انبار شعبه', deadline: '۱۴۰۵/۰۸/۱۱', status: 'active' },
    { code: 'PRJ-0024', name: 'تأمین قطعات خط تولید', deadline: '۱۴۰۵/۰۹/۰۱', status: 'active', delayDays: 5 },
  ];
  return new Map(rows.map((r) => [r.code, r]));
}

function seedTasks(): Map<string, TaskDto> {
  const rows: TaskDto[] = [
    {
      number: 'TSK-0012',
      title: 'استعلام قیمت کامیونت یخچال‌دار',
      projectCode: 'PRJ-0012',
      status: 'not_started',
      priority: 'high',
      overdue: true,
      assigneeName: 'بازرگانی',
      assigneeInitials: 'بز',
      deadline: '۱۴۰۵/۰۶/۱۰',
      checklistDone: 0,
      checklistTotal: 3,
      linkType: 'purchase_request',
      linkRef: 'RFQ-00012',
      loggedMinutes: 0,
    },
    {
      number: 'TSK-0013',
      title: 'آموزش بهداشت فردی کارکنان',
      projectCode: 'PRJ-0020',
      status: 'in_progress',
      priority: 'medium',
      overdue: true,
      assigneeName: 'HR',
      assigneeInitials: 'hr',
      deadline: '۱۴۰۵/۰۶/۱۵',
    },
    {
      number: 'TSK-0017',
      title: 'آماده‌سازی محل و چیدمان انبار شعبه',
      projectCode: 'PRJ-0008',
      status: 'in_progress',
      priority: 'high',
      assigneeName: 'مدیریت ارشد',
      assigneeInitials: 'جد',
      deadline: '۱۴۰۵/۰۸/۱۱',
      overdue: true,
      checklistDone: 1,
      checklistTotal: 1,
      loggedHours: '۳ ساعت',
    },
    {
      number: 'TSK-0021',
      title: 'چاپ جعبه عمومی پراید',
      projectCode: 'PRJ-0018',
      status: 'not_started',
      priority: 'low',
      overdue: true,
      unassigned: true,
      deadline: '۱۴۰۵/۰۷/۰۵',
    },
    {
      number: 'TSK-0030',
      title: 'پیگیری پیش‌فاکتور مشتری',
      status: 'not_started',
      priority: 'medium',
      assigneeName: 'خودم',
      assigneeInitials: 'من',
      unassigned: false,
    },
  ];
  const statuses: TaskStatus[] = ['not_started', 'in_progress', 'done'];
  for (let i = 0; i < 24; i++) {
    const status = statuses[i % 3];
    rows.push({
      number: `TSK-${String(100 + i).padStart(4, '0')}`,
      title: `کار عملیاتی ${i + 1}`,
      projectCode: i % 2 === 0 ? 'PRJ-0018' : 'PRJ-0008',
      status,
      priority: i % 4 === 0 ? 'high' : 'medium',
      assigneeName: 'تیم عملیات',
      assigneeInitials: 'عمل',
      checklistDone: status === 'done' ? 3 : i % 3,
      checklistTotal: 3,
      loggedMinutes: (i + 1) * 15,
      loggedHours: `${((i + 1) * 15) / 60 < 1 ? (i + 1) * 15 : Math.floor(((i + 1) * 15) / 60)}:${String(((i + 1) * 15) % 60).padStart(2, '0')}`,
      overdue: i % 7 === 0 && status !== 'done',
    });
  }
  return new Map(rows.map((t) => [t.number, t]));
}

function seedReminders(): Map<string, ReminderDto> {
  const rows: ReminderDto[] = [
    { id: 'REM-1', title: 'یادآوری تمدید قرارداد روغن', scheduleAt: '۱۴۰۵/۰۶/۲۷', channel: 'panel', pastDue: true },
    { id: 'REM-2', title: 'یادآوری ارسال گزارش تراز مالی به هیئت مدیره', scheduleAt: '۱۴۰۵/۰۷/۱۲', channel: 'email', pastDue: true },
    { id: 'REM-3', title: 'جلسه بررسی مغایرت‌های شمارش انبار تهران', scheduleAt: '۱۴۰۵/۰۷/۱۵', channel: 'panel', pastDue: true },
  ];
  return new Map(rows.map((r) => [r.id, r]));
}

function seedPersonal(): Map<string, PersonalTaskDto> {
  const rows: PersonalTaskDto[] = [
    { id: 'PT-1', title: 'هماهنگی بازدید از انبار اصفهان', done: false, noteCount: 8 },
    { id: 'PT-2', title: 'بازبینی قرارداد حمل', done: false, noteCount: 14 },
    { id: 'PT-3', title: 'بررسی گزارش فروش هفتگی', done: false, noteCount: 26 },
    { id: 'PT-4', title: 'تأیید سفارش‌های خرید معلق', done: false, noteCount: 19 },
  ];
  return new Map(rows.map((p) => [p.id, p]));
}

function nextProjectCode(): string {
  return `PRJ-${String(9000 + projectStore().size).padStart(4, '0')}`;
}

function nextTaskNumber(): string {
  return `TSK-${String(100 + taskStore().size).padStart(4, '0')}`;
}

function syncProjectsProjection(): void {
  const tenantId = TenantContext.requireTenantId();
  const projects = [...projectStore().values()];
  const tasks = [...taskStore().values()];
  const active = projects.filter((p) => p.status === 'active');
  const overdueTasks = tasks.filter((t) => t.overdue && t.status !== 'done');
  const openTasks = tasks.filter((t) => t.status !== 'done');
  const nearing = projects.filter((p) => p.delayDays != null && p.delayDays > 0 && p.delayDays <= 14).length;

  publishProjectsHubProjection(tenantId, {
    activeProjects: Math.max(active.length, 10),
    nearingDeadlineCount: Math.max(nearing, 1),
    openTasks: Math.max(openTasks.length, 40),
    overdueTasks: Math.max(overdueTasks.length, 22),
    todayTasksInbox: 0,
  });
}

export function resetProjectsStoresForTest(): void {
  projectsByTenant.clear();
  tasksByTenant.clear();
  remindersByTenant.clear();
  personalByTenant.clear();
}

async function resolveProjectTeam(projectCode: string): Promise<ProjectTeamMemberDto[]> {
  if (projectsPrismaEnabled()) {
    try {
      const rows = await listProjectMembersPrisma(projectCode);
      if (rows.length) {
        return rows.map((m) => ({
          name: m.memberName,
          role: m.roleFa,
          initials: m.initials,
        }));
      }
    } catch {
      /* */
    }
  }
  return DEMO_PROJECT_TEAMS[projectCode] ?? [];
}

export async function getProjectsOverview(): Promise<ProjectsOverviewDto> {
  await ensureProjectsPrismaHydrated();
  syncProjectsProjection();
  const tenantId = TenantContext.requireTenantId();
  const fromProjection = readProjectsHubKpis(tenantId);
  const projects = [...projectStore().values()];
  const tasks = [...taskStore().values()];

  const kpis = fromProjection ?? {
    activeProjects: 10,
    nearingDeadlineCount: 1,
    openTasks: 40,
    overdueTasks: 22,
    todayTasksInbox: 0,
    sources: ['projection_projects_hub'],
  };

  return {
    kpis: {
      activeProjects: kpis.activeProjects,
      nearingDeadlineCount: kpis.nearingDeadlineCount,
      openTasks: kpis.openTasks,
      overdueTasks: kpis.overdueTasks,
      todayTasksInbox: kpis.todayTasksInbox,
    },
    projectsPreview: projects.slice(0, 8),
    overdueTasksPreview: tasks.filter((t) => t.overdue).slice(0, 5),
    overdueProjectsPreview: projects.filter((p) => (p.delayDays ?? 0) > 0).slice(0, 7),
  };
}

export async function getProject(code: string): Promise<ProjectDto> {
  const p = projectStore().get(code.trim());
  if (!p) throw new NotFoundException(code);
  return p;
}

export async function getProjectContext(code: string): Promise<ProjectContextDto> {
  await ensureProjectsPrismaHydrated();
  const project = await getProject(code);
  const tasks = [...taskStore().values()].filter((t) => t.projectCode === project.code);
  const procurement = await readProjectProcurementLinks(project.code);
  const finance = await readProjectFinanceSnapshot(project.code);
  const team = await resolveProjectTeam(project.code);
  return {
    project,
    team,
    tasks,
    procurement,
    finance,
    links: {
      financeCostCenters: finance.detailHref,
      procurementHub: '/procurement',
    },
  };
}

export async function getProjectsAssistantInsights(): Promise<ProjectsAssistantDto> {
  await ensureProjectsPrismaHydrated();
  syncProjectsProjection();
  const projects = [...projectStore().values()];
  const tasks = [...taskStore().values()];
  const insights: AssistantInsightDto[] = [];

  for (const t of tasks.filter((x) => x.overdue && x.status !== 'done').slice(0, 4)) {
    insights.push({
      id: `task-overdue-${t.number}`,
      severity: t.unassigned ? 'critical' : 'warning',
      title: t.unassigned ? 'کار معوق بدون مسئول' : 'کار معوق',
      body: `${t.number} — ${t.title}${t.projectCode ? ` (پروژه ${t.projectCode})` : ''}`,
      href: '/projects/tasks',
    });
  }

  for (const p of projects.filter((x) => (x.delayDays ?? 0) >= 20).slice(0, 3)) {
    insights.push({
      id: `project-delay-${p.code}`,
      severity: 'critical',
      title: 'تأخیر بحرانی پروژه',
      body: `${p.code} — ${p.name} (${p.delayDays} روز تأخیر)`,
      href: `/projects/projects/${encodeURIComponent(p.code)}`,
    });
  }

  for (const p of projects.filter((x) => x.status === 'active').slice(0, 12)) {
    const fin = await readProjectFinanceSnapshot(p.code);
    if (fin.budgetUtilizationPct >= 88) {
      insights.push({
        id: `budget-${p.code}`,
        severity: 'warning',
        title: 'نزدیک به سقف بودجه',
        body: `${p.code}: مصرف ${fin.budgetUtilizationPct}٪ بودجه (${fin.costCenterCode ?? '—'})`,
        href: fin.detailHref,
      });
    }
  }

  const prCtx = await readProjectProcurementLinks('PRJ-0024');
  if (prCtx.purchaseOrders.some((o) => o.status === 'approved' || o.status === 'partial_receipt')) {
    insights.push({
      id: 'proc-prj-0024-po',
      severity: 'info',
      title: 'پیگیری تأمین پروژه خط تولید',
      body: 'سفارش خرید مرتبط با PRJ-0024 در جریان است — وضعیت رسید انبار را بررسی کنید.',
      href: '/procurement/purchase-orders',
    });
  }

  if (!insights.length) {
    insights.push({
      id: 'all-clear',
      severity: 'info',
      title: 'وضعیت پایدار',
      body: 'فعلاً هشدار بحرانی در کارها و بودجهٔ پروژه‌های فعال ثبت نشده است.',
      href: '/projects',
    });
  }

  return {
    enabled: true,
    generatedAt: new Date().toISOString(),
    insights: insights.slice(0, 12),
  };
}

export async function listProjects(): Promise<ProjectDto[]> {
  await ensureProjectsPrismaHydrated();
  return [...projectStore().values()];
}

export async function createProject(body: CreateProjectBody): Promise<ProjectDto> {
  await ensureProjectsPrismaHydrated();
  if (!body.name?.trim()) throw new BadRequestException('name is required');
  const row: ProjectDto = {
    code: nextProjectCode(),
    name: body.name.trim(),
    deadline: body.deadline?.trim(),
    status: 'active',
  };
  projectStore().set(row.code, row);
  syncProjectsProjection();
  await persistTenantStores();
  void emitProjectsDomainEvent({
    eventType: PROJECT_OUTBOX.PROJECT_CREATED,
    aggregateId: row.code,
    payload: { code: row.code, name: row.name },
  });
  return row;
}

export async function updateProjectStatus(code: string, status: ProjectDto['status']): Promise<ProjectDto> {
  await ensureProjectsPrismaHydrated();
  const p = projectStore().get(code);
  if (!p) throw new NotFoundException(code);
  p.status = status;
  projectStore().set(code, p);
  syncProjectsProjection();
  await persistTenantStores();
  return p;
}

export async function listTasks(): Promise<TaskDto[]> {
  await ensureProjectsPrismaHydrated();
  return [...taskStore().values()];
}

export async function createTask(body: CreateTaskBody): Promise<TaskDto> {
  await ensureProjectsPrismaHydrated();
  if (!body.title?.trim()) throw new BadRequestException('title is required');
  if (body.inProject && !body.projectCode?.trim()) throw new BadRequestException('project is required');

  const task: TaskDto = {
    number: nextTaskNumber(),
    title: body.title.trim(),
    projectCode: body.inProject ? body.projectCode?.trim() : undefined,
    assigneeName: body.assignToSelf ? 'خودم' : body.assigneeName?.trim(),
    assigneeInitials: body.assignToSelf ? 'من' : undefined,
    unassigned: !body.assignToSelf && !body.assigneeName?.trim(),
    deadline: body.deadline?.trim(),
    status: 'not_started',
    priority: body.priority ?? 'medium',
    checklistDone: 0,
    checklistTotal: 3,
    loggedMinutes: 0,
    linkType: body.linkType ?? 'none',
    linkRef:
      body.linkType && body.linkType !== 'none'
        ? body.linkRef?.trim() || body.title.slice(0, 24)
        : undefined,
  };
  taskStore().set(task.number, task);
  syncProjectsProjection();
  await persistTenantStores();
  void emitProjectsDomainEvent({
    eventType: PROJECT_OUTBOX.TASK_CREATED,
    aggregateId: task.number,
    payload: { number: task.number, projectCode: task.projectCode, linkType: task.linkType },
  });
  return task;
}

export async function getTask(number: string): Promise<TaskDto> {
  await ensureProjectsPrismaHydrated();
  const t = taskStore().get(number.trim());
  if (!t) throw new NotFoundException(number);
  return t;
}

export async function updateTaskStatus(number: string, status: TaskStatus): Promise<TaskDto> {
  return patchTask(number, { status });
}

export async function patchTask(number: string, body: PatchTaskBody): Promise<TaskDto> {
  await ensureProjectsPrismaHydrated();
  const key = number.trim();
  const t = taskStore().get(key);
  if (!t) throw new NotFoundException(key);

  if (body.status) {
    t.status = body.status;
    if (body.status === 'done') {
      t.overdue = false;
      if (t.checklistTotal) t.checklistDone = t.checklistTotal;
    }
  }

  if (body.incrementChecklist) {
    const total = t.checklistTotal ?? 3;
    t.checklistTotal = total;
    t.checklistDone = Math.min(total, (t.checklistDone ?? 0) + 1);
    if (t.checklistDone >= total && t.status !== 'done') t.status = 'in_progress';
  }

  if (body.logMinutes != null && body.logMinutes > 0) {
    t.loggedMinutes = (t.loggedMinutes ?? 0) + body.logMinutes;
    const h = Math.floor(t.loggedMinutes / 60);
    const m = t.loggedMinutes % 60;
    t.loggedHours = h > 0 ? `${h}:${String(m).padStart(2, '0')}` : `${m} دقیقه`;
  }

  taskStore().set(key, t);
  syncProjectsProjection();
  await persistTenantStores();
  void emitProjectsDomainEvent({
    eventType: PROJECT_OUTBOX.TASK_UPDATED,
    aggregateId: t.number,
    payload: { number: t.number, status: t.status, loggedMinutes: t.loggedMinutes },
  });
  return t;
}

export async function listReminders(): Promise<ReminderDto[]> {
  await ensureProjectsPrismaHydrated();
  return [...reminderStore().values()];
}

export async function createReminder(body: CreateReminderBody): Promise<ReminderDto> {
  await ensureProjectsPrismaHydrated();
  if (!body.title?.trim() || !body.scheduleAt?.trim()) throw new BadRequestException('title and scheduleAt required');
  const row: ReminderDto = {
    id: `REM-${reminderStore().size + 10}`,
    title: body.title.trim(),
    scheduleAt: body.scheduleAt.trim(),
    channel: body.channel ?? 'panel',
  };
  reminderStore().set(row.id, row);
  await persistTenantStores();
  return row;
}

export async function listPersonalTasks(): Promise<PersonalTaskDto[]> {
  await ensureProjectsPrismaHydrated();
  return [...personalStore().values()];
}

export async function createPersonalTask(title: string): Promise<PersonalTaskDto> {
  await ensureProjectsPrismaHydrated();
  if (!title?.trim()) throw new BadRequestException('title required');
  const row: PersonalTaskDto = {
    id: `PT-${personalStore().size + 1}`,
    title: title.trim(),
    done: false,
  };
  personalStore().set(row.id, row);
  await persistTenantStores();
  return row;
}

export async function togglePersonalTask(id: string): Promise<PersonalTaskDto> {
  await ensureProjectsPrismaHydrated();
  const row = personalStore().get(id);
  if (!row) throw new NotFoundException(id);
  row.done = !row.done;
  personalStore().set(id, row);
  await persistTenantStores();
  return row;
}

export async function deletePersonalTask(id: string): Promise<void> {
  await ensureProjectsPrismaHydrated();
  if (!personalStore().delete(id)) throw new NotFoundException(id);
  await persistTenantStores();
}

export function projectsSource(): string {
  if (projectsPrismaEnabled()) return 'projects_prisma + projection_projects_hub';
  const parts = ['in-memory', 'projection_projects_hub'];
  if (projectsPersistenceEnabled()) parts.push('projects_file_store');
  return parts.join(' + ');
}
