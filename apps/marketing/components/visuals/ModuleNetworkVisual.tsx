'use client';

import { DEFAULT_ERP_MODULE_CATALOG } from '@repo/contracts';
import { BRAND_NAME } from '@/lib/brand';

const RADIUS = 42;

function polarToPercent(deg: number, r: number) {
  const rad = (deg * Math.PI) / 180;
  const x = 50 + r * Math.cos(rad);
  const y = 50 - r * Math.sin(rad);
  return { left: `${x}%`, top: `${y}%` };
}

export function ModuleNetworkVisual() {
  const modules = DEFAULT_ERP_MODULE_CATALOG;
  const step = 360 / modules.length;
  return (
    <div
      className="sakhtar-network relative mx-auto aspect-square w-full max-w-[min(100%,520px)]"
      aria-label="نمایش اتصال ماژول‌های ERP به هسته مرکزی"
    >
      <svg className="absolute inset-0 h-full w-full sakhtar-network-svg opacity-60" viewBox="0 0 100 100" aria-hidden>
        <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeDasharray="2 4" className="text-primary/20" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeDasharray="1 5" className="text-primary/15" />
        {modules.map((m, i) => {
          const deg = 90 - i * step;
          const p = polarToPercent(deg, RADIUS);
          const x = parseFloat(p.left);
          const y = parseFloat(p.top);
          return (
            <line key={m.code} x1="50" y1="50" x2={x} y2={y} stroke={m.color} strokeWidth="0.4" strokeOpacity="0.45" />
          );
        })}
      </svg>
      <div className="sakhtar-network-core absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="rounded-2xl border bg-card/90 px-6 py-4 shadow-lg ring-1 ring-primary/20 backdrop-blur">
          <strong className="block text-lg">{BRAND_NAME}</strong>
          <span className="text-xs text-muted-foreground">سیستم یکپارچه</span>
        </div>
      </div>
      {modules.map((m, i) => {
        const deg = 90 - i * step;
        const pos = polarToPercent(deg, RADIUS);
        return (
          <div
            key={m.code}
            className="sakhtar-network-node-anchor absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ ...pos, ['--module-color' as string]: m.color }}
          >
            <div
              className="sakhtar-network-card min-w-[4.5rem] rounded-lg border bg-card/95 px-2 py-1.5 text-center shadow-sm backdrop-blur"
              style={{ borderColor: `${m.color}55` }}
            >
              <span className="block text-[11px] font-medium leading-tight">{m.nameFa}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
