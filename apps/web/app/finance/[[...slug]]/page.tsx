import { resolveCatchAll } from '../../../lib/module-catch-all';

export default async function FinanceCatchAll({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  return resolveCatchAll('finance', '/finance', slug);
}
