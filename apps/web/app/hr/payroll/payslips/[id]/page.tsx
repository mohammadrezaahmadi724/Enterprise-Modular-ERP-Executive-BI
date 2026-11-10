import { PayslipPdfButton } from '../../../../../components/payslip-pdf';

type Props = { params: Promise<{ id: string }> };

function PayslipPdfBlock() {
  return <PayslipPdfButton employeeName="نمونه کارمند" base={50_000_000} tax={4_500_000} netPay={43_000_000} />;
}

export default async function PayslipDetailPage({ params }: Props) {
  const { id } = await params;
  const fmt = new Intl.NumberFormat('fa-IR');
  return (
    <main className="p-6 max-w-md" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">فیش حقوق #{id.slice(0, 8)}</h1>
      <dl className="space-y-2 text-sm">
        <Row label="پایه" value={fmt.format(50_000_000)} />
        <Row label="مالیات" value={fmt.format(4_500_000)} />
        <Row label="خالص" value={fmt.format(43_000_000)} />
      </dl>
      <div className="mt-4">
        <PayslipPdfBlock />
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-1">
      <dt>{label}</dt>
      <dd>{value} ریال</dd>
    </div>
  );
}
