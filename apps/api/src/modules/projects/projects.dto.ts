export type ProjectStatus = 'active' | 'on_hold' | 'completed' | 'canceled';

export type TaskStatus = 'not_started' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export type ProjectDto = {
  code: string;
  name: string;
  deadline?: string;
  status: ProjectStatus;
  delayDays?: number;
};

export type CreateProjectBody = {
  name: string;
  deadline?: string;
};

export type TaskLinkType = 'none' | 'purchase_request' | 'purchase_order' | 'customer' | 'document';

export type TaskDto = {
  number: string;
  title: string;
  projectCode?: string;
  assigneeName?: string;
  assigneeInitials?: string;
  deadline?: string;
  status: TaskStatus;
  priority: TaskPriority;
  overdue?: boolean;
  unassigned?: boolean;
  checklistDone?: number;
  checklistTotal?: number;
  loggedHours?: string;
  loggedMinutes?: number;
  linkType?: TaskLinkType;
  linkRef?: string;
};

export type PatchTaskBody = {
  status?: TaskStatus;
  incrementChecklist?: boolean;
  logMinutes?: number;
};

export type ProjectFinanceContextDto = {
  costCenterCode?: string;
  costCenterName?: string;
  budgetToman: number;
  spentToman: number;
  progressPct: number;
  budgetUtilizationPct: number;
  detailHref: string;
  sources: string[];
};

export type ProjectTeamMemberDto = {
  name: string;
  role: string;
  initials?: string;
};

export type ProjectContextDto = {
  project: ProjectDto;
  team: ProjectTeamMemberDto[];
  tasks: TaskDto[];
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
  finance: ProjectFinanceContextDto;
  links: {
    financeCostCenters: string;
    procurementHub: string;
  };
};

export type AssistantInsightSeverity = 'info' | 'warning' | 'critical';

export type AssistantInsightDto = {
  id: string;
  severity: AssistantInsightSeverity;
  title: string;
  body: string;
  href?: string;
};

export type ProjectsAssistantDto = {
  enabled: true;
  generatedAt: string;
  insights: AssistantInsightDto[];
};

export type CreateTaskBody = {
  title: string;
  inProject: boolean;
  projectCode?: string;
  assignToSelf: boolean;
  assigneeName?: string;
  deadline?: string;
  priority?: TaskPriority;
  linkType?: TaskLinkType;
  linkRef?: string;
};

export type ReminderDto = {
  id: string;
  title: string;
  scheduleAt: string;
  channel: 'panel' | 'email' | 'sms';
  pastDue?: boolean;
};

export type CreateReminderBody = {
  title: string;
  scheduleAt: string;
  channel?: 'panel' | 'email' | 'sms';
};

export type PersonalTaskDto = {
  id: string;
  title: string;
  done: boolean;
  noteCount?: number;
};

export type ProjectsOverviewDto = {
  kpis: {
    activeProjects: number;
    nearingDeadlineCount: number;
    openTasks: number;
    overdueTasks: number;
    todayTasksInbox: number;
  };
  projectsPreview: ProjectDto[];
  overdueTasksPreview: TaskDto[];
  overdueProjectsPreview: ProjectDto[];
};
