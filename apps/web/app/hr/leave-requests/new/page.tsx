export default function NewLeaveRequestPage() {
  return (
    <main className="p-6 max-w-md space-y-4" dir="rtl">
      <h1 className="text-2xl font-bold">درخواست مرخصی</h1>
      <label className="block text-sm">
        از تاریخ
        <input type="date" className="mt-1 w-full border rounded px-2 py-1" />
      </label>
      <label className="block text-sm">
        تا تاریخ
        <input type="date" className="mt-1 w-full border rounded px-2 py-1" />
      </label>
      <button type="button" className="rounded bg-primary text-primary-foreground px-4 py-2 text-sm">
        ارسال برای تایید
      </button>
    </main>
  );
}
