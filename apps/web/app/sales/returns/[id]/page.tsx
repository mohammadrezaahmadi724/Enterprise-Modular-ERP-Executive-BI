import { SalesReturnDetailScreen } from '../../../../components/sales/SalesReturnDetailScreen';

export default function SalesReturnDetailPage({ params }: { params: { id: string } }) {
  return <SalesReturnDetailScreen id={decodeURIComponent(params.id)} />;
}
