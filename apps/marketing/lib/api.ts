import { API_URL } from './constants';

export async function submitLead(input: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message?: string;
  source?: string;
  idempotencyKey: string;
}): Promise<{ ok: boolean; correlationId?: string }> {
  const res = await fetch(`${API_URL}/api/v1/public/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': input.idempotencyKey,
    },
    body: JSON.stringify(input),
    cache: 'no-store',
  });
  if (!res.ok) return { ok: false };
  const data = (await res.json()) as { correlationId?: string };
  return { ok: true, correlationId: data.correlationId };
}
