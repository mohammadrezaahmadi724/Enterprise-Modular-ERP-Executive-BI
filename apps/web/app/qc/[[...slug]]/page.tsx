import { ErpScreenByHref } from '../../../components/erp-screen-by-href';
import { QcHubOverviewClient } from '../../../components/qc/QcHubOverviewClient';

export default async function QcCatchAll({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  if (!slug?.length) return <QcHubOverviewClient />;
  const href = `/qc/${slug.join('/')}`;
  return <ErpScreenByHref href={href} />;
}
