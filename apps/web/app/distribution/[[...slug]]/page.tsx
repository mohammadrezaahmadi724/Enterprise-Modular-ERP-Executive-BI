import { resolveCatchAll } from '../../../lib/module-catch-all';

export default function DistributionCatchAll({ params }: { params: { slug?: string[] } }) {
  return resolveCatchAll('distribution', '/distribution', params.slug);
}
