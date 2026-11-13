'use client';

import { useEffect, useState } from 'react';
import { Button } from '@repo/ui';
import { X } from 'lucide-react';
import { createProjectTask, fetchProjects, type ProjectApi } from '../../lib/projects-api';

type Step = 'scope' | 'project' | 'form';

export function ProjectsNewTaskDialog({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [step, setStep] = useState<Step>('scope');
  const [inProject, setInProject] = useState<boolean | null>(null);
  const [assignToSelf, setAssignToSelf] = useState(true);
  const [projects, setProjects] = useState<ProjectApi[]>([]);
  const [projectCode, setProjectCode] = useState('');
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('medium');
  const [linkType, setLinkType] = useState<'none' | 'purchase_request' | 'purchase_order' | 'customer' | 'document'>('none');
  const [linkRef, setLinkRef] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) {
      setStep('scope');
      setInProject(null);
      return;
    }
    (async () => {
      try {
        const { projects: rows } = await fetchProjects();
        setProjects(rows);
        if (rows[0]) setProjectCode(rows[0].code);
      } catch {
        /* */
      }
    })();
  }, [open]);

  if (!open) return null;

  async function submit() {
    if (!title.trim() || inProject === null) return;
    if (inProject && !projectCode) return;
    setSaving(true);
    try {
      await createProjectTask({
        title: title.trim(),
        inProject,
        projectCode: inProject ? projectCode : undefined,
        assignToSelf,
        deadline: deadline.trim() || undefined,
        priority,
        linkType: linkType === 'none' ? undefined : linkType,
        linkRef: linkType !== 'none' && linkRef.trim() ? linkRef.trim() : undefined,
      });
      onCreated();
      onClose();
      setTitle('');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl border bg-background shadow-lg">
        <div className="flex justify-between items-center border-b px-4 py-3">
          <h3 className="font-semibold text-sm">کار جدید</h3>
          <button type="button" onClick={onClose} className="text-muted-foreground">
            <X className="size-4" />
          </button>
        </div>
        <div className="p-4 space-y-4 text-sm">
          {step === 'scope' ? (
            <>
              <p className="text-muted-foreground">این کار داخل پروژه است؟</p>
              <div className="grid grid-cols-2 gap-2">
                <Button type="button" variant={inProject === true ? 'default' : 'outline'} className={inProject === true ? 'bg-rose-800' : ''} onClick={() => { setInProject(true); setStep('project'); }}>
                  داخل پروژه
                </Button>
                <Button type="button" variant={inProject === false ? 'default' : 'outline'} className={inProject === false ? 'bg-rose-800' : ''} onClick={() => { setInProject(false); setStep('form'); }}>
                  بدون پروژه
                </Button>
              </div>
            </>
          ) : null}

          {step === 'project' ? (
            <label className="block">
              <span className="text-xs text-muted-foreground">پروژه *</span>
              <select className="mt-1 w-full rounded-md border px-3 py-2 bg-background" value={projectCode} onChange={(e) => setProjectCode(e.target.value)}>
                <option value="">انتخاب پروژه…</option>
                {projects.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.code} — {p.name}
                  </option>
                ))}
              </select>
              <Button type="button" className="mt-3 w-full bg-rose-800" onClick={() => setStep('form')}>
                ادامه
              </Button>
            </label>
          ) : null}

          {step === 'form' ? (
            <>
              <p className="text-muted-foreground">برای چه کسی؟</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <Button type="button" variant={assignToSelf ? 'default' : 'outline'} className={assignToSelf ? 'bg-rose-800' : ''} onClick={() => setAssignToSelf(true)}>
                  خودم
                </Button>
                <Button type="button" variant={!assignToSelf ? 'default' : 'outline'} className={!assignToSelf ? 'bg-rose-800' : ''} onClick={() => setAssignToSelf(false)}>
                  همکار
                </Button>
              </div>
              <label className="block">
                <span className="text-xs">عنوان کار *</span>
                <input className="mt-1 w-full rounded-md border px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="مثلاً پیگیری پیش‌فاکتور مشتری" />
              </label>
              <label className="block">
                <span className="text-xs text-muted-foreground">ددلاین (اختیاری)</span>
                <input className="mt-1 w-full rounded-md border px-3 py-2" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="انتخاب تاریخ" />
              </label>
              <label className="block">
                <span className="text-xs">اولویت</span>
                <select className="mt-1 w-full rounded-md border px-3 py-2 bg-background" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="low">پایین</option>
                  <option value="medium">متوسط</option>
                  <option value="high">بالا</option>
                </select>
              </label>
              <label className="block">
                <span className="text-xs text-muted-foreground">مرتبط با (اختیاری)</span>
                <select
                  className="mt-1 w-full rounded-md border px-3 py-2 bg-background"
                  value={linkType}
                  onChange={(e) => setLinkType(e.target.value as typeof linkType)}
                >
                  <option value="none">—</option>
                  <option value="purchase_request">درخواست خرید</option>
                  <option value="purchase_order">سفارش خرید</option>
                  <option value="customer">مشتری / فروش</option>
                  <option value="document">سند / فاکتور</option>
                </select>
              </label>
              {linkType !== 'none' ? (
                <label className="block">
                  <span className="text-xs text-muted-foreground">شماره سند مرتبط (اختیاری)</span>
                  <input
                    className="mt-1 w-full rounded-md border px-3 py-2 font-mono text-sm"
                    value={linkRef}
                    onChange={(e) => setLinkRef(e.target.value)}
                    placeholder="مثلاً PR-00004 یا PO-001274"
                  />
                </label>
              ) : null}
            </>
          ) : null}
        </div>
        <div className="flex gap-2 border-t px-4 py-3">
          {step === 'form' ? (
            <Button type="button" disabled={saving} className="bg-rose-800" onClick={submit}>
              + ثبت کار
            </Button>
          ) : null}
          <Button type="button" variant="outline" onClick={onClose}>
            انصراف
          </Button>
        </div>
      </div>
    </div>
  );
}
