'use client';

import { Input } from './input';

/** ورودی تاریخ شمسی ساده (۱۴۰۴/۰۸/۱۲) — جایگزین موقت Calix DatePicker */
export function JalaliDateInput({
  value,
  onChange,
  placeholder = '۱۴۰۴/۰۸/۱۲',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <Input
      value={value}
      placeholder={placeholder}
      dir="ltr"
      className="text-left font-mono"
      onChange={(e) => onChange(e.target.value)}
      pattern="\d{4}/\d{2}/\d{2}"
      title="فرمت: YYYY/MM/DD شمسی"
    />
  );
}
