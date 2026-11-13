'use client';

import { useState } from 'react';
import { archiveMasterDataRecord } from '../../../lib/projects-master-data-api';
import type { MasterDataResource } from '../../../lib/master-data-actions';
import { ARCHIVE_API_SECTION } from '../../../lib/master-data-actions';

export function MasterDataArchiveButton({
  resource,
  code,
  entitled,
  disabled,
  onArchived,
}: {
  resource: MasterDataResource;
  code: string;
  entitled: boolean;
  disabled?: boolean;
  onArchived?: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const sectionPath = ARCHIVE_API_SECTION[resource];
  const archivable = Boolean(sectionPath);

  if (!archivable) {
    return (
      <span className="text-xs text-muted-foreground" title="آرشیو از ماژول مبدأ انجام می‌شود">
        —
      </span>
    );
  }

  const inactive = disabled || !entitled || busy;

  return (
    <button
      type="button"
      className="text-xs text-primary disabled:opacity-40"
      disabled={inactive}
      onClick={async () => {
        if (!sectionPath) return;
        setBusy(true);
        try {
          const res = await archiveMasterDataRecord(sectionPath, code);
          if (res.ok) onArchived?.();
        } finally {
          setBusy(false);
        }
      }}
    >
      {busy ? '…' : 'آرشیو'}
    </button>
  );
}
