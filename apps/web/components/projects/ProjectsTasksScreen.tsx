'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Card } from '@repo/ui';
import { cn } from '@repo/ui';
import { AlertTriangle, UserX } from 'lucide-react';
import { TASK_PRIORITY_LABEL, TASK_STATUS_LABEL, TASKS_META_COUNT, type TaskStatus } from '../../lib/projects-demo';
import { fetchProjectTasks, type TaskApi } from '../../lib/projects-api';
import { ProjectsNewTaskDialog } from './ProjectsNewTaskDialog';
import { ProjectsTaskDetailSheet } from './ProjectsTaskDetailSheet';

type View = 'list' | 'board';

export function ProjectsTasksScreen() {
  const searchParams = useSearchParams();
  const taskFromUrl = searchParams.get('task')?.trim() ?? '';
  const [tasks, setTasks] = useState<TaskApi[]>([]);
  const [view, setView] = useState<View>('board');
  const [search, setSearch] = useState('');
  const [onlyOverdue, setOnlyOverdue] = useState(false);
  const [onlyUnassigned, setOnlyUnassigned] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailTask, setDetailTask] = useState<TaskApi | null>(null);

  const load = async () => {
    try {
      const { tasks: rows } = await fetchProjectTasks();
      setTasks(rows);
    } catch {
      setTasks([]);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    if (!taskFromUrl || !tasks.length) return;
    const hit = tasks.find((t) => t.number === taskFromUrl);
    if (hit) setDetailTask(hit);
  }, [taskFromUrl, tasks]);

  const filtered = useMemo(() => {
    const q = search.trim();
    return tasks.filter((t) => {
      if (onlyOverdue && !t.overdue) return false;
      if (onlyUnassigned && !t.unassigned) return false;
      if (!q) return true;
      return t.title.includes(q) || t.number.includes(q) || (t.projectCode?.includes(q) ?? false) || (t.assigneeName?.includes(q) ?? false);
    });
  }, [tasks, search, onlyOverdue, onlyUnassigned]);

  const byStatus = useMemo(() => {
    const m: Record<TaskStatus, TaskApi[]> = { not_started: [], in_progress: [], done: [] };
    for (const t of filtered) {
      const s = (t.status in TASK_STATUS_LABEL ? t.status : 'not_started') as TaskStatus;
      m[s].push(t);
    }
    return m;
  }, [filtered]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button className="bg-rose-800" onClick={() => setDialogOpen(true)}>
          + کار جدید
        </Button>
        <MotionTab active={view === 'list'} onClick={() => setView('list')}>
          فهرست
        </MotionTab>
        <MotionTab active={view === 'board'} onClick={() => setView('board')}>
          بورد
        </MotionTab>
        <span className="text-xs text-muted-foreground mr-auto">
          {(tasks.length || TASKS_META_COUNT).toLocaleString('fa-IR')} کار
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          className="rounded-md border px-3 py-2 text-sm flex-1 min-w-[200px] max-w-md"
          placeholder="عنوان، کد، پروژه یا مسئول"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="button" variant={onlyOverdue ? 'default' : 'outline'} size="sm" onClick={() => setOnlyOverdue((v) => !v)}>
          <AlertTriangle className="size-3 ml-1" />
          معوق
        </Button>
        <Button type="button" variant={onlyUnassigned ? 'default' : 'outline'} size="sm" onClick={() => setOnlyUnassigned((v) => !v)}>
          <UserX className="size-3 ml-1" />
          بدون مسئول
        </Button>
      </div>

      {view === 'list' ? (
        <Card className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/40 text-muted-foreground">
                <th className="py-2 px-3 text-right">شماره</th>
                <th className="py-2 px-3 text-right">عنوان</th>
                <th className="py-2 px-3 text-right">پروژه</th>
                <th className="py-2 px-3 text-right">مسئول</th>
                <th className="py-2 px-3 text-right">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr
                  key={t.number}
                  className={cn('border-b cursor-pointer hover:bg-muted/30', t.overdue && 'bg-rose-50/50')}
                  onClick={() => setDetailTask(t)}
                >
                  <td className="px-3 py-2 font-mono">{t.number}</td>
                  <td className="px-3 py-2">{t.title}</td>
                  <td className="px-3 py-2 font-mono">{t.projectCode ?? '—'}</td>
                  <td className="px-3 py-2">{t.assigneeName ?? '—'}</td>
                  <td className="px-3 py-2">{TASK_STATUS_LABEL[(t.status as TaskStatus) ?? 'not_started']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ) : (
        <div className="grid gap-3 lg:grid-cols-3">
          {(['not_started', 'in_progress', 'done'] as TaskStatus[]).map((status) => (
            <BoardColumn key={status} title={TASK_STATUS_LABEL[status]} tasks={byStatus[status]} onOpen={setDetailTask} />
          ))}
        </div>
      )}

      <ProjectsNewTaskDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onCreated={load} />
      <ProjectsTaskDetailSheet
        task={detailTask}
        onClose={() => setDetailTask(null)}
        onUpdated={(t) => {
          setTasks((prev) => prev.map((x) => (x.number === t.number ? t : x)));
          setDetailTask(t);
        }}
      />
    </div>
  );
}

function BoardColumn({
  title,
  tasks,
  onOpen,
}: {
  title: string;
  tasks: TaskApi[];
  onOpen: (t: TaskApi) => void;
}) {
  return (
    <Card className="p-3 min-h-[200px]">
      <p className="text-xs font-semibold mb-2 flex justify-between">
        {title}
        <Badge variant="secondary">{tasks.length.toLocaleString('fa-IR')}</Badge>
      </p>
      <div className="space-y-2">
        {tasks.map((t) => (
          <MotionCard task={t} key={t.number} onOpen={() => onOpen(t)} />
        ))}
      </div>
    </Card>
  );
}

function MotionCard({ task: t, onOpen }: { task: TaskApi; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        'rounded-lg border p-2 text-xs space-y-1 w-full text-right hover:ring-2 hover:ring-sky-200',
        t.overdue && 'border-rose-300 bg-rose-50/40',
      )}
    >
      <div className="flex justify-between gap-1">
        <span className="font-mono text-[10px] text-muted-foreground">{t.number}</span>
        <Badge variant="secondary" className="text-[10px]">
          {TASK_PRIORITY_LABEL[(t.priority as keyof typeof TASK_PRIORITY_LABEL) ?? 'medium']}
        </Badge>
      </div>
      <p className="font-medium leading-snug">{t.title}</p>
      {t.projectCode ? <p className="font-mono text-[10px] text-muted-foreground">{t.projectCode}</p> : null}
      <MotionFtr t={t} />
    </button>
  );
}

function MotionFtr({ t }: { t: TaskApi }) {
  return (
    <div className="flex justify-between text-[10px] text-muted-foreground pt-1">
      <span>{t.assigneeInitials ?? '—'}</span>
      <span>
        {t.checklistTotal ? `${t.checklistDone ?? 0}/${t.checklistTotal}` : ''} {t.loggedHours ? `· ${t.loggedHours}` : ''}{' '}
        {t.deadline ?? ''}
      </span>
    </div>
  );
}

function MotionTab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" className={cn('rounded-md border px-3 py-1.5 text-xs', active && 'bg-muted font-semibold')} onClick={onClick}>
      {children}
    </button>
  );
}
