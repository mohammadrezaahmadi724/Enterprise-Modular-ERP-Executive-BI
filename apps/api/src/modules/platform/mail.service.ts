/**
 * SMTP ساده — در prod متغیرهای SMTP_* را تنظیم کنید.
 */
export type MailConfigStatus = {
  configured: boolean;
  host?: string;
  from?: string;
  mode: 'smtp' | 'log' | 'disabled';
};

export function getMailConfigStatus(): MailConfigStatus {
  const host = process.env.SMTP_HOST;
  const from = process.env.SMTP_FROM;
  if (host && from) {
    return { configured: true, host, from, mode: 'smtp' };
  }
  if (process.env.NODE_ENV === 'development') {
    return { configured: true, mode: 'log', from: 'dev@local' };
  }
  return { configured: false, mode: 'disabled' };
}

export async function sendTransactionalEmail(input: {
  to: string;
  subject: string;
  text: string;
}): Promise<{ sent: boolean; channel: string }> {
  const status = getMailConfigStatus();
  if (status.mode === 'log') {
    console.info('[mail:dev]', input.to, input.subject);
    return { sent: true, channel: 'log' };
  }
  if (status.mode !== 'smtp') {
    return { sent: false, channel: 'disabled' };
  }
  try {
    const { default: nodemailer } = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth:
        process.env.SMTP_USER && process.env.SMTP_PASS
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
    });
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: input.to,
      subject: input.subject,
      text: input.text,
    });
    return { sent: true, channel: 'smtp' };
  } catch (err) {
    console.error('[mail]', err);
    return { sent: false, channel: 'smtp-error' };
  }
}
