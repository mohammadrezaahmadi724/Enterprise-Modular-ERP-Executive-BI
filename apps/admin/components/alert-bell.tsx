'use client';

import { useEffect, useState } from 'react';

export function AlertBell() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_WEB_URL ?? 'http://127.0.0.1:3001'}/api/alerts`)
      .then((r) => r.json())
      .then((d) => setCount(d.unseen ?? 0))
      .catch(() => setCount(0));
  }, []);
  return (
    <button type="button" aria-label="اعلان" style={{ position: 'relative' }}>
      🔔
      {count > 0 && (
        <span style={{ position: 'absolute', top: -4, left: -4, background: '#dc2626', color: '#fff', fontSize: 10, borderRadius: 8, padding: '0 4px' }}>
          {count}
        </span>
      )}
    </button>
  );
}
