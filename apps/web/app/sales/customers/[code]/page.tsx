import { SalesCustomerDetailScreen } from '../../../../components/sales/SalesCustomerDetailScreen';

type Props = {
  params: { code: string };
};

export default function SalesCustomerDetailPage({ params }: Props) {
  return <SalesCustomerDetailScreen code={decodeURIComponent(params.code)} />;
}
