import { resolveCatchAll } from '../../../lib/module-catch-all';

export default async function RetailCatchAll({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  return resolveCatchAll('retail', '/retail', slug);
}
