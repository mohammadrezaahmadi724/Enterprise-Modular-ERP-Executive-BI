import { randomUUID } from 'node:crypto';
import { RISK_EVENTS } from '@repo/contracts';

export type RiskAlgorithm = 'Threshold' | 'ZScore' | 'MovingAvgDeviation' | 'HHI';

export type RiskRuleSeed = {
  code: string;
  nameFa: string;
  algorithm: RiskAlgorithm;
  config: Record<string, number>;
  severity: 'critical' | 'warning' | 'stable';
  moduleCode: string;
  suggestionFa: string;
};

export type RiskInputSeries = {
  ruleCode: string;
  value?: number;
  series?: number[];
  shares?: number[];
};

const BUILTIN_RULES: RiskRuleSeed[] = [
  {
    code: 'cash_pressure',
    nameFa: 'فشار نقدینگی',
    algorithm: 'Threshold',
    config: { threshold: 0.15 },
    severity: 'critical',
    moduleCode: 'finance',
    suggestionFa: 'جریان نقد خروجی را محدود یا خط اعتباری فعال کنید.',
  },
  {
    code: 'ar_overdue_90',
    nameFa: 'مطالبات معوق > ۹۰ روز',
    algorithm: 'Threshold',
    config: { threshold: 1_000_000_000 },
    severity: 'warning',
    moduleCode: 'finance',
    suggestionFa: 'پیگیری وصول مطالبات معوق را اولویت دهید.',
  },
  {
    code: 'sales_concentration_hhi',
    nameFa: 'افت فروش متمرکز',
    algorithm: 'HHI',
    config: { threshold: 0.35 },
    severity: 'warning',
    moduleCode: 'sales',
    suggestionFa: 'تنوع مشتری را افزایش دهید.',
  },
  {
    code: 'slow_inventory',
    nameFa: 'موجودی کم‌گردش',
    algorithm: 'MovingAvgDeviation',
    config: { window: 7, deviationPct: 0.4 },
    severity: 'warning',
    moduleCode: 'inventory',
    suggestionFa: 'تخفیف یا انتقال موجودی راکد را بررسی کنید.',
  },
  {
    code: 'open_order_delay',
    nameFa: 'تأخیر سفارش‌های باز',
    algorithm: 'Threshold',
    config: { threshold: 72 },
    severity: 'critical',
    moduleCode: 'operations',
    suggestionFa: 'سفارش‌های معوق را در صف تولید/ارسال اولویت دهید.',
  },
  {
    code: 'sales_team_drop',
    nameFa: 'کاهش فعالیت تیم فروش',
    algorithm: 'ZScore',
    config: { threshold: 2 },
    severity: 'stable',
    moduleCode: 'sales',
    suggestionFa: 'برنامه کوچینگ فروش را فعال کنید.',
  },
];

export type RiskFindingRecord = {
  id: string;
  tenantId: string;
  ruleCode: string;
  severity: 'critical' | 'warning' | 'stable';
  trend: 'up' | 'down' | 'flat';
  sourceModule: string;
  evidence: Record<string, number>;
  suggestionFa: string;
  deduplicationKey: string;
};

const findings = new Map<string, RiskFindingRecord>();
const outbox: Array<{ type: string; payload: unknown }> = [];

export function resetRiskEngine(): void {
  findings.clear();
  outbox.length = 0;
}

export function getRiskOutbox() {
  return [...outbox];
}

export function listBuiltinRules(): RiskRuleSeed[] {
  return [...BUILTIN_RULES];
}

function hhi(shares: number[]): number {
  return shares.reduce((s, x) => s + x * x, 0);
}

function zScore(series: number[], value: number): number {
  const mean = series.reduce((a, b) => a + b, 0) / series.length;
  const variance = series.reduce((s, x) => s + (x - mean) ** 2, 0) / series.length;
  const std = Math.sqrt(variance) || 1;
  return (value - mean) / std;
}

function movingAvgDeviation(series: number[], value: number, window: number): number {
  const slice = series.slice(-window);
  const ma = slice.reduce((a, b) => a + b, 0) / slice.length;
  return ma === 0 ? 0 : (value - ma) / ma;
}

function evalRule(rule: RiskRuleSeed, input: RiskInputSeries): boolean {
  switch (rule.algorithm) {
    case 'Threshold':
      return (input.value ?? 0) > (rule.config.threshold ?? 0);
    case 'ZScore':
      return input.series && input.value != null
        ? zScore(input.series, input.value) > (rule.config.threshold ?? 2)
        : false;
    case 'MovingAvgDeviation':
      return input.series && input.value != null
        ? Math.abs(movingAvgDeviation(input.series, input.value, rule.config.window ?? 7)) >
            (rule.config.deviationPct ?? 0.3)
        : false;
    case 'HHI':
      return input.shares ? hhi(input.shares) > (rule.config.threshold ?? 0.25) : false;
    default:
      return false;
  }
}

export function evaluateRisks(tenantId: string, inputs: RiskInputSeries[]): RiskFindingRecord[] {
  const created: RiskFindingRecord[] = [];
  for (const rule of BUILTIN_RULES) {
    const input = inputs.find((i) => i.ruleCode === rule.code);
    if (!input) continue;
    if (!evalRule(rule, input)) continue;
    const dedup = `${tenantId}:${rule.code}:${new Date().toISOString().slice(0, 10)}`;
    if (findings.has(dedup)) continue;
    const finding: RiskFindingRecord = {
      id: randomUUID(),
      tenantId,
      ruleCode: rule.code,
      severity: rule.severity,
      trend: 'up',
      sourceModule: rule.moduleCode,
      evidence: {
        value: input.value ?? 0,
        hhi: input.shares ? hhi(input.shares) : 0,
      },
      suggestionFa: rule.suggestionFa,
      deduplicationKey: dedup,
    };
    findings.set(dedup, finding);
    created.push(finding);
    outbox.push({ type: RISK_EVENTS.RISK_FINDING_CREATED, payload: { findingId: finding.id, ruleCode: rule.code } });
  }
  return created;
}

export function listFindings(tenantId: string): RiskFindingRecord[] {
  return [...findings.values()].filter((f) => f.tenantId === tenantId);
}

/** رویداد-محور: پس از SalesOrderConfirmed یا PaymentSucceeded */
export function onDomainEvent(tenantId: string, eventType: string): RiskFindingRecord[] {
  if (eventType.includes('sales.order.confirmed')) {
    return evaluateRisks(tenantId, [
      { ruleCode: 'sales_concentration_hhi', shares: [0.5, 0.3, 0.2] },
      { ruleCode: 'sales_team_drop', value: 2, series: [10, 11, 9, 8, 7, 6, 5] },
    ]);
  }
  if (eventType.includes('payment.succeeded')) {
    return evaluateRisks(tenantId, [{ ruleCode: 'cash_pressure', value: 0.2 }]);
  }
  return [];
}
