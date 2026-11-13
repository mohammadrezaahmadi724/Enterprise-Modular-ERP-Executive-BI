'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ErpModuleCode } from '@repo/contracts';
import { MEETING_TIME_SLOTS, nextSevenJalaliDays } from '@/lib/jalali-slots';
import { postMeetingRequest } from '@/lib/pricing-api';

type ContactSeed = {
  fullName?: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  selectedModules?: ErpModuleCode[];
  estimateId?: string;
  /** از ویزارد برآورد — پر کردن فرم تماس */
  initialContact?: ContactSeed;
  /** رد کردن سؤال «برآورد دارید؟» وقتی estimateId موجود است */
  skipEstimateQuestion?: boolean;
};

type Step = 'estimate' | 'type' | 'day' | 'time' | 'contact' | 'done';

export function MeetingDialog({
  open,
  onClose,
  selectedModules = [],
  estimateId,
  initialContact,
  skipEstimateQuestion = false,
}: Props) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<Step>('estimate');
  const [hasEstimate, setHasEstimate] = useState<boolean | null>(null);
  const [meetingType, setMeetingType] = useState<'phone' | 'online' | 'in_person_tehran' | null>(null);
  const [dayKey, setDayKey] = useState<string | null>(null);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    jobTitle: '',
    company: '',
    subject: '',
    note: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const days = useMemo(() => nextSevenJalaliDays(), []);
  const day = days.find((d) => d.key === dayKey);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (initialContact) {
      setForm((prev) => ({
        ...prev,
        fullName: initialContact.fullName ?? prev.fullName,
        phone: initialContact.phone ?? prev.phone,
        company: initialContact.company ?? prev.company,
        jobTitle: initialContact.jobTitle ?? prev.jobTitle,
      }));
    }
    if (skipEstimateQuestion && estimateId) {
      setHasEstimate(true);
      setStep('type');
    }
  }, [open, initialContact, skipEstimateQuestion, estimateId]);

  const stepLabel =
    step === 'estimate'
      ? 'برآورد'
      : step === 'type'
        ? 'نوع جلسه'
        : step === 'day' || step === 'time'
          ? 'زمان تماس'
          : step === 'contact'
            ? 'اطلاعات تماس'
            : 'تأیید';

  const progressIndex =
    step === 'estimate' ? 0 : step === 'type' ? 1 : step === 'day' || step === 'time' ? 2 : step === 'contact' ? 3 : 4;

  const reset = () => {
    setStep('estimate');
    setHasEstimate(null);
    setMeetingType(null);
    setDayKey(null);
    setTimeSlot(null);
    setError(null);
  };

  const close = () => {
    reset();
    onClose();
  };

  const submit = async () => {
    if (!meetingType || !day || !timeSlot) return;
    setSubmitting(true);
    setError(null);
    try {
      await postMeetingRequest({
        hasEstimate: Boolean(hasEstimate),
        estimateId,
        moduleCodes: selectedModules,
        meetingType,
        jalaliDate: `${day.weekday} ${day.label}`,
        timeSlot,
        ...form,
      });
      setStep('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'ثبت ناموفق');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="meeting-dialog backdrop:bg-black/60 rounded-2xl border bg-background p-0 max-w-lg w-[min(100%,28rem)] shadow-2xl"
      onClose={close}
    >
      <div className="meeting-dialog-inner" dir="rtl">
        <header className="flex items-center justify-between gap-3 border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1" aria-label={`گام ${progressIndex + 1} از ۴`}>
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`size-2 rounded-full ${i <= progressIndex ? 'bg-primary' : 'bg-muted'}`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{stepLabel}</span>
          </div>
          <button type="button" className="text-muted-foreground hover:text-foreground p-1" onClick={close} aria-label="بستن">
            ✕
          </button>
        </header>

        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {step === 'estimate' && (
            <>
              <h3 className="text-lg font-bold">آیا برآورد هزینه ERP دارید؟</h3>
              <p className="text-sm text-muted-foreground">
                اگر قبلاً برآورد گرفته‌اید می‌توانید آن را به جلسه پیوست کنید.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  className="meeting-choice-card rounded-xl border p-4 text-right hover:border-primary"
                  onClick={() => {
                    setHasEstimate(true);
                    setStep('type');
                  }}
                >
                  <span className="font-semibold block">بله، برآورد دارم</span>
                  <span className="text-xs text-muted-foreground">به جلسه پیوست می‌کنم</span>
                </button>
                <button
                  type="button"
                  className="meeting-choice-card rounded-xl border p-4 text-right hover:border-primary"
                  onClick={() => {
                    setHasEstimate(false);
                    close();
                    router.push('/pricing/estimate');
                  }}
                >
                  <span className="font-semibold block">خیر، برآورد ندارم</span>
                  <span className="text-xs text-muted-foreground">ابتدا برآورد می‌گیریم</span>
                </button>
              </div>
            </>
          )}

          {step === 'type' && (
            <>
              <button type="button" className="text-sm text-primary" onClick={() => setStep('estimate')}>
                بازگشت
              </button>
              <h3 className="text-lg font-bold">نوع جلسه را انتخاب کنید</h3>
              <p className="text-sm text-muted-foreground">روش ترجیحی برگزاری جلسه مشاوره را مشخص کنید.</p>
              <div className="grid gap-3">
                {[
                  { id: 'phone' as const, title: 'تلفنی', sub: 'مناسب برای بررسی سریع نیاز و مسیر شروع' },
                  { id: 'online' as const, title: 'آنلاین', sub: 'مناسب برای جزئیات، نمایش نمونه و گفت‌وگوی تیمی' },
                  { id: 'in_person_tehran' as const, title: 'حضوری فقط در تهران', sub: 'جلسه‌های جدی‌تر و چندنفره' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className="rounded-xl border p-4 text-right hover:border-primary"
                    onClick={() => {
                      setMeetingType(t.id);
                      setStep('day');
                    }}
                  >
                    <span className="font-semibold block">{t.title}</span>
                    <span className="text-xs text-muted-foreground">{t.sub}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {(step === 'day' || step === 'time') && (
            <>
              <button
                type="button"
                className="text-sm text-primary"
                onClick={() => (step === 'time' ? setStep('day') : setStep('type'))}
              >
                بازگشت
              </button>
              <h3 className="text-lg font-bold">زمان مناسب تماس را انتخاب کنید</h3>
              <div className="flex flex-wrap gap-2">
                {days.map((d) => (
                  <button
                    key={d.key}
                    type="button"
                    disabled={d.disabled}
                    className={`rounded-lg border px-3 py-2 text-sm min-w-[5.5rem] ${
                      dayKey === d.key ? 'border-primary bg-primary/10' : ''
                    } ${d.disabled ? 'opacity-40' : ''}`}
                    onClick={() => {
                      if (d.disabled) return;
                      setDayKey(d.key);
                      setStep('time');
                    }}
                  >
                    <span className="block font-medium">{d.weekday}</span>
                    <span className="block text-xs">{d.label}</span>
                    {d.disabled ? <span className="text-[10px] text-muted-foreground">تعطیل</span> : null}
                  </button>
                ))}
              </div>
              {step === 'time' && day ? (
                <div className="pt-2 border-t space-y-2">
                  <p className="text-sm font-medium">بازه‌ی زمانی را انتخاب کنید</p>
                  <div className="grid grid-cols-2 gap-2">
                    {MEETING_TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        className={`rounded-lg border px-2 py-2 text-sm ${
                          timeSlot === slot ? 'border-primary bg-primary/10' : ''
                        }`}
                        onClick={() => {
                          setTimeSlot(slot);
                          setStep('contact');
                        }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          )}

          {step === 'contact' && (
            <>
              <button type="button" className="text-sm text-primary" onClick={() => setStep('time')}>
                بازگشت
              </button>
              <h3 className="text-lg font-bold">اطلاعات تماس</h3>
              <p className="text-sm text-muted-foreground">برای تأیید و هماهنگی جلسه به این اطلاعات نیاز داریم.</p>
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  void submit();
                }}
              >
                {[
                  { key: 'fullName', label: 'نام و نام خانوادگی *', placeholder: 'نام شما' },
                  { key: 'phone', label: 'شماره تماس *', placeholder: '۰۹...' },
                  { key: 'jobTitle', label: 'سمت سازمانی *', placeholder: 'مثلاً مدیرعامل' },
                  { key: 'company', label: 'نام شرکت *', placeholder: 'نام سازمان' },
                  { key: 'subject', label: 'موضوع جلسه', placeholder: 'بررسی ERP' },
                ].map((f) => (
                  <label key={f.key} className="block text-sm">
                    <span className="text-muted-foreground">{f.label}</span>
                    <input
                      className="mt-1 w-full rounded-lg border bg-background px-3 py-2"
                      required={f.label.includes('*')}
                      placeholder={f.placeholder}
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    />
                  </label>
                ))}
                <label className="block text-sm">
                  <span className="text-muted-foreground">توضیح کوتاه</span>
                  <textarea
                    className="mt-1 w-full rounded-lg border bg-background px-3 py-2 min-h-[80px]"
                    value={form.note}
                    onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
                  />
                </label>
                {error ? <p className="text-sm text-destructive">{error}</p> : null}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-lg bg-primary text-primary-foreground py-2.5 font-medium"
                >
                  {submitting ? 'در حال ثبت…' : 'ثبت درخواست جلسه'}
                </button>
              </form>
            </>
          )}

          {step === 'done' && (
            <div className="text-center space-y-3 py-6">
              <p className="text-lg font-bold">درخواست شما ثبت شد</p>
              <p className="text-sm text-muted-foreground">تیم ERP Roshd برای هماهنگی با شما تماس می‌گیرد.</p>
              <button type="button" className="rounded-lg border px-4 py-2 text-sm" onClick={close}>
                بستن
              </button>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
