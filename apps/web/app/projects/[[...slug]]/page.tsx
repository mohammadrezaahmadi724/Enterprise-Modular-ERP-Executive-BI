import { resolveCatchAll } from '../../../lib/module-catch-all';

export default async function ProjectsCatchAll({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  return resolveCatchAll('projects', '/projects', slug);
}
