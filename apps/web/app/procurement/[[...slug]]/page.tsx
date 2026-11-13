import { resolveCatchAll } from '../../../lib/module-catch-all';

export default async function ProcurementCatchAll({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  return resolveCatchAll('inventory', '/procurement', slug);
}
