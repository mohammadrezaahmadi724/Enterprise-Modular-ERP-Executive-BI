import { listMessages, resetMessagingStore, sendOutboundMessage } from '@repo/db-erp-operations';

const DEMO_TENANT = '11111111-1111-4111-8111-111111111111';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const tenantId = url.searchParams.get('tenantId') ?? DEMO_TENANT;
  const channel = url.searchParams.get('channel') ?? undefined;
  let items = listMessages(tenantId);
  if (items.length === 0) {
    sendOutboundMessage({
      tenantId,
      channel: 'Telegram',
      toAddress: '@demo',
      content: 'پیام نمونه',
      idempotencyKey: 'seed-tg-1',
    });
    items = listMessages(tenantId);
  }
  const filtered = channel ? items.filter((m) => m.channel === channel) : items;
  return Response.json({ messages: filtered });
}

export async function POST() {
  resetMessagingStore();
  return Response.json({ ok: true });
}
