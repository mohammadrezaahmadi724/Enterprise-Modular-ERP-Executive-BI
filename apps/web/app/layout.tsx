import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@repo/ui';
import { TenantShell } from '../components/tenant-shell';
import './globals.css';

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'پنل مدیریت', template: '%s | پنل مدیریت' },
  description: 'پلتفرم ERP ابری ماژولار',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a href="#main-content" className="skip-link">
            پرش به محتوا
          </a>
          <div id="main-content">
            <TenantShell>{children}</TenantShell>
          </div>
          <Toaster position="top-center" richColors closeButton dir="rtl" />
        </ThemeProvider>
      </body>
    </html>
  );
}
