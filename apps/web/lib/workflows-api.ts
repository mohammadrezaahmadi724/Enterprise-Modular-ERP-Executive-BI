import { apiBase } from './api-base';

const TENANT = process.env.NEXT_PUBLIC_DEMO_TENANT_ID ?? '11111111-1111-4111-8111-111111111111';

type WorkflowInstanceApi = {
  id: string;
  entityType: string;
  entityId: string;
  status: string;
  currentStepOrder: number;
};

type InboxSummary = {
  pending: number;
  approved: number;
  rejected: number;
  escalated: number;
  preview: WorkflowInstanceApi[];
};

function headers() {
  return {
    'Content-Type': 'application/json',
    'x-tenant-id': TENANT,
    'x-user-id': '00000000-0000-4000-8000-000000000001',
    'x-correlation-id': crypto.randomUUID(),
    'x-super-admin': 'true',
  };
}

export async function fetchWorkflowInbox() {
  const res = await fetch(`${apiBase()}/api/v1/workflows/inbox`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`workflows inbox: ${res.status}`);
  return (await res.json()) as {
    summary: InboxSummary;
    instances: WorkflowInstanceApi[];
    source: string;
  };
}
