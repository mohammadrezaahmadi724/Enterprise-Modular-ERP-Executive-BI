import { resolveCatchAll } from '../../../lib/module-catch-all';

export default async function DistributionCatchAll({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  return resolveCatchAll('distribution', '/distribution', slug);
}
