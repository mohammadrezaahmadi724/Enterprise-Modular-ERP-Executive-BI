import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  body: string;
};

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  if (!raw.startsWith('---')) return { meta: {}, body: raw };
  const end = raw.indexOf('---', 3);
  const block = raw.slice(3, end).trim();
  const body = raw.slice(end + 3).trim();
  const meta: Record<string, string> = {};
  for (const line of block.split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body };
}

export function getBlogSlugs(): string[] {
  if (!existsSync(BLOG_DIR)) return [];
  return readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx?$/, ''));
}

export function getPost(slug: string): BlogPost | null {
  const fileMd = path.join(BLOG_DIR, `${slug}.md`);
  const fileMdx = path.join(BLOG_DIR, `${slug}.mdx`);
  const file = existsSync(fileMd) ? fileMd : existsSync(fileMdx) ? fileMdx : null;
  if (!file) return null;
  const raw = readFileSync(file, 'utf8');
  const { meta, body } = parseFrontmatter(raw);
  return {
    slug,
    title: meta.title ?? slug,
    excerpt: meta.excerpt ?? '',
    date: meta.date ?? '1404-01-01',
    body,
  };
}

export function getAllPosts(): BlogPost[] {
  return getBlogSlugs()
    .map((s) => getPost(s))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}
