import { resolveCatchAll } from '../../../lib/module-catch-all';

export default async function WmsCatchAll({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  return resolveCatchAll('inventory', '/wms', slug);
}
