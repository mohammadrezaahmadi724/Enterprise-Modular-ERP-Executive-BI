'use client';

import { useSiteContent } from '@/lib/use-site-content';

export function PhoneBar() {
  const site = useSiteContent();
  return (
    <a className="sk-phone" href={`tel:${site.phoneTel}`}>
      <span>تماس با رشد</span>
      <strong>{site.phoneDisplay}</strong>
    </a>
  );
}
