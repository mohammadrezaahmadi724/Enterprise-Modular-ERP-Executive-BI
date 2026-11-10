import { toJalaali } from 'jalaali-js';

const WEEKDAYS_FA = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];

const MONTHS_FA = [
  '',
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

export type JalaliDayOption = {
  key: string;
  weekday: string;
  label: string;
  jy: number;
  jm: number;
  jd: number;
  disabled: boolean;
};

export function nextSevenJalaliDays(from = new Date()): JalaliDayOption[] {
  const out: JalaliDayOption[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(from);
    d.setDate(d.getDate() + i);
    const j = toJalaali(d);
    const weekday = WEEKDAYS_FA[d.getDay()] ?? '';
    const disabled = d.getDay() === 5;
    out.push({
      key: `${j.jy}-${j.jm}-${j.jd}`,
      weekday,
      label: `${j.jd} ${MONTHS_FA[j.jm]}`,
      jy: j.jy,
      jm: j.jm,
      jd: j.jd,
      disabled,
    });
  }
  return out;
}

export const MEETING_TIME_SLOTS = [
  '۰۹:۰۰-۱۰:۰۰',
  '۱۰:۰۰-۱۱:۰۰',
  '۱۱:۰۰-۱۲:۰۰',
  '۱۲:۰۰-۱۳:۰۰',
  '۱۳:۰۰-۱۴:۰۰',
  '۱۴:۰۰-۱۵:۰۰',
  '۱۵:۰۰-۱۶:۰۰',
  '۱۶:۰۰-۱۷:۰۰',
  '۱۷:۰۰-۱۸:۰۰',
];
