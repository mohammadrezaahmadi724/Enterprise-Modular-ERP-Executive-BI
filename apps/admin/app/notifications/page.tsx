import { appendNotificationLog, listNotificationLogs, resetNotificationLogs } from '@repo/db-alerts';

const TENANT = '11111111-1111-4111-8111-111111111111';

export default function AdminNotificationsPage() {
  resetNotificationLogs();
  appendNotificationLog({
    tenantId: TENANT,
    templateKey: 'payment_received',
    channel: 'Email',
    recipient: 'admin@platform.local',
    status: 'Delivered',
    idempotencyKey: 'demo-1',
    correlationId: 'corr-demo',
    sentAt: new Date(),
  });
  const logs = listNotificationLogs(TENANT);

  return (
    <main style={{ padding: 24 }} dir="rtl">
      <h1>Notification Log</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12, fontSize: 14 }}>
        <thead>
          <tr style={{ background: '#f4f4f5' }}>
            <th style={{ padding: 8, textAlign: 'right' }}>قالب</th>
            <th style={{ padding: 8, textAlign: 'right' }}>کانال</th>
            <th style={{ padding: 8, textAlign: 'right' }}>وضعیت</th>
            <th style={{ padding: 8, textAlign: 'right' }}>correlation</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((l) => (
            <tr key={l.id} style={{ borderTop: '1px solid #eee' }}>
              <td style={{ padding: 8 }}>{l.templateKey}</td>
              <td style={{ padding: 8 }}>{l.channel}</td>
              <td style={{ padding: 8 }}>{l.status}</td>
              <td style={{ padding: 8 }}>{l.correlationId.slice(0, 8)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
