import { resolveCatchAll } from '../../../lib/module-catch-all';

export default function WmsCatchAll({ params }: { params: { slug?: string[] } }) {
  return resolveCatchAll('inventory', '/wms', params.slug);
}
