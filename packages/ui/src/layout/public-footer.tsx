import Link from 'next/link';

type PublicFooterProps = { homeHref?: string; version?: string };

const MODULES = [
  'finance',
  'sales',
  'hr',
  'inventory',
  'manufacturing',
  'retail',
  'distribution',
  'bi-risk',
  'ai-messaging',
];

export function PublicFooter({ homeHref = '/', version = '6.1' }: PublicFooterProps) {
  return (
    <footer className="border-t bg-muted/30 py-12 text-sm" dir="rtl">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-4">
        <motion>
          <Link href={homeHref} className="font-bold">
            ERP ابری
          </Link>
          <p className="text-muted-foreground mt-2 text-xs leading-relaxed">کل کسب‌وکار شما در یک پلتفرم ماژولار امن.</p>
          <p className="mt-3 text-xs">تلگرام • لینکدین • اینستاگرام</p>
        </motion>
        <motion>
          <p className="font-semibold mb-2">محصول</p>
          {MODULES.slice(0, 5).map((s) => (
            <Link key={s} href={`/modules/${s}`} className="block text-muted-foreground hover:text-foreground text-xs py-0.5">
              {s}
            </Link>
          ))}
          <Link href="/pricing" className="block text-xs mt-2">
            قیمت‌گذاری
          </Link>
        </motion>
        <motion>
          <p className="font-semibold mb-2">شرکت</p>
          <Link href="/blog/welcome" className="block text-xs text-muted-foreground">
            وبلاگ
          </Link>
          <Link href="/contact" className="block text-xs text-muted-foreground mt-1">
            تماس
          </Link>
          <Link href="/demo" className="block text-xs text-muted-foreground mt-1">
            دمو
          </Link>
        </motion>
        <motion>
          <p className="font-semibold mb-2">حقوقی</p>
          <Link href="/legal/privacy" className="block text-xs">
            حریم خصوصی
          </Link>
          <Link href="/legal/terms" className="block text-xs mt-1">
            شرایط استفاده
          </Link>
          <Link href="/legal/security" className="block text-xs mt-1">
            امنیت
          </Link>
        </motion>
      </div>
      <div className="mx-auto max-w-6xl px-4 mt-8 pt-6 border-t flex flex-wrap justify-between text-xs text-muted-foreground gap-2">
        <span>© {new Intl.NumberFormat('fa-IR').format(1404)} — ساخته‌شده با ❤️ در ایران</span>
        <span>نسخه {version} • fa-IR</span>
        <span>SSL • زرین‌پال • آیدی‌پی (Placeholder)</span>
      </div>
    </footer>
  );
}

function motion(props: React.PropsWithChildren) {
  return <div>{props.children}</div>;
}
