import { resolveCatchAll } from '../../../lib/module-catch-all';

export default function HrCatchAll({ params }: { params: { slug?: string[] } }) {
  return resolveCatchAll('hr', '/hr', params.slug);
}
