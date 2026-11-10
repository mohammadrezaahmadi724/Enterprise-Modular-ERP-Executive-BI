import { resolveCatchAll } from '../../../lib/module-catch-all';

export default function ProcurementCatchAll({ params }: { params: { slug?: string[] } }) {
  return resolveCatchAll('inventory', '/procurement', params.slug);
}
