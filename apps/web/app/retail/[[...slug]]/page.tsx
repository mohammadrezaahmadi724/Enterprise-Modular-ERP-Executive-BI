import { resolveCatchAll } from '../../../lib/module-catch-all';

export default function RetailCatchAll({ params }: { params: { slug?: string[] } }) {
  return resolveCatchAll('retail', '/retail', params.slug);
}
