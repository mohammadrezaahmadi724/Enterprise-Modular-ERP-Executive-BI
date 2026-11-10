'use client';

import { useMemo, useState } from 'react';
import jalaali from 'jalaali-js';
import { Button } from '../components/button';
import { cn } from '../lib/cn';
import { Input } from './input';

const WEEKDAYS_FA = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

function pad(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

function formatJalali(jy: number, jm: number, jd: number) {
  return `${jy}/${pad(jm)}/${pad(jd)}`;
}

/** DatePicker شمسی (Calix-lite) با jalaali-js */
export function JalaliDatePicker({
  value,
  onChange,
  placeholder = 'انتخاب تاریخ',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const today = jalaali.toJalaali(new Date());
  const parsed = useMemo(() => {
    const m = value.match(/^(\d{4})\/(\d{2})\/(\d{2})$/);
    if (!m) return { jy: today.jy, jm: today.jm, jd: today.jd };
    return { jy: Number(m[1]), jm: Number(m[2]), jd: Number(m[3]) };
  }, [value, today.jm, today.jy, today.jd]);

  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(parsed.jy);
  const [viewMonth, setViewMonth] = useState(parsed.jm);

  const daysInMonth = jalaali.jalaaliMonthLength(viewYear, viewMonth);
  const firstGreg = jalaali.toGregorian(viewYear, viewMonth, 1);
  const firstWeekday = new Date(firstGreg.gy, firstGreg.gm - 1, firstGreg.gd).getDay();
  const offset = (firstWeekday + 1) % 7;

  const cells = useMemo(() => {
    const items: Array<{ jd: number | null }> = [];
    for (let i = 0; i < offset; i++) items.push({ jd: null });
    for (let d = 1; d <= daysInMonth; d++) items.push({ jd: d });
    return items;
  }, [daysInMonth, offset]);

  const selectDay = (jd: number) => {
    onChange(formatJalali(viewYear, viewMonth, jd));
    setOpen(false);
  };

  return (
    <div className="relative">
      <Input
        value={value}
        readOnly
        placeholder={placeholder}
        dir="ltr"
        className="cursor-pointer text-left font-mono"
        onClick={() => setOpen((o) => !o)}
      />
      {open && (
        <div className="absolute z-50 mt-1 w-72 rounded-md border bg-popover p-3 text-popover-foreground shadow-md">
          <div className="mb-2 flex items-center justify-between gap-2">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                if (viewMonth === 1) {
                  setViewYear((y) => y - 1);
                  setViewMonth(12);
                } else setViewMonth((m) => m - 1);
              }}
            >
              ‹
            </Button>
            <span className="text-sm font-medium">
              {viewYear}/{pad(viewMonth)}
            </span>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                if (viewMonth === 12) {
                  setViewYear((y) => y + 1);
                  setViewMonth(1);
                } else setViewMonth((m) => m + 1);
              }}
            >
              ›
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
            {WEEKDAYS_FA.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((c, i) =>
              c.jd ? (
                <button
                  key={i}
                  type="button"
                  className={cn(
                    'h-8 rounded-md text-sm hover:bg-accent',
                    value === formatJalali(viewYear, viewMonth, c.jd) && 'bg-primary text-primary-foreground',
                  )}
                  onClick={() => selectDay(c.jd!)}
                >
                  {c.jd}
                </button>
              ) : (
                <span key={i} />
              ),
            )}
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mt-2 w-full"
            onClick={() => onChange(formatJalali(today.jy, today.jm, today.jd))}
          >
            امروز
          </Button>
        </div>
      )}
    </div>
  );
}
