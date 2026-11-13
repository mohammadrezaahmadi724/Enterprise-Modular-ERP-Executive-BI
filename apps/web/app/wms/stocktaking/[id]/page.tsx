import { WmsStocktakingDetailScreen } from '../../../../components/wms/WmsStocktakingDetailScreen';

type Props = { params: Promise<{ id: string }> };

export default async function WmsStocktakingDetailPage({ params }: Props) {
  const { id } = await params;
  return <WmsStocktakingDetailScreen id={id} />;
}
