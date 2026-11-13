import { resolveCatchAll } from '../../../lib/module-catch-all';

export default async function BiCatchAll({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  return resolveCatchAll('bi', '/bi', slug);
}
