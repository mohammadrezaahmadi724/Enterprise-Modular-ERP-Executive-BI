import { notFound } from 'next/navigation';
import { getBlogSlugs, getPost } from '@/lib/blog';

export const revalidate = 3600;

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug: [slug] }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const key = slug.join('/');
  const post = getPost(key);
  if (!post) notFound();
  return (
    <article className="max-w-3xl mx-auto py-12 px-4 prose prose-sm" dir="rtl">
      <h1>{post.title}</h1>
      <p className="text-muted-foreground text-xs">{post.date}</p>
      <div className="whitespace-pre-wrap mt-6">{post.body}</div>
    </article>
  );
}
