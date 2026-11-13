import type { CloudSubscriptionRates } from '@repo/contracts';
import { DEFAULT_CLOUD_SUBSCRIPTION_RATES } from '@repo/contracts';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:3000';

export async function fetchCloudSubscriptionRates(): Promise<CloudSubscriptionRates> {
  const res = await fetch(`${API}/api/v1/public/pricing/cloud-subscription`, { cache: 'no-store' });
  if (!res.ok) return DEFAULT_CLOUD_SUBSCRIPTION_RATES;
  const data = (await res.json()) as CloudSubscriptionRates;
  return { ...DEFAULT_CLOUD_SUBSCRIPTION_RATES, ...data };
}
