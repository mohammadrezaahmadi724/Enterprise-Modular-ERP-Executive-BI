type MeetingMeta = {
  meetingType?: string;
  jalaliDate?: string;
  timeSlot?: string;
  estimateId?: string | null;
  moduleCodes?: string[];
  contact?: { fullName?: string; company?: string; phone?: string };
};

type EstimateLeadMeta = {
  type?: string;
  phone?: string;
  correlationId?: string;
  estimate?: {
    fullName?: string;
    orgName?: string;
    userCount?: number;
    industry?: string;
    preview?: {
      rangeMinTomans?: number;
      rangeMaxTomans?: number;
      cloudMonthlyTomans?: number;
      deliveryMode?: string;
      moduleCodes?: string[];
      estimateId?: string;
    };
    wizard?: {
      deliveryMode?: string;
      userCount?: number;
      deployment?: string;
      modules?: Array<{ moduleId: string }>;
    };
  };
};

export function ticketPriorityFa(priority: string): string {
  const map: Record<string, string> = {
    high: 'بالا',
    normal: 'عادی',
    low: 'پایین',
    critical: 'بحرانی',
  };
  return map[priority] ?? priority;
}

export function ticketStatusFa(status: string): string {
  const map: Record<string, string> = {
    open: 'باز',
    closed: 'بسته',
    in_progress: 'در حال بررسی',
  };
  return map[status] ?? status;
}

export function ticketPriorityFromFa(label: string): string {
  const map: Record<string, string> = {
    بالا: 'high',
    عادی: 'normal',
    پایین: 'low',
    بحرانی: 'critical',
  };
  return map[label] ?? label;
}

export function ticketStatusFromFa(label: string): string {
  const map: Record<string, string> = {
    باز: 'open',
    بسته: 'closed',
    'در حال بررسی': 'in_progress',
  };
  return map[label] ?? label;
}

export function ticketCategoryLabel(category: string): string {
  if (category === 'meeting_request') return 'رزرو جلسه';
  if (category === 'estimate_lead') return 'تأیید برآورد';
  return category;
}

const fmtM = (toman: number) => new Intl.NumberFormat('fa-IR').format(Math.round(toman / 1_000_000));

export function mapSupportTicketRow(t: {
  id: string;
  tenantId: string | null;
  subject: string;
  priority: string;
  status: string;
  category: string;
  metadata: unknown;
  createdAt: Date;
}) {
  const createdAt = t.createdAt.toISOString().slice(0, 16).replace('T', ' ');
  let tenant = t.tenantId ?? 'سرنخ وب';
  let slot = '—';
  let subject = t.subject;
  let estimateRange = '—';
  let phone = '—';
  let detailJson = '';

  if (t.category === 'meeting_request') {
    const meta = (t.metadata ?? {}) as MeetingMeta;
    if (meta.jalaliDate) slot = [meta.jalaliDate, meta.timeSlot].filter(Boolean).join(' · ');
    if (meta.contact?.company) tenant = meta.contact.company;
    if (meta.contact?.phone) phone = meta.contact.phone;
    if (meta.contact?.fullName) subject = `${t.subject}`;
    detailJson = JSON.stringify(meta, null, 2);
  } else if (t.category === 'estimate_lead') {
    const meta = (t.metadata ?? {}) as EstimateLeadMeta;
    phone = meta.phone ?? '—';
    const est = meta.estimate;
    if (est?.orgName) tenant = est.orgName;
    else if (est?.fullName) tenant = est.fullName;
    const mode = meta.estimate?.wizard?.deliveryMode;
    if (mode === 'cloud_saas' && est?.preview?.cloudMonthlyTomans != null) {
      estimateRange = `ابر: ${fmtM(est.preview.cloudMonthlyTomans)} م‌ت/ماه`;
    } else if (est?.preview?.rangeMinTomans != null && est?.preview?.rangeMaxTomans != null) {
      estimateRange = `${fmtM(est.preview.rangeMinTomans)}–${fmtM(est.preview.rangeMaxTomans)} م‌ت پروژه`;
    }
    if (mode) subject = `${t.subject} [${mode === 'cloud_saas' ? 'ابری' : 'اختصاصی'}]`;
    slot = phone;
    detailJson = JSON.stringify(meta, null, 2);
  } else if (t.metadata) {
    detailJson = JSON.stringify(t.metadata, null, 2);
  }

  return {
    id: t.id,
    code: t.id.slice(0, 8),
    tenant,
    subject,
    category: ticketCategoryLabel(t.category),
    rawCategory: t.category,
    slot,
    phone,
    estimateRange,
    priority: ticketPriorityFa(t.priority),
    status: ticketStatusFa(t.status),
    createdAt,
    detailJson,
  };
}
