import { getTemplate } from './registry.js';

export type RenderVars = Record<string, string | number>;

export function interpolate(template: string, vars: RenderVars): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const v = vars[key];
    if (v === undefined) return '';
    if (typeof v === 'number') return new Intl.NumberFormat('fa-IR').format(v);
    return String(v);
  });
}

export function renderEmailTemplate(
  templateKey: string,
  vars: RenderVars,
  version = 1,
): { subject: string; html: string; text: string } | null {
  const t = getTemplate(templateKey, version);
  if (!t) return null;
  return {
    subject: interpolate(t.subject, vars),
    html: interpolate(t.bodyHtml, vars),
    text: interpolate(t.bodyText, vars),
  };
}

export function assertRtlEmail(html: string): boolean {
  return html.includes('dir="rtl"') && html.includes('Vazirmatn');
}

/** Mock SPF/DKIM/DMARC برای تست — Production با SMTP واقعی */
export function mockEmailAuthPass(): { spf: string; dkim: string; dmarc: string } {
  return { spf: 'pass', dkim: 'pass', dmarc: 'pass' };
}
