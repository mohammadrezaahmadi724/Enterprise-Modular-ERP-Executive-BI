import { analyzeConversation, listConversations, resetAiStore, startConversation } from '@repo/db-erp-operations';

const DEMO_TENANT = '11111111-1111-4111-8111-111111111111';

export async function GET(req: Request) {
  const tenantId = new URL(req.url).searchParams.get('tenantId') ?? DEMO_TENANT;
  const items = listConversations(tenantId);
  if (items.length === 0) {
    const c = startConversation(tenantId, 'demo-user', 'web');
    analyzeConversation(c.id);
  }
  return Response.json({ conversations: listConversations(tenantId) });
}

export async function POST() {
  resetAiStore();
  return Response.json({ ok: true });
}
