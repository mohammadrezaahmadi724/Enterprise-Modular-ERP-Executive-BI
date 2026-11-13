'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  CheckCircle2,
  MessageSquare,
  Shield,
  Sparkles,
  X,
} from 'lucide-react';
import {
  ESTIMATOR_BRANCH_OPTIONS,
  ESTIMATOR_INDUSTRY_OPTIONS,
  ESTIMATOR_INTEGRATION_OPTIONS,
  ESTIMATOR_MGMT_OPTIONS,
  ESTIMATOR_WIZARD_MODULES,
  computeWizardEstimate,
  ALL_ESTIMATOR_WIZARD_MODULE_IDS,
  defaultRecommendedModules,
  ESTIMATOR_DELIVERY_LABELS,
  type EstimatorComplexity,
  type EstimatorDeliveryMode,
  type EstimatorDeployment,
  type EstimatorWizardModuleId,
  type WizardEstimateResult,
  type CloudSubscriptionRates,
  DEFAULT_CLOUD_SUBSCRIPTION_RATES,
} from '@repo/contracts';
import {
  fetchPricingCatalog,
  postWizardEstimate,
  sendEstimateOtp,
  verifyEstimateOtp,
} from '@/lib/pricing-api';
import { MeetingDialog } from '@/components/marketing/MeetingDialog';
import { EstimatorResultExtras } from '@/components/estimator/EstimatorResultExtras';
import { BRAND_NAME } from '@/lib/brand';
import { cloudCheckoutUrlForEstimate } from '@/lib/cloud-checkout';
import { CLOUD_CHECKOUT_URL, CLOUD_REGISTER_URL } from '@/lib/constants';
import { sakhtarUrlToStepIndex, stepIndexToSakhtarUrl } from '@/lib/estimate-sakhtar-url';

const fmtM = (tomans: number) =>
  new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 }).format(Math.round(tomans / 1_000_000));

const fmtK = (tomans: number) =>
  new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 }).format(Math.round(tomans / 1000));

type ModuleDetailState = { complexity: EstimatorComplexity; addonIds: string[] };

type StepKind =
  | { type: 'identity' }
  | { type: 'profile' }
  | { type: 'delivery' }
  | { type: 'modules' }
  | { type: 'module'; id: EstimatorWizardModuleId; index: number; total: number }
  | { type: 'integrations' }
  | { type: 'phone' }
  | { type: 'otp' }
  | { type: 'result' };

function buildSteps(
  deliveryMode: EstimatorDeliveryMode,
  selected: EstimatorWizardModuleId[],
): StepKind[] {
  const steps: StepKind[] = [
    { type: 'identity' },
    { type: 'profile' },
    { type: 'delivery' },
    { type: 'modules' },
  ];
  if (deliveryMode === 'custom_implementation') {
    selected.forEach((id, i) => {
      steps.push({ type: 'module', id, index: i + 1, total: selected.length });
    });
  }
  steps.push({ type: 'integrations' }, { type: 'phone' }, { type: 'otp' }, { type: 'result' });
  return steps;
}

function deploymentLabel(d: EstimatorDeployment) {
  return d === 'private_cloud' ? 'ابر اختصاصی' : 'سرور سازمان';
}

export function ProjectEstimatorWizard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [urlReady, setUrlReady] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [fullName, setFullName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [industry, setIndustry] = useState<string>(ESTIMATOR_INDUSTRY_OPTIONS[0]);
  const [userCount, setUserCount] = useState(35);
  const [branch, setBranch] = useState<string>(ESTIMATOR_BRANCH_OPTIONS[0]);
  const [mgmtMethod, setMgmtMethod] = useState<string>(ESTIMATOR_MGMT_OPTIONS[0]);
  const [selectedModules, setSelectedModules] = useState<EstimatorWizardModuleId[]>(
    defaultRecommendedModules(ESTIMATOR_INDUSTRY_OPTIONS[0]),
  );
  const [moduleDetails, setModuleDetails] = useState<Record<string, ModuleDetailState>>({});
  const [integrations, setIntegrations] = useState<string[]>(['data-migration']);
  const [deliveryMode, setDeliveryMode] = useState<EstimatorDeliveryMode>('cloud_saas');
  const [deployment, setDeployment] = useState<EstimatorDeployment>('private_cloud');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [resendSec, setResendSec] = useState(0);
  const [verified, setVerified] = useState(false);
  const [estimate, setEstimate] = useState<WizardEstimateResult | null>(null);
  const [estimateId, setEstimateId] = useState<string | undefined>();
  const [toast, setToast] = useState('');
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cloudRates, setCloudRates] = useState<CloudSubscriptionRates>(DEFAULT_CLOUD_SUBSCRIPTION_RATES);

  useEffect(() => {
    void fetchPricingCatalog()
      .then((c) => {
        if (c.cloudSubscription) setCloudRates(c.cloudSubscription);
      })
      .catch(() => {
        /* پیش‌نمایش با defaults */
      });
  }, []);

  const steps = useMemo(
    () => buildSteps(deliveryMode, selectedModules),
    [deliveryMode, selectedModules],
  );
  const step = steps[stepIndex] ?? steps[0];
  const totalSteps = steps.length;
  const progress = ((stepIndex + 1) / totalSteps) * 100;

  useEffect(() => {
    setStepIndex((i) => Math.min(i, steps.length - 1));
  }, [steps.length, deliveryMode]);

  useEffect(() => {
    const raw = searchParams.get('step');
    if (raw) {
      const n = Number(raw);
      if (!Number.isNaN(n)) {
        setStepIndex(sakhtarUrlToStepIndex(steps, n, { verified }));
      }
    }
    setUrlReady(true);
    // deep-link فقط در بار اول
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!urlReady) return;
    const sakhtarStep = stepIndexToSakhtarUrl(steps, stepIndex);
    const current = searchParams.get('step');
    const want = sakhtarStep === undefined ? null : String(sakhtarStep);
    if (current === want || (!current && want === null)) return;
    const params = new URLSearchParams(searchParams.toString());
    if (want === null) params.delete('step');
    else params.set('step', want);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [stepIndex, steps, urlReady, verified, pathname, router, searchParams]);

  useEffect(() => {
    if (resendSec <= 0) return;
    const t = setTimeout(() => setResendSec((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendSec]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3200);
  };

  const wizardInput = useMemo(
    () => ({
      userCount,
      deliveryMode,
      deployment,
      integrations,
      cloudRates,
      modules: selectedModules.map((moduleId) => {
        const d = moduleDetails[moduleId] ?? { complexity: 'standard' as const, addonIds: [] };
        return { moduleId, complexity: d.complexity, addonIds: d.addonIds };
      }),
    }),
    [userCount, deliveryMode, deployment, integrations, selectedModules, moduleDetails, cloudRates],
  );

  const localPreview = useMemo(() => computeWizardEstimate(wizardInput), [wizardInput]);

  const cloudCheckoutHref = useMemo(
    () =>
      cloudCheckoutUrlForEstimate({
        seats: userCount,
        moduleIds: selectedModules,
        estimateId,
        deliveryMode,
      }),
    [userCount, selectedModules, estimateId, deliveryMode],
  );

  const toggleModule = (id: EstimatorWizardModuleId) => {
    setSelectedModules((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter((x) => x !== id);
      }
      return [...prev, id];
    });
  };

  const setModuleDetail = (id: EstimatorWizardModuleId, patch: Partial<ModuleDetailState>) => {
    setModuleDetails((prev) => ({
      ...prev,
      [id]: { complexity: 'standard', addonIds: [], ...prev[id], ...patch },
    }));
  };

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const canContinue = useCallback((): boolean => {
    switch (step.type) {
      case 'identity':
        return fullName.trim().length >= 2 && orgName.trim().length >= 1;
      case 'modules':
        return selectedModules.length > 0;
      case 'phone':
        return /^09\d{9}$/.test(phone.replace(/\s/g, ''));
      case 'otp':
        return otp.trim().length >= 4;
      default:
        return true;
    }
  }, [step, fullName, orgName, selectedModules, phone, otp]);

  const goNext = async () => {
    if (!canContinue()) {
      showToast('لطفاً فیلدهای الزامی را کامل کنید');
      return;
    }
    if (step.type === 'phone') {
      setLoading(true);
      try {
        const r = await sendEstimateOtp(phone.replace(/\s/g, ''));
        setResendSec(60);
        if (r.devCode) showToast(`کد آزمایشی: ${r.devCode}`);
        setStepIndex((i) => i + 1);
      } catch (e) {
        showToast(e instanceof Error ? e.message : 'خطا در ارسال پیامک');
      } finally {
        setLoading(false);
      }
      return;
    }
    if (step.type === 'otp') {
      setLoading(true);
      try {
        const preview = computeWizardEstimate(wizardInput);
        await verifyEstimateOtp(phone.replace(/\s/g, ''), otp.trim(), {
          fullName,
          orgName,
          industry,
          userCount,
          wizard: wizardInput,
          preview,
        });
        setVerified(true);
        const api = await postWizardEstimate(wizardInput);
        setEstimate(api);
        setEstimateId(api.estimateId);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('last_estimate_id', api.estimateId);
          sessionStorage.setItem('last_estimate_modules', JSON.stringify(api.moduleCodes));
        }
        setStepIndex((i) => i + 1);
      } catch (e) {
        showToast(e instanceof Error ? e.message : 'تأیید ناموفق');
      } finally {
        setLoading(false);
      }
      return;
    }
    if (stepIndex < steps.length - 1) setStepIndex((i) => i + 1);
  };

  const goBack = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };

  const stepLabel =
    step.type === 'identity'
      ? 'شروع برآورد'
      : step.type === 'profile'
        ? 'شناخت اولیه'
        : step.type === 'delivery'
          ? 'مسیر همکاری'
        : step.type === 'modules'
          ? 'انتخاب راهکارها'
          : step.type === 'module'
            ? `جزئیات ماژول ${step.index} از ${step.total}`
            : step.type === 'integrations'
              ? deliveryMode === 'cloud_saas'
                ? 'راه‌اندازی و اتصال‌های اولیه'
                : 'پیاده‌سازی و اتصال‌ها'
              : step.type === 'phone'
                ? 'تأیید هویت'
                : step.type === 'otp'
                  ? 'تأیید هویت'
                  : 'نتیجه برآورد';

  const primaryLabel =
    step.type === 'integrations'
      ? 'ادامه به تأیید هویت'
      : step.type === 'phone'
        ? 'ارسال کد تأیید'
        : step.type === 'otp'
          ? 'تأیید و مشاهده برآورد'
          : step.type === 'result'
            ? 'رزرو مشاوره با همین برآورد'
            : 'ادامه';

  const result = estimate ?? (step.type === 'result' && verified ? localPreview : null);

  return (
  <EstimateRoot>
  <div className="est-app estimate-page-shell">
    <div className="est-wizard-col">
      <header className="est-wizard-header">
        <div className="est-wizard-top">
          <Link href="/pricing" className="est-icon-button" title="بستن برآوردگر" aria-label="بستن برآوردگر">
            <X size={16} />
          </Link>
          <div className="est-wizard-title">
            <strong>برآوردگر پروژه</strong>
            <span>
              مرحله {stepIndex + 1} از {totalSteps}
            </span>
          </div>
          <div className="est-brand" style={{ justifyContent: 'flex-end' }}>
            <span className="est-brand-mark" aria-hidden>ER</span>
          </div>
        </div>
        <div className="est-progress-track" aria-hidden="true">
          <div className="est-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <div
        className={`est-wizard-body est-wizard-body--${step.type}`}
        tabIndex={-1}
      >
        {step.type === 'identity' ? (
          <div className="est-step-enter">
            <div className="est-step-label">{stepLabel}</div>
            <h2 className="est-step-heading">با چه کسی و کدام سازمان در ارتباطیم؟</h2>
            <p className="est-step-copy">
              نام شما و سازمان‌تان کمک می‌کند برآورد را دقیق‌تر برای کسب‌وکار شما آماده کنیم و در تماس بعدی درست شما را خطاب کنیم.
            </p>
            <div className="est-form-stack">
              <div className="est-form-field">
                <label htmlFor="identity-name">
                  نام و نام خانوادگی <span className="est-required">*</span>
                </label>
                <input
                  id="identity-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="مثلاً رضا محمدی"
                  autoComplete="name"
                />
              </div>
              <div className="est-form-field">
                <label htmlFor="identity-org">
                  نام سازمان / کسب‌وکار <span className="est-required">*</span>
                </label>
                <input
                  id="identity-org"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="مثلاً شرکت ساختار سیستم"
                  autoComplete="organization"
                />
              </div>
            </div>
          </div>
        ) : null}

        {step.type === 'profile' ? (
          <div className="est-step-enter">
            <div className="est-step-label">{stepLabel}</div>
            <h2 className="est-step-heading">کسب‌وکار شما چه ساختاری دارد؟</h2>
            <p className="est-step-copy">این اطلاعات فقط برای پیشنهاد مسیر مناسب و تخمین سطح پروژه استفاده می‌شود.</p>
            <div className="est-field">
              <div className="est-field-label">
                <span>حوزه فعالیت</span>
                <small>انتخاب کنید</small>
              </div>
              <div className="est-select-wrap">
                <select
                  aria-label="حوزه فعالیت"
                  value={industry}
                  onChange={(e) => {
                    const v = e.target.value;
                    setIndustry(v);
                    setSelectedModules(defaultRecommendedModules(v));
                  }}
                >
                  {ESTIMATOR_INDUSTRY_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} />
              </div>
            </div>
            <div className="est-field">
              <div className="est-field-label">
                <span>تعداد کاربران سیستم</span>
                <small>تقریبی کافی است</small>
              </div>
              <div className="est-stepper">
                <button type="button" aria-label="کم کردن" onClick={() => setUserCount((u) => Math.max(5, u - 5))}>
                  −
                </button>
                <div className="est-stepper-value">{new Intl.NumberFormat('fa-IR').format(userCount)} نفر</div>
                <button type="button" aria-label="افزایش" onClick={() => setUserCount((u) => Math.min(500, u + 5))}>
                  +
                </button>
              </div>
            </div>
            <div className="est-field">
              <div className="est-field-label">
                <span>ساختار شعب</span>
              </div>
              <div className="est-choice-grid">
                {ESTIMATOR_BRANCH_OPTIONS.map((o) => (
                  <button
                    key={o}
                    type="button"
                    className={`est-choice ${branch === o ? 'is-selected' : ''}`}
                    onClick={() => setBranch(o)}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
            <div className="est-field">
              <div className="est-field-label">
                <span>روش فعلی مدیریت</span>
              </div>
              <div className="est-choice-grid">
                {ESTIMATOR_MGMT_OPTIONS.map((o) => (
                  <button
                    key={o}
                    type="button"
                    className={`est-choice ${mgmtMethod === o ? 'is-selected' : ''}`}
                    onClick={() => setMgmtMethod(o)}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
            {deliveryMode === 'cloud_saas' ? (
              <p className="est-cloud-hint text-sm text-muted-foreground border rounded-lg px-3 py-2 mt-2">
                پیش‌نمایش ابری: ماهی{' '}
                <strong className="text-foreground">{fmtM(localPreview.cloudMonthlyTomans)}</strong> میلیون تومان برای{' '}
                {new Intl.NumberFormat('fa-IR').format(userCount)} کاربر — جزئیات پس از انتخاب ماژول‌ها دقیق‌تر می‌شود.
              </p>
            ) : null}
          </div>
        ) : null}

        {step.type === 'delivery' ? (
          <div className="est-step-enter">
            <div className="est-step-label">{stepLabel}</div>
            <h2 className="est-step-heading">می‌خواهید ERP را چطور راه بیندازید؟</h2>
            <p className="est-step-copy">
              مسیر ابری برای شروع سریع با اشتراک ماهانه است؛ مسیر اختصاصی برای پیاده‌سازی روی سرور سازمان یا ابر اختصاصی شماست.
            </p>
            <div className="est-delivery-grid grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className={`est-delivery-card rounded-xl border p-4 text-right transition ${deliveryMode === 'cloud_saas' ? 'is-selected border-primary ring-1 ring-primary/30' : ''}`}
                onClick={() => setDeliveryMode('cloud_saas')}
              >
                <strong className="flex items-center gap-2 text-base">
                  <Sparkles size={18} /> ERP ابری سازمانی
                </strong>
                <p className="text-sm text-muted-foreground mt-2">
                  فعال‌سازی روی ابر ساختار؛ تعرفه ماهانه بر اساس ماژول و تعداد کاربر؛ بدون پروژه سنگین پیاده‌سازی.
                </p>
                <span className="text-xs mt-3 block text-primary">تعرفه به ازای هر کاربر شفاف در نتیجه</span>
              </button>
              <button
                type="button"
                className={`est-delivery-card rounded-xl border p-4 text-right transition ${deliveryMode === 'custom_implementation' ? 'is-selected border-primary ring-1 ring-primary/30' : ''}`}
                onClick={() => setDeliveryMode('custom_implementation')}
              >
                <strong className="flex items-center gap-2 text-base">
                  <Shield size={18} /> پیاده‌سازی اختصاصی
                </strong>
                <p className="text-sm text-muted-foreground mt-2">
                  پروژه کامل تحلیل، سفارشی‌سازی، یکپارچه‌سازی و استقرار روی سرور سازمان یا ابر اختصاصی.
                </p>
                <span className="text-xs mt-3 block text-muted-foreground">بازه سرمایه‌گذاری اولیه + زمان اجرا</span>
              </button>
            </div>
          </div>
        ) : null}

        {step.type === 'modules' ? (
          <div className="est-step-enter">
            <div className="est-step-label">{stepLabel}</div>
            <h2 className="est-step-heading">کدام بخش‌ها باید یکپارچه شوند؟</h2>
            <p className="est-step-copy">
              {deliveryMode === 'cloud_saas'
                ? 'ماژول‌های فعال روی اشتراک ماهیانه شما لحاظ می‌شوند. می‌توانید همه را یکجا انتخاب کنید.'
                : 'حداقل یک راهکار انتخاب کنید. جزئیات هر انتخاب در صفحه بعد جداگانه پرسیده می‌شود.'}
            </p>
            <AllModulesButton
              allSelected={selectedModules.length === ALL_ESTIMATOR_WIZARD_MODULE_IDS.length}
              onSelectAll={() => setSelectedModules([...ALL_ESTIMATOR_WIZARD_MODULE_IDS])}
              onClear={() =>
                setSelectedModules(defaultRecommendedModules(industry) as EstimatorWizardModuleId[])
              }
            />
            <div className="est-recommended-note">
              <Sparkles size={16} />
              <span>با توجه به حوزه فعالیت، مسیر پیشنهادی انتخاب شده؛ می‌توانید تغییرش دهید.</span>
            </div>
            <div className="est-module-picker">
              {ESTIMATOR_WIZARD_MODULES.map((m) => {
                const on = selectedModules.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    className={`est-module-choice ${on ? 'is-selected' : ''}`}
                    style={{ ['--module' as string]: m.color }}
                    aria-pressed={on}
                    onClick={() => toggleModule(m.id)}
                  >
                    <span className="est-module-check">{on ? <CheckCircle2 size={14} /> : null}</span>
                    <span className="est-module-choice-title">{m.nameFa}</span>
                    <span className="est-module-choice-meta">{m.metaFa}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {step.type === 'module'
          ? (() => {
              const def = ESTIMATOR_WIZARD_MODULES.find((m) => m.id === step.id);
              if (!def) return null;
              const detail = moduleDetails[def.id] ?? { complexity: 'standard', addonIds: [] };
              return (
                <div className="est-step-enter" style={{ ['--module' as string]: def.color }}>
                  <div className="est-step-label">{stepLabel}</div>
                  <div className="est-module-detail-head">
                    <div className="est-detail-icon">
                      <Sparkles size={22} />
                    </div>
                    <div>
                      <h2 className="est-step-heading" style={{ marginBottom: 0 }}>
                        {def.nameFa}
                      </h2>
                      <p className="est-step-copy">{def.metaFa}؛ فقط مواردی را انتخاب کنید که واقعاً برای شروع نیاز دارید.</p>
                    </div>
                  </div>
                  <div className="est-included-card">
                    <div className="est-included-title">
                      <CheckCircle2 size={16} /> قابلیت‌های پایه این راهکار
                    </div>
                    <div className="est-included-grid">
                      {def.includedFeatures.map((f) => (
                        <div key={f} className="est-included-item">
                          <CheckCircle2 size={14} />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="est-addons-head">
                    <strong>قابلیت‌های تکمیلی</strong>
                    <span>انتخاب هر مورد روی دامنه، زمان و هزینه اثر دارد</span>
                  </div>
                  <div className="est-addon-list">
                    {def.addons.map((a) => {
                      const pressed = detail.addonIds.includes(a.id);
                      return (
                        <button
                          key={a.id}
                          type="button"
                          className={`est-addon ${!a.availableInProduct ? 'is-unavailable' : ''}`}
                          style={{ ['--module' as string]: def.color }}
                          aria-pressed={pressed}
                          disabled={!a.availableInProduct}
                          onClick={() => {
                            if (!a.availableInProduct) return;
                            const next = pressed
                              ? detail.addonIds.filter((x) => x !== a.id)
                              : [...detail.addonIds, a.id];
                            setModuleDetail(def.id, { addonIds: next });
                          }}
                        >
                          <span className="est-addon-copy">
                            <strong>
                              {a.titleFa}
                              {!a.availableInProduct ? (
                                <span className="est-addon-badge">به‌زودی</span>
                              ) : null}
                            </strong>
                            <span>{a.descriptionFa}</span>
                          </span>
                          <span className="est-toggle" aria-hidden="true" />
                        </button>
                      );
                    })}
                  </div>
                  <div className="est-complexity">
                    <div className="est-field-label">
                      <span>سطح سفارشی‌سازی این بخش</span>
                    </div>
                    <div className="est-segments">
                      {(['minimal', 'standard', 'advanced'] as const).map((c) => (
                        <button
                          key={c}
                          type="button"
                          className={`est-segment ${detail.complexity === c ? 'is-selected' : ''}`}
                          onClick={() => setModuleDetail(def.id, { complexity: c })}
                        >
                          {c === 'minimal' ? 'حداقلی' : c === 'standard' ? 'استاندارد' : 'پیشرفته'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()
          : null}

        {step.type === 'integrations' ? (
          <div className="est-step-enter">
            <div className="est-step-label">{stepLabel}</div>
            <h2 className="est-step-heading">
              {deliveryMode === 'cloud_saas' ? 'راه‌اندازی و اتصال‌های اولیه' : 'چه چیزهایی باید به ERP متصل شود؟'}
            </h2>
            <p className="est-step-copy">
              {deliveryMode === 'cloud_saas'
                ? 'سرویس روی ابر سازمانی ساختار میزبانی می‌شود. انتقال داده و یکپارچه‌سازی‌های ضروری را مشخص کنید.'
                : 'اتصال به ابزارهای فعلی و انتقال داده بخش مهمی از دامنه واقعی پروژه است.'}
            </p>
            <div className="est-integration-list">
              {ESTIMATOR_INTEGRATION_OPTIONS.map((row) => {
                const on = integrations.includes(row.id);
                return (
                  <button
                    key={row.id}
                    type="button"
                    className={`est-integration ${on ? 'is-selected' : ''}`}
                    aria-pressed={on}
                    onClick={() => toggleIntegration(row.id)}
                  >
                    <span className="est-integration-icon">
                      <Sparkles size={16} />
                    </span>
                    <span>
                      <strong>
                        {row.titleFa}
                        {!row.availableInProduct ? (
                          <span className="est-addon-badge">نیازمند بررسی</span>
                        ) : null}
                      </strong>
                      <small>{row.subtitleFa}</small>
                    </span>
                    <span className="est-integration-check">
                      <CheckCircle2 size={16} />
                    </span>
                  </button>
                );
              })}
            </div>
            {deliveryMode === 'custom_implementation' ? (
              <div className="est-field">
                <div className="est-field-label">
                  <span>محل استقرار نسخه اختصاصی</span>
                </div>
                <div className="est-choice-grid">
                  <button
                    type="button"
                    className={`est-choice ${deployment === 'private_cloud' ? 'is-selected' : ''}`}
                    onClick={() => setDeployment('private_cloud')}
                  >
                    ابر اختصاصی
                  </button>
                  <button
                    type="button"
                    className={`est-choice ${deployment === 'on_prem' ? 'is-selected' : ''}`}
                    onClick={() => setDeployment('on_prem')}
                  >
                    سرور سازمان (On-Premise)
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground border rounded-lg px-3 py-2">
                استقرار: <strong>ERP ابری سازمانی</strong> روی زیرساخت ساختار — بدون نیاز به سرور اختصاصی شما.
              </p>
            )}
          </div>
        ) : null}

        {step.type === 'phone' ? (
          <div className="est-step-enter">
            <div className="est-step-label">{stepLabel}</div>
            <h2 className="est-step-heading">شماره موبایل خود را وارد کنید</h2>
            <p className="est-step-copy">
              برای نمایش نتیجهٔ برآورد یک کد تأیید برایتان پیامک می‌شود. نتیجه فقط پس از تأیید شماره نمایش داده می‌شود.
            </p>
            <div className="est-privacy-note">
              <Shield size={18} />
              <span>شماره شما فقط برای هماهنگی با تیم فروش استفاده می‌شود.</span>
            </div>
            <div className="est-form-field">
              <label htmlFor="est-phone">
                شماره موبایل <span className="est-required">*</span>
              </label>
              <input
                id="est-phone"
                inputMode="tel"
                placeholder="۰۹…"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                dir="ltr"
                className="text-left"
              />
            </div>
          </div>
        ) : null}

        {step.type === 'otp' ? (
          <div className="est-step-enter">
            <div className="est-step-label">{stepLabel}</div>
            <h2 className="est-step-heading">کد پیامک‌شده را وارد کنید</h2>
            <p className="est-step-copy">کد پنج‌رقمی به {phone} ارسال شد.</p>
            <div className="est-form-field">
              <label htmlFor="est-otp">کد تأیید</label>
              <input
                id="est-otp"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                dir="ltr"
                className="text-left text-lg tracking-widest"
              />
            </div>
            {resendSec > 0 ? (
              <p className="text-xs text-muted-foreground mt-2">امکان ارسال مجدد تا {resendSec} ثانیه دیگر</p>
            ) : (
              <button
                type="button"
                className="text-sm text-primary mt-2 hover:underline"
                onClick={() => {
                  void sendEstimateOtp(phone.replace(/\s/g, '')).then((r) => {
                    setResendSec(60);
                    if (r.devCode) showToast(`کد آزمایشی: ${r.devCode}`);
                  });
                }}
              >
                ارسال دوباره‌ی کد
              </button>
            )}
          </div>
        ) : null}

        {step.type === 'result' && result ? (
          <div className="est-step-enter">
            <ResultHero
              result={result}
              deliveryMode={deliveryMode}
              userCount={userCount}
              checkoutHref={cloudCheckoutHref}
              onEdit={() => setStepIndex(0)}
            />

            {result.primaryQuoteKind === 'cloud_monthly' ? (
              <CloudMonthlyBreakdownPanel result={result} cloudRates={cloudRates} />
            ) : (
              <aside className="est-cloud-start">
                <strong className="flex items-center gap-1">
                  <Sparkles size={16} /> مقایسه: شروع سریع با ERP ابری
                </strong>
                <p className="text-sm text-muted-foreground mt-2">
                  همان ماژول‌ها و {new Intl.NumberFormat('fa-IR').format(userCount)} کاربر روی اشتراک ماهانه — بدون هزینه پروژه اختصاصی.
                </p>
                <button
                  type="button"
                  className="text-xs text-primary mt-1 hover:underline"
                  onClick={() => {
                    setDeliveryMode('cloud_saas');
                    setStepIndex(2);
                  }}
                >
                  بازشماری مسیر ابری ←
                </button>
                <div className="est-cloud-start-price mt-3">
                  <span className="est-cloud-start-amount">ماهی {fmtM(result.cloudMonthlyTomans)} میلیون تومان</span>
                  <span className="est-cloud-start-unit">
                    حدود {fmtK(result.cloudBreakdown.effectivePerUserTomans)} هزار تومان به ازای هر کاربر در ماه
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <a href={cloudCheckoutHref} className="est-primary inline-flex rounded-lg px-4 py-2 text-sm">
                    مشاهده و شروع ERP ابری
                  </a>
                  <a
                    href={CLOUD_REGISTER_URL}
                    className="inline-flex rounded-lg border px-4 py-2 text-sm hover:border-primary"
                  >
                    ثبت‌نام ۱۵ روز رایگان
                  </a>
                </div>
              </aside>
            )}

            {result.primaryQuoteKind === 'implementation_range' ? (
              <>
                <div className="mt-4">
                  <span className={`est-confidence-badge is-high`}>
                    {result.confidence === 'high' ? 'اطمینان بالا' : 'اطمینان متوسط'}
                  </span>
                  <p className="text-sm text-muted-foreground">
                    بازه پیاده‌سازی • استقرار {deploymentLabel(deployment)} • ضریب {result.userMultiplier}× برای{' '}
                    {new Intl.NumberFormat('fa-IR').format(userCount)} کاربر
                  </p>
                </div>
                <CloudPriceBreakdown result={result} deployment={deployment} />
              </>
            ) : (
              <p className="text-sm text-muted-foreground mt-4">
                راه‌اندازی اولیه یک‌بار: {fmtM(result.rangeMinTomans)} تا {fmtM(result.rangeMaxTomans)} میلیون تومان •{' '}
                {result.durationMinDays} تا {result.durationMaxDays} روز کاری
              </p>
            )}

            <EstimatorResultExtras
              result={result}
              deliveryMode={deliveryMode}
              selectedModuleIds={selectedModules}
              estimateId={estimateId}
              orgSummary={`${ESTIMATOR_DELIVERY_LABELS[deliveryMode]} • ${userCount} کاربر • ${industry} • ${branch}`}
            />
          </div>
        ) : null}
      </div>

      <div className="est-wizard-actions">
        {step.type === 'result' ? (
          <button
            type="button"
            className="est-primary rounded-lg px-5 py-2.5 text-sm"
            onClick={() => setMeetingOpen(true)}
          >
            {primaryLabel} <MessageSquare size={16} />
          </button>
        ) : (
          <button
            type="button"
            data-testid="est-next"
            className="est-primary rounded-lg px-5 py-2.5 text-sm disabled:opacity-50"
            disabled={loading || !canContinue()}
            onClick={() => void goNext()}
          >
            {loading ? 'لطفاً صبر کنید…' : primaryLabel} <ChevronLeft size={16} />
          </button>
        )}
        <button
          type="button"
          className="est-icon-button"
          aria-label="مرحله قبل"
          style={{ visibility: stepIndex === 0 ? 'hidden' : 'visible' }}
          onClick={goBack}
        >
          <ChevronLeft size={16} className="rotate-180" />
        </button>
      </div>
      <div className={`est-toast ${toast ? 'is-visible' : ''}`} role="status">
        {toast}
      </div>
    </div>

    <EstimatorAside
      selectedModules={selectedModules}
      fullName={fullName}
      orgName={orgName}
      userCount={userCount}
      industry={industry}
      branch={branch}
      integrations={integrations}
      deliveryMode={deliveryMode}
      deployment={deployment}
      preview={localPreview}
    />

    <MeetingDialog
      open={meetingOpen}
      onClose={() => setMeetingOpen(false)}
      selectedModules={result?.moduleCodes ?? []}
      estimateId={estimateId}
      skipEstimateQuestion={Boolean(estimateId)}
      initialContact={{ fullName, phone, company: orgName }}
    />
  </div>
  </EstimateRoot>
  );
}

function EstimateRoot({ children }: { children: React.ReactNode }) {
  return (
    <EstimateShell className="estimate-page-shell pb-6">
      <EstimateShell className="est-top-chrome">
        <Link href="/pricing" className="est-back-pricing">
          <ChevronLeft size={16} aria-hidden />
          بازگشت به قیمت‌گذاری
        </Link>
      </EstimateShell>
      {children}
    </EstimateShell>
  );
}

function EstimateShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

function AllModulesButton({
  allSelected,
  onSelectAll,
  onClear,
}: {
  allSelected: boolean;
  onSelectAll: () => void;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      <button type="button" className="est-secondary-btn text-sm rounded-lg border px-3 py-1.5" onClick={onSelectAll}>
        انتخاب همه ماژول‌ها ({ALL_ESTIMATOR_WIZARD_MODULE_IDS.length})
      </button>
      {allSelected ? (
        <button type="button" className="text-sm text-muted-foreground hover:underline" onClick={onClear}>
          بازگشت به پیشنهاد صنعت
        </button>
      ) : null}
    </div>
  );
}

function ResultHero({
  result,
  deliveryMode,
  userCount,
  checkoutHref,
  onEdit,
}: {
  result: WizardEstimateResult;
  deliveryMode: EstimatorDeliveryMode;
  userCount: number;
  checkoutHref: string;
  onEdit: () => void;
}) {
  const isCloud = result.primaryQuoteKind === 'cloud_monthly';
  return (
    <div className="est-summary-hero">
      <span className="est-summary-status flex items-center gap-1 text-sm">
        <CheckCircle2 size={16} /> برآورد تخمینی — {ESTIMATOR_DELIVERY_LABELS[deliveryMode]}
      </span>
      <h2>{isCloud ? 'تعرفه ERP ابری سازمانی' : 'برآورد پیاده‌سازی اختصاصی ERP'}</h2>
      <div className="est-summary-price">
        <div className="text-sm text-muted-foreground">
          {isCloud ? 'هزینه ماهانه (با تفکیک کاربر و ماژول)' : 'بازه سرمایه‌گذاری اولیه'}
        </div>
        <div className="est-summary-price-value">
          {isCloud ? (
            <>
              <span>{fmtM(result.cloudMonthlyTomans)}</span>
              <span className="est-price-unit">میلیون تومان / ماه</span>
            </>
          ) : (
            <>
              <span>
                {fmtM(result.rangeMinTomans)} تا {fmtM(result.rangeMaxTomans)}
              </span>
              <span className="est-price-unit">میلیون تومان</span>
            </>
          )}
        </div>
      </div>
      {!isCloud ? (
        <div className="est-hero-duration">
          زمان پیشنهادی اجرا: {result.durationMinDays} تا {result.durationMaxDays} روز کاری
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          برای {new Intl.NumberFormat('fa-IR').format(userCount)} کاربر — میانگین ماهانه حدود{' '}
          {fmtK(result.cloudBreakdown.effectivePerUserTomans)} هزار تومان به ازای هر نفر
        </p>
      )}
      {isCloud ? (
        <div className="flex flex-wrap gap-2 mt-3">
          <a
            href={checkoutHref}
            data-testid="est-checkout-link"
            className="est-primary inline-flex rounded-lg px-4 py-2 text-sm"
          >
            فعال‌سازی روی ابر سازمانی
          </a>
          <a href={CLOUD_REGISTER_URL} className="inline-flex rounded-lg border px-4 py-2 text-sm">
            آزمایش ۱۵ روزه
          </a>
        </div>
      ) : null}
      <button type="button" className="text-sm text-primary flex items-center gap-1 mt-2" onClick={onEdit}>
        <ChevronLeft size={14} /> ویرایش اطلاعات
      </button>
    </div>
  );
}

function CloudMonthlyBreakdownPanel({
  result,
  cloudRates,
}: {
  result: WizardEstimateResult;
  cloudRates: CloudSubscriptionRates;
}) {
  const b = result.cloudBreakdown;
  return (
    <div className="est-result-section mt-4 rounded-xl border p-4">
      <strong className="block mb-3">تفکیک ماهانه (ماژول + کاربر)</strong>
      <PriceBreakdown list={result.lines.filter((l) => l.key.startsWith('cloud-'))} />
      <ul className="text-sm space-y-1 mt-3">
        {b.moduleLines.map((m) => (
          <li key={m.moduleId} className="flex justify-between gap-2">
            <span>{m.titleFa}</span>
            <span dir="ltr">{fmtM(m.monthlyTomans)} م‌ت / ماه</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground mt-3">
        پایه شامل {b.includedSeats} کاربر • هر کاربر اضافه ماهی {fmtM(b.perExtraSeatTomans)} هزار تومان • سقف{' '}
        {cloudRates.maxSeats} کاربر
        {cloudRates.source !== 'defaults' ? (
          <> • تعرفه از پلن {cloudRates.planCode ?? 'پلتفرم'}</>
        ) : null}
      </p>
    </div>
  );
}

function PriceBreakdown({ list }: { list: WizardEstimateResult['lines'] }) {
  return (
    <div className="est-breakdown-list">
      {list.map((line) => (
        <div key={line.key} className="est-breakdown-row">
          <div className="est-breakdown-row-head">
            <span>{line.titleFa}</span>
            <span>{fmtM(line.amountTomans)} میلیون تومان</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function CloudPriceBreakdown({ result, deployment }: { result: WizardEstimateResult; deployment: EstimatorDeployment }) {
  return (
    <div className="est-result-section mt-6">
      <strong className="block mb-2">نحوه محاسبه قیمت نهایی</strong>
      <div className="est-breakdown-list">
        {result.lines.map((line) => (
          <div key={line.key} className="est-breakdown-row">
            <div className="est-breakdown-row-head">
              <span>{line.titleFa}</span>
              <span>{fmtM(line.amountTomans)} میلیون تومان</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        ضریب کاربران ({new Intl.NumberFormat('fa-IR').format(result.userMultiplier)}×) و استقرار{' '}
        {deploymentLabel(deployment)} در جمع لحاظ شده‌اند.
      </p>
    </div>
  );
}

function EstimatorAside({
  selectedModules,
  fullName,
  orgName,
  userCount,
  industry,
  branch,
  integrations,
  deliveryMode,
  deployment,
  preview,
}: {
  selectedModules: EstimatorWizardModuleId[];
  fullName: string;
  orgName: string;
  userCount: number;
  industry: string;
  branch: string;
  integrations: string[];
  deliveryMode: EstimatorDeliveryMode;
  deployment: EstimatorDeployment;
  preview: WizardEstimateResult;
}) {
  return (
    <aside className="est-aside" aria-label="خلاصه‌ی برآورد">
      <div className="est-aside-inner">
        <div className="est-aside-brand">
          <span className="est-brand-mark" aria-hidden>ER</span>
          <div>
            <div className="est-brand-name">{BRAND_NAME}</div>
            <div className="est-brand-sub">Sakhtar System</div>
          </div>
        </div>
        <div className="est-aside-title">خلاصه‌ی برآورد</div>
        <h3 className="est-aside-h">انتخاب‌های شما</h3>
        <p className="est-aside-sub">این خلاصه هم‌زمان با انتخاب‌های شما به‌روز می‌شود.</p>
        <EstimateShell className="est-aside-summary-compact" aria-label="خلاصه سریع">
          <div className="est-aside-summary-row">
            <span>کاربران</span>
            <strong>{new Intl.NumberFormat('fa-IR').format(userCount)} نفر</strong>
          </div>
          <div className="est-aside-summary-row">
            <span>حوزه</span>
            <strong>{industry}</strong>
          </div>
          <div className="est-aside-summary-row">
            <span>شعب</span>
            <strong>{branch}</strong>
          </div>
          <div className="est-aside-summary-row">
            <span>اتصال‌ها</span>
            <strong>
              {new Intl.NumberFormat('fa-IR').format(integrations.length)} مورد
            </strong>
          </div>
          <div className="est-aside-summary-row">
            <span>استقرار</span>
            <strong>
              {deliveryMode === 'cloud_saas' ? 'ابر سازمانی' : deploymentLabel(deployment)}
            </strong>
          </div>
        </EstimateShell>
        <div className="est-aside-block">
          <span>ماژول‌های انتخاب‌شده ({selectedModules.length})</span>
          <div className="est-aside-chips">
            {selectedModules.map((id) => {
              const m = ESTIMATOR_WIZARD_MODULES.find((x) => x.id === id);
              if (!m) return null;
              return (
                <span key={id} className="est-aside-chip" style={{ ['--module' as string]: m.color }}>
                  <span className="est-summary-dot" />
                  {m.nameFa}
                </span>
              );
            })}
          </div>
        </div>
        <div className="est-aside-block">
          <span>سازمان</span>
          <div className="est-aside-facts">
            <AsideFact label="نام" value={fullName || '—'} />
            <AsideFact label="کسب‌وکار" value={orgName || '—'} />
            <AsideFact label="کاربران" value={`${new Intl.NumberFormat('fa-IR').format(userCount)} نفر`} />
            <AsideFact label="حوزه" value={industry} />
            <AsideFact label="شعب" value={branch} />
            <AsideFact label="اتصال‌ها" value={`${integrations.length} مورد`} />
            <AsideFact label="مسیر" value={ESTIMATOR_DELIVERY_LABELS[deliveryMode]} />
            <AsideFact
              label="استقرار"
              value={
                deliveryMode === 'cloud_saas' ? 'ابر سازمانی ساختار' : deploymentLabel(deployment)
              }
            />
          </div>
        </div>
        {deliveryMode === 'cloud_saas' ? (
          <p className="text-xs text-muted-foreground border-t pt-3">
            ماهانه حدود{' '}
            <strong className="text-foreground">{fmtM(preview.cloudMonthlyTomans)}</strong> میلیون تومان •{' '}
            {fmtK(preview.cloudBreakdown.effectivePerUserTomans)} هزار تومان / نفر
          </p>
        ) : preview.rangeMinTomans > 0 ? (
          <p className="text-xs text-muted-foreground border-t pt-3">
            راهنمای پروژه از{' '}
            <strong className="text-foreground">{fmtM(preview.rangeMinTomans)}+</strong> میلیون تومان
          </p>
        ) : null}
      </div>
    </aside>
  );
}

function AsideFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="est-aside-fact">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
