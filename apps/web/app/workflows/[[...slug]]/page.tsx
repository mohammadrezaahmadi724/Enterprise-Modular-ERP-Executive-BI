import { ErpScreenByHref } from '../../../components/erp-screen-by-href';
import { WorkflowsHubOverviewClient } from '../../../components/workflows/WorkflowsHubOverviewClient';

export default async function WorkflowsCatchAll({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  if (!slug?.length) return <WorkflowsHubOverviewClient />;
  const href = `/workflows/${slug.join('/')}`;
  return <ErpScreenByHref href={href} />;
}
