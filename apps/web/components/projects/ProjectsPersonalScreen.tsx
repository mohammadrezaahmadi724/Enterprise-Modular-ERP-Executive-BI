'use client';

import { useEffect, useState } from 'react';
import { Button, Card } from '@repo/ui';
import { CheckSquare, X } from 'lucide-react';
import { createPersonalTask, fetchPersonalTasks, togglePersonalTask, type PersonalTaskApi } from '../../lib/projects-api';

export function ProjectsPersonalScreen() {
  const [rows, setRows] = useState<PersonalTaskApi[]>([]);
  const [draft, setDraft] = useState('');

  const load = async () => {
    try {
      const { tasks } = await fetchPersonalTasks();
      setRows(tasks);
    } catch {
      /* */
    }
  };

  useEffect(() => {
    void load();
  }, []);

  async function addFromInput() {
    const title = draft.trim();
    if (!title) return;
    const { task } = await createPersonalTask(title);
    setRows((prev) => [task, ...prev]);
    setDraft('');
  }

  return (
    <div className="space-y-4">
      <Card className="border-sky-100 overflow-hidden">
        <div className="flex items-center gap-2 border-b bg-sky-50/60 px-4 py-3">
          <CheckSquare className="size-5 text-sky-700" />
          <div>
            <p className="font-semibold text-sm">کارهای شخصی</p>
            <p className="text-xs text-muted-foreground">
              {rows.filter((r) => !r.done).length.toLocaleString('fa-IR')} مورد باز
            </p>
          </div>
        </div>
        <div className="flex gap-2 p-3 border-b">
          <Button type="button" size="sm" className="bg-rose-100 text-rose-900 hover:bg-rose-200 shrink-0" onClick={addFromInput}>
            + افزودن
          </Button>
          <input
            className="flex-1 rounded-md border border-violet-300 px-3 py-2 text-sm"
            placeholder="یادداشت جدید… (Enter برای ثبت)"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                void addFromInput();
              }
            }}
          />
        </div>
        <ul className="divide-y text-sm">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center gap-3 px-4 py-2">
              <button type="button" className="text-muted-foreground hover:text-destructive" aria-label="حذف">
                <X className="size-3.5" />
              </button>
              <label className="flex items-center gap-2 flex-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={r.done}
                  onChange={async () => {
                    const { task } = await togglePersonalTask(r.id);
                    setRows((prev) => prev.map((x) => (x.id === task.id ? task : x)));
                  }}
                />
                <span className={r.done ? 'line-through text-muted-foreground' : ''}>
                  {r.title}
                  {r.noteCount != null ? (
                    <span className="text-muted-foreground mr-1">({r.noteCount.toLocaleString('fa-IR')})</span>
                  ) : null}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
