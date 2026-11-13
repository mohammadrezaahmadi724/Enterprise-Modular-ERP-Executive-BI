export type YearCloseTask = {
  id: string;
  title: string;
  description: string;
  done: boolean;
  blocking: boolean;
};

export const FISCAL_YEAR_LABEL = '۱۴۰۵';
export const CLOSE_PROGRESS = { done: 9, total: 16 };

export const YEAR_CLOSE_TASKS: YearCloseTask[] = [
  { id: 't1', title: 'بستن دوره‌های ماهانه آبان', description: 'تمام ماه‌های سال قبل از اختتامیه بسته باشند', done: false, blocking: true },
  { id: 't2', title: 'ثبت استهلاک دارایی ثابت', description: 'سند استهلاک آذر — ۱۲ ماهه', done: true, blocking: true },
  { id: 't3', title: 'موجودی پایان دوره', description: 'انبارگردانی و تعدیل موجودی', done: false, blocking: true },
  { id: 't4', title: 'تسویه حساب‌های پرداختنی/دریافتنی', description: 'مغایرت با طرف‌حساب‌ها', done: false, blocking: false },
  { id: 't5', title: 'ذخیره مطالبات مشکوک‌الوصول', description: 'طبق سیاست شرکت — ۲٪ فروش اعتباری', done: true, blocking: false },
  { id: 't6', title: 'سند اختتامیه', description: 'بستن حساب‌های موقت و انتقال به سود انباشته', done: false, blocking: true },
  { id: 't7', title: 'سند افتتاحیه سال ۱۴۰۶', description: 'بعد از تأیید اختتامیه', done: false, blocking: true },
  { id: 't8', title: 'قفل سال مالی', description: 'غیرقابل برگشت پس از قفل', done: false, blocking: true },
];
