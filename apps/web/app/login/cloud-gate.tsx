import Link from 'next/link';
import { marketingUrl } from '../../lib/marketing-url';

export function CloudGate({ mode }: { mode: 'choose' | 'account' | 'register' }) {
  return (
    <main className="cloud-gate" dir="rtl">
      <header className="cloud-gate-bar">
        <Link href={marketingUrl('/')} className="cloud-gate-brand">
          رشد
        </Link>
        {mode === 'choose' ? (
          <Link href="/login/account" className="cloud-gate-back">
            قبلاً ERP خودم رو ساخته‌ام
          </Link>
        ) : (
          <Link href="/login" className="cloud-gate-back">
            بازگشت
          </Link>
        )}
      </header>

      {mode === 'choose' ? (
        <section className="cloud-gate-copy">
          <h1>چطور می‌خواهید شروع کنید؟</h1>
          <p>اول محصول را با داده‌های نمونه ببینید یا فضای کاری واقعی خودتان را بسازید.</p>
          <div className="cloud-gate-grid">
            <article className="cloud-card">
              <span className="cloud-kicker">برای آشنایی با محصول</span>
              <div className="cloud-mock cloud-mock-live" aria-hidden>
                <span>۴۲</span>
                <span>۱.۸ میلیارد</span>
                <span>۳۴۸</span>
              </div>
              <h2>مشاهده دمو</h2>
              <p>وارد محیط آماده شوید و فروش، مالی، انبار و پروژه‌ها را با داده‌های نمونه فارسی بررسی کنید.</p>
              <Link href={marketingUrl('/demo')} className="cloud-cta cloud-cta-blue">
                مشاهده دمو
              </Link>
            </article>
            <article className="cloud-card">
              <span className="cloud-kicker">برای شروع کار واقعی</span>
              <div className="cloud-mock" aria-hidden>
                <span />
                <span />
                <span />
              </div>
              <h2>ERP خودم رو می‌خوام بسازم</h2>
              <p>فضای کاری اختصاصی کسب‌وکارتان را با پنل خالی بسازید و دوره آزمایشی را شروع کنید.</p>
              <Link href="/register" className="cloud-cta cloud-cta-navy">
                ERP خودم رو می‌خوام بسازم
              </Link>
            </article>
          </div>
        </section>
      ) : null}

      {mode === 'account' ? (
        <form className="cloud-form" action="/dashboard">
          <h1>ورود</h1>
          <label>
            ایمیل
            <input name="email" type="email" dir="ltr" required />
          </label>
          <label>
            رمز عبور
            <input name="password" type="password" dir="ltr" required />
          </label>
          <button className="cloud-cta cloud-cta-blue" type="submit">
            ورود
          </button>
        </form>
      ) : null}

      {mode === 'register' ? (
        <form className="cloud-form" action="/dashboard">
          <h1>ساخت فضای کاری</h1>
          <label>
            نام
            <input name="name" required />
          </label>
          <label>
            ایمیل
            <input name="email" type="email" dir="ltr" required />
          </label>
          <label>
            نام شرکت
            <input name="company" />
          </label>
          <button className="cloud-cta cloud-cta-navy" type="submit">
            شروع دوره آزمایشی
          </button>
          <p className="cloud-form-note">
            حساب دارید؟ <Link href="/login/account">ورود</Link>
          </p>
        </form>
      ) : null}
    </main>
  );
}
