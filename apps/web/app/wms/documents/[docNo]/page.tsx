import { WmsDocumentDetailScreen } from '../../../../components/wms/WmsDocumentDetailScreen';

export default function WmsDocumentPage({ params }: { params: { docNo: string } }) {
  return <WmsDocumentDetailScreen docNo={decodeURIComponent(params.docNo)} />;
}
