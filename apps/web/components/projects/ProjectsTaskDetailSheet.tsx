'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Badge, Button } from '@repo/ui';
import { X, ChevronLeft, ChevronRight, Clock, CheckSquare, ClipboardList } from 'lucide-react';
import { TASK_PRIORITY_LABEL, TASK_STATUS_LABEL, type TaskStatus } from '../../lib/projects-demo';
import { patchProjectTask, updateProjectTaskStatus, type TaskApi } from '../../lib/projects-api';
import { procurementLinkForTask } from '../../lib/project-task-links';

const FLOW: TaskStatus[] = ['not_started', 'in_progress', 'done'];

export function ProjectsTaskDetailSheet({
  task,
  onClose,
  onUpdated,
}: {
  task: TaskApi | null;
  onClose: () => void;
  onUpdated: (t: TaskApi) => void;
}) {
  const [busy, setBusy] = useState(false);
  if (!task) return null;

  async function moveStatus(dir: -1 | 1) {
    const idx = FLOW.indexOf(task.status as TaskStatus);
    const next = FLOW[idx + dir];
    if (!next) return;
    setBusy(true);
    try {
      const { task: updated } = await updateProjectTaskStatus(task.number, next);
      onUpdated(updated);
    } finally {
      setBusy(false);
    }
  }

  async function tickChecklist() {
    setBusy(true);
    try {
      const { task: updated } = await patchProjectTask(task.number, { incrementChecklist: true });
      onUpdated(updated);
    } finally {
      setBusy(false);
    }
  }

  async function logTime() {
    setBusy(true);
    try {
      const { task: updated } = await patchProjectTask(task.number, { logMinutes: 30 });
      onUpdated(updated);
    } finally {
      setBusy(false);
    }
  }

  const procLink = procurementLinkForTask(task);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      <MotionPane>
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="font-semibold text-sm font-mono">{task.number}</h3>
          <button type="button" onClick={onClose} aria-label="بستن">
            <X className="size-4" />
          </button>
        </div>
        <div className="p-4 space-y-4 text-sm overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div>
            <p className="font-medium text-base leading-relaxed">{task.title}</p>
            <MotionBadges task={task} />
          </div>

          <div className="flex items-center gap-2">
            <Button type="button" size="sm" variant="outline" disabled={busy || task.status === 'not_started'} onClick={() => moveStatus(-1)}>
              <ChevronRight className="size-4" />
            </Button>
            <span className="text-xs font-medium px-2">{TASK_STATUS_LABEL[(task.status as TaskStatus) ?? 'not_started']}</span>
            <Button type="button" size="sm" variant="outline" disabled={busy || task.status === 'done'} onClick={() => moveStatus(1)}>
              <ChevronLeft className="size-4" />
            </Button>
          </div>

          <dl className="grid grid-cols-2 gap-2 text-xs">
            <dt className="text-muted-foreground">پروژه</dt>
            <dd className="font-mono">{task.projectCode ?? '—'}</dd>
            <dt className="text-muted-foreground">مسئول</dt>
            <dd>{task.assigneeName ?? 'بدون مسئول'}</dd>
            <dt className="text-muted-foreground">ددلاین</dt>
            <dd>{task.deadline ?? '—'}</dd>
          </dl>

          <div className="rounded-lg border p-3 space-y-2">
            <p className="text-xs font-medium flex items-center gap-1">
              <CheckSquare className="size-3.5" />
              چک‌لیست {(task.checklistDone ?? 0).toLocaleString('fa-IR')} / {(task.checklistTotal ?? 0).toLocaleString('fa-IR')}
            </p>
            <Button type="button" size="sm" variant="outline" disabled={busy} onClick={tickChecklist}>
              تیک مورد بعدی
            </Button>
          </div>

          <div className="rounded-lg border p-3 space-y-2">
            <p className="text-xs font-medium flex items-center gap-1">
              <Clock className="size-3.5" />
              زمان ثبت‌شده: {task.loggedHours ?? '۰'}
            </p>
            <Button type="button" size="sm" variant="outline" disabled={busy} onClick={logTime}>
              + ۳۰ دقیقه
            </Button>
          </div>

          {task.projectCode ? (
            <div className="space-y-2">
              <Link href={`/projects/projects/${encodeURIComponent(task.projectCode)}`} className="text-primary text-xs block">
                زمینه پروژه و خرید مرتبط ←
              </Link>
              <Button type="button" size="sm" variant="outline" className="w-full text-xs" asChild>
                <Link href={`/projects/projects/${encodeURIComponent(task.projectCode)}?quickPr=1`}>
                  <ClipboardList className="size-3.5 ml-1" />
                  درخواست خرید سریع برای پروژه
                </Link>
              </Button>
            </div>
          ) : null}
          {procLink ? (
            <Link href={procLink.href} className="text-primary text-xs block">
              سند مرتبط: {procLink.label}
            </Link>
          ) : null}
        </div>
      </MotionPane>
    </div>
  );
}

function MotionBadges({ task }: { task: TaskApi }) {
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      <Badge variant="secondary">{TASK_PRIORITY_LABEL[(task.priority as keyof typeof TASK_PRIORITY_LABEL) ?? 'medium']}</Badge>
      {task.overdue ? <Badge className="bg-rose-100 text-rose-800">معوق</Badge> : null}
    </div>
  );
}

function MotionPane({ children }: { children: React.ReactNode }) {
  return <aside className="w-full max-w-md h-full bg-background border-r shadow-xl">{children}</aside>;
}
