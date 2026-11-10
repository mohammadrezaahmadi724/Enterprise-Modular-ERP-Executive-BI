import { notFound } from 'next/navigation';
import { ModulePresentation } from '@/components/marketing/ModulePresentation';
import { MODULES, getModule } from '@/lib/modules-catalog';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return MODULES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const mod = getModule(slug);
  return { title: mod?.titleFa ?? 'ماژول' };
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) notFound();
  return <ModulePresentation mod={mod} />;
}
