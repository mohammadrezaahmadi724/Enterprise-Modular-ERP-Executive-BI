'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge, Card, CardContent } from '@repo/ui';
import { FolderKanban, ListTodo } from 'lucide-react';
import { fetchProjectsOverview, type ProjectApi, type TaskApi } from '../../lib/projects-api';
import { DEMO_PROJECTS } from '../../lib/projects-demo';

export function ProjectsOverdueScreen() {
  const [projects, setProjects] = useState<ProjectApi[]>(DEMO_PROJECTS);
  const [tasks, setTasks] = useState<TaskApi[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProjectsOverview();
        if (data.overdueProjectsPreview?.length) setProjects(data.overdueProjectsPreview);
        setTasks(data.overdueTasksPreview ?? []);
      } catch {
        /* demo */
      }
    })();
  }, []);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardContent className="pt-4">
          <p className="font-semibold text-sm flex items-center gap-2 mb-3">
            <FolderKanban className="size-4 text-sky-600" />
            پروژه‌های عقب‌افتاده
            <span className="text-muted-foreground font-normal text-xs">{projects.length.toLocaleString('fa-IR')} مورد</span>
          </p>
          <ul className="text-xs space-y-2">
            {projects.map((p) => (
              <li key={p.code} className="flex justify-between gap-2 border-b border-dashed pb-2">
                <Link href={`/projects/projects/${encodeURIComponent(p.code)}`} className="flex-1 min-w-0 hover:text-primary">
                  <p className="font-medium">{p.name}</p>
                  <p className="font-mono text-muted-foreground">{p.code}</p>
                </Link>
                <Badge variant="secondary" className="bg-rose-100 text-rose-800">
                  {(p.delayDays ?? 0).toLocaleString('fa-IR')} روز تأخیر
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-4">
          <p className="font-semibold text-sm flex items-center gap-2 mb-3">
            <ListTodo className="size-4 text-sky-600" />
            کارهای عقب‌افتاده
            <span className="text-muted-foreground font-normal text-xs">{tasks.length.toLocaleString('fa-IR')} مورد</span>
          </p>
          <ul className="text-xs space-y-2">
            {tasks.map((t) => (
              <li key={t.number} className="flex justify-between gap-2 border-b border-dashed pb-2">
                <Link
                  href={`/projects/tasks?task=${encodeURIComponent(t.number)}`}
                  className="flex-1 min-w-0 hover:text-primary"
                >
                  <p className="font-medium">{t.title}</p>
                  <p className="font-mono text-muted-foreground">{t.projectCode}</p>
                </Link>
                <Badge variant="secondary" className="bg-rose-100 text-rose-800">
                  معوق
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
