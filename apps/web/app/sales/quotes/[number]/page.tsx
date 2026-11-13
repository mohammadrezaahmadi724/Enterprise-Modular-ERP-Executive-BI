import { SalesDocumentDetailScreen } from '../../../../components/sales/SalesDocumentDetailScreen';

export default function SalesQuoteDetailPage({ params }: { params: { number: string } }) {
  return <SalesDocumentDetailScreen kind="quote" number={decodeURIComponent(params.number)} />;
}
