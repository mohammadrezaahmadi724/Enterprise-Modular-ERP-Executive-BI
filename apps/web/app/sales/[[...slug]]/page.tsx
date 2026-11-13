import { resolveCatchAll } from '../../../lib/module-catch-all';

export default async function SalesCatchAll({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  return resolveCatchAll('sales', '/sales', slug);
}
