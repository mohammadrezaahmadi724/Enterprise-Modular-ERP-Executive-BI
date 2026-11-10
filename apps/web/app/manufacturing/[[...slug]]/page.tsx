import { resolveCatchAll } from '../../../lib/module-catch-all';

export default function ManufacturingCatchAll({ params }: { params: { slug?: string[] } }) {
  return resolveCatchAll('manufacturing', '/manufacturing', params.slug);
}
