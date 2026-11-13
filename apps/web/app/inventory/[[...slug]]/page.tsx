import { redirect } from 'next/navigation';

export default async function InventoryCatchAll({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const tail = slug?.length ? `/${slug.join('/')}` : '';
  redirect(`/wms${tail}`);
}
