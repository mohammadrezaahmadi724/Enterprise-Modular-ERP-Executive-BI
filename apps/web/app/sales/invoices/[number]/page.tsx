import { SalesDocumentDetailScreen } from '../../../../components/sales/SalesDocumentDetailScreen';

export default function SalesInvoiceDetailPage({ params }: { params: { number: string } }) {
  return <SalesDocumentDetailScreen kind="invoice" number={decodeURIComponent(params.number)} />;
}
