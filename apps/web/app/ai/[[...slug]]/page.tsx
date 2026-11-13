import { resolveCatchAll } from '../../../lib/module-catch-all';

export default async function AiCatchAll({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  return resolveCatchAll('ai', '/ai', slug);
}
