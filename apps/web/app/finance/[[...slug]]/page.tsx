import { resolveCatchAll } from '../../../lib/module-catch-all';

export default function FinanceCatchAll({ params }: { params: { slug?: string[] } }) {
  return resolveCatchAll('finance', '/finance', params.slug);
}
