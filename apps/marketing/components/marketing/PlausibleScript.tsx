import { PLAUSIBLE_DOMAIN } from '@/lib/constants';
import Script from 'next/script';

export function PlausibleScript() {
  if (!PLAUSIBLE_DOMAIN) return null;
  return (
    <Script
      defer
      data-domain={PLAUSIBLE_DOMAIN}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
