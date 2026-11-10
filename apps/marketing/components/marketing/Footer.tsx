import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t py-10 text-sm text-muted-foreground" dir="rtl">
      <div className="mx-auto max-w-6xl px-4 grid gap-6 md:grid-cols-3">
        <div>
          <p className="font-semibold text-foreground">ERP ابری</p>
          <p className="mt-2">© {new Intl.NumberFormat('fa-IR').format(1404)} — تمامی حقوق محفوظ</p>
        </div>
        <div className="flex flex-col gap-1">
          <Link href="/legal/privacy">حریم خصوصی</Link>
          <Link href="/legal/terms">قوانین</Link>
          <Link href="/contact">تماس</Link>
        </div>
        <p>تلگرام | لینکدین (Placeholder)</p>
      </div>
    </footer>
  );
}
