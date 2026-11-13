import { SalesDocumentDetailScreen } from '../../../../components/sales/SalesDocumentDetailScreen';

export default function SalesOrderDetailPage({ params }: { params: { number: string } }) {
  return <SalesDocumentDetailScreen kind="order" number={decodeURIComponent(params.number)} />;
}
