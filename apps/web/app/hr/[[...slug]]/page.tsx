import { resolveCatchAll } from '../../../lib/module-catch-all';

export default async function HrCatchAll({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  return resolveCatchAll('hr', '/hr', slug);
}
