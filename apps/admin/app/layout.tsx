import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { AdminHeader, AdminSidebar, AppShell, Toaster } from '@repo/ui';
import './globals.css';

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'پنل مدیریت پلتفرم', template: '%s | Super Admin' },
  description: 'کنسول SaaS',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a href="#main-content" className="skip-link">
            پرش به محتوا
          </a>
          <div id="main-content">
            <AppShell sidebar={<AdminSidebar />} header={<AdminHeader />}>
              {children}
            </AppShell>
          </div>
          <Toaster position="top-center" richColors dir="rtl" />
        </ThemeProvider>
      </body>
    </html>
  );
}
