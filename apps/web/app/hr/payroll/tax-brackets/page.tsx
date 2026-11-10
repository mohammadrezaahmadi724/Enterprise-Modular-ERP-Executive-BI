export default function TaxBracketsPage() {
  return (
    <main className="p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">پلکان مالیات (Effective Year)</h1>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-right">
            <th className="p-2">سال</th>
            <th className="p-2">حداقل</th>
            <th className="p-2">نرخ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">۱۴۰۲</td>
            <td className="p-2">۰</td>
            <td className="p-2">۱۰٪</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
