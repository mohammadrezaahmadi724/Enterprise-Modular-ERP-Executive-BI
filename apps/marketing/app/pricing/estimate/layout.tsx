import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'نحوه محاسبه قیمت‌ها',
  description: 'برآوردگر آنلاین ERP — انتخاب ماژول، کاربران و مسیر ابری یا پیاده‌سازی اختصاصی',
  openGraph: { title: 'نحوه محاسبه قیمت‌ها | ساختار سیستم' },
};

export default function EstimateLayout({ children }: { children: React.ReactNode }) {
  return <div className="estimate-route-root">{children}</div>;
}
