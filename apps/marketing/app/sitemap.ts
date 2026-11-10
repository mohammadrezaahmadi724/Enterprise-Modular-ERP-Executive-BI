import type { MetadataRoute } from 'next';
import { MODULES } from '@/lib/modules-catalog';
import { getBlogSlugs } from '@/lib/blog';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/$/, '');
  const staticRoutes = ['', '/pricing', '/demo', '/contact', '/legal/privacy', '/legal/terms'];
  const items: MetadataRoute.Sitemap = staticRoutes.map((p) => ({
    url: `${base}${p || '/'}`,
    lastModified: new Date(),
    changeFrequency: p === '' ? 'weekly' : 'monthly',
    priority: p === '' ? 1 : 0.7,
  }));
  for (const m of MODULES) {
    items.push({ url: `${base}/modules/${m.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });
  }
  for (const slug of getBlogSlugs()) {
    items.push({ url: `${base}/blog/${slug}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 });
  }
  return items;
}
