import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { SakhtarHeader } from '@/components/marketing/SakhtarHeader';
import { SakhtarFooter } from '@/components/marketing/SakhtarFooter';
import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/brand';
import { SITE_URL } from '@/lib/constants';
import { PlausibleScript } from '@/components/marketing/PlausibleScript';
import './globals.css';

const vazirmatn = Vazirmatn({ subsets: ['arabic'], variable: '--font-vazirmatn', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${BRAND_NAME} | ERP ماژولار`, template: `%s | ${BRAND_NAME}` },
  description: `${BRAND_TAGLINE} — برآورد هزینه، ERP ابری و ERP اختصاصی`,
  alternates: { languages: { 'fa-IR': '/' } },
  openGraph: { locale: 'fa_IR', type: 'website' },
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: BRAND_NAME,
  url: SITE_URL,
  inLanguage: 'fa-IR',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa-IR" dir="rtl" className={vazirmatn.variable} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <PlausibleScript />
          <SakhtarHeader />
          <div id="main" className="flex min-h-[calc(100vh-4.25rem)] flex-col">
            {children}
          </div>
          <SakhtarFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
