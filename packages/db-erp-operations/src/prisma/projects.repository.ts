import { TenantContext } from '@repo/domain';
import { projectsPrismaEnabled } from './client.js';
import { operationsSession } from './rls.js';

export type ProjectRow = {
  code: string;
  name: string;
  deadline?: string;
  status: 'active' | 'on_hold' | 'completed' | 'canceled';
  delayDays?: number;
};

export type TaskRow = {
  number: string;
  title: string;
  projectCode?: string;
  assigneeName?: string;
  assigneeInitials?: string;
  deadline?: string;
  status: 'not_started' | 'in_progress' | 'done';
  priority: string;
  overdue?: boolean;
  unassigned?: boolean;
  checklistDone?: number;
  checklistTotal?: number;
  loggedMinutes?: number;
  loggedHours?: string;
  linkType?: string;
  linkRef?: string;
};

export type ProjectMemberRow = {
  memberName: string;
  roleFa: string;
  initials?: string;
};

export async function listProjectsPrisma(): Promise<ProjectRow[]> {
  if (!projectsPrismaEnabled()) return [];
  const tenantId = TenantContext.requireTenantId();
  const rows = await operationsSession((tx) => tx.erpProject.findMany({ where: { tenantId }, orderBy: { code: 'asc' } }));
  return rows.map((r) => ({
    code: r.code,
    name: r.name,
    deadline: r.deadline ?? undefined,
    status: r.status,
    delayDays: r.delayDays ?? undefined,
  }));
}

export async function listProjectTasksPrisma(): Promise<TaskRow[]> {
  if (!projectsPrismaEnabled()) return [];
  const tenantId = TenantContext.requireTenantId();
  const rows = await operationsSession((tx) => tx.erpProjectTask.findMany({ where: { tenantId }, orderBy: { number: 'asc' } }));
  return rows.map((t) => ({
    number: t.number,
    title: t.title,
    projectCode: t.projectCode ?? undefined,
    assigneeName: t.assigneeName ?? undefined,
    assigneeInitials: t.assigneeInitials ?? undefined,
    deadline: t.deadline ?? undefined,
    status: t.status,
    priority: t.priority,
    overdue: t.overdue,
    unassigned: t.unassigned,
    checklistDone: t.checklistDone ?? undefined,
    checklistTotal: t.checklistTotal ?? undefined,
    loggedMinutes: t.loggedMinutes ?? undefined,
    loggedHours: t.loggedHours ?? undefined,
    linkType: t.linkType ?? undefined,
    linkRef: t.linkRef ?? undefined,
  }));
}

export async function listProjectMembersPrisma(projectCode: string): Promise<ProjectMemberRow[]> {
  if (!projectsPrismaEnabled()) return [];
  const tenantId = TenantContext.requireTenantId();
  const rows = await operationsSession((tx) => tx.erpProjectMember.findMany({
    where: { tenantId, projectCode },
    orderBy: { memberName: 'asc' },
  }));
  return rows.map((m) => ({
    memberName: m.memberName,
    roleFa: m.roleFa,
    initials: m.initials ?? undefined,
  }));
}

export async function saveProjectsBundlePrisma(input: {
  projects: ProjectRow[];
  tasks: TaskRow[];
}): Promise<void> {
  if (!projectsPrismaEnabled()) return;
  const tenantId = TenantContext.requireTenantId();

  for (const p of input.projects) {
    await operationsSession((tx) => tx.erpProject.upsert({
      where: { tenantId_code: { tenantId, code: p.code } },
      create: {
        tenantId,
        code: p.code,
        name: p.name,
        deadline: p.deadline,
        status: p.status,
        delayDays: p.delayDays,
      },
      update: {
        name: p.name,
        deadline: p.deadline,
        status: p.status,
        delayDays: p.delayDays,
      },
    }));
  }

  for (const t of input.tasks) {
    await operationsSession((tx) => tx.erpProjectTask.upsert({
      where: { tenantId_number: { tenantId, number: t.number } },
      create: {
        tenantId,
        number: t.number,
        title: t.title,
        projectCode: t.projectCode,
        assigneeName: t.assigneeName,
        assigneeInitials: t.assigneeInitials,
        deadline: t.deadline,
        status: t.status,
        priority: t.priority,
        overdue: t.overdue ?? false,
        unassigned: t.unassigned ?? false,
        checklistDone: t.checklistDone,
        checklistTotal: t.checklistTotal,
        loggedMinutes: t.loggedMinutes,
        loggedHours: t.loggedHours,
        linkType: t.linkType,
        linkRef: t.linkRef,
      },
      update: {
        title: t.title,
        projectCode: t.projectCode,
        assigneeName: t.assigneeName,
        assigneeInitials: t.assigneeInitials,
        deadline: t.deadline,
        status: t.status,
        priority: t.priority,
        overdue: t.overdue ?? false,
        unassigned: t.unassigned ?? false,
        checklistDone: t.checklistDone,
        checklistTotal: t.checklistTotal,
        loggedMinutes: t.loggedMinutes,
        loggedHours: t.loggedHours,
        linkType: t.linkType,
        linkRef: t.linkRef,
      },
    }));
  }
}

export async function upsertProjectMembersPrisma(
  projectCode: string,
  members: ProjectMemberRow[],
): Promise<void> {
  if (!projectsPrismaEnabled()) return;
  const tenantId = TenantContext.requireTenantId();
  for (const m of members) {
    await operationsSession((tx) => tx.erpProjectMember.upsert({
      where: {
        tenantId_projectCode_memberName: { tenantId, projectCode, memberName: m.memberName },
      },
      create: {
        tenantId,
        projectCode,
        memberName: m.memberName,
        roleFa: m.roleFa,
        initials: m.initials,
      },
      update: { roleFa: m.roleFa, initials: m.initials },
    }));
  }
}