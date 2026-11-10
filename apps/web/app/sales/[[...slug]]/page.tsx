import { resolveCatchAll } from '../../../lib/module-catch-all';

export default function SalesCatchAll({ params }: { params: { slug?: string[] } }) {
  return resolveCatchAll('sales', '/sales', params.slug);
}
