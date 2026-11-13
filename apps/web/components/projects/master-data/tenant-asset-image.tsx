'use client';

import { useEffect, useState } from 'react';
import { fetchTenantAssetBlob } from '../../../lib/projects-master-data-api';

export function TenantAssetImage({
  assetPath,
  alt,
  className,
}: {
  assetPath?: string;
  alt: string;
  className?: string;
}) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;
    if (!assetPath?.startsWith('/api/v1/tenant-assets/')) {
      setSrc(assetPath ?? null);
      return;
    }
    void (async () => {
      try {
        const blob = await fetchTenantAssetBlob(assetPath);
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setSrc(objectUrl);
      } catch {
        if (!cancelled) setSrc(null);
      }
    })();
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [assetPath]);

  if (!src) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} />;
}
