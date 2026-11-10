import { renderEmailTemplate, mockEmailAuthPass } from '../../templates/render.js';

export type EmailSendResult = {
  providerMessageId: string;
  auth: ReturnType<typeof mockEmailAuthPass>;
  html: string;
};

export async function deliverEmail(input: {
  to: string;
  templateKey: string;
  vars: Record<string, string | number>;
  version: number;
}): Promise<EmailSendResult> {
  const rendered = renderEmailTemplate(input.templateKey, {
    message: 'پیام تراکنشی',
    footer: 'لغو اشتراک: {{unsubscribeUrl}}',
    unsubscribeUrl: '/unsubscribe',
    ...input.vars,
  }, input.version);
  if (!rendered) throw new Error(`Unknown template ${input.templateKey}`);
  const auth = mockEmailAuthPass();
  void input.to;
  return {
    providerMessageId: `smtp-${Date.now()}`,
    auth,
    html: rendered.html,
  };
}
