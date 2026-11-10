declare module 'jalaali-js' {
  export function toJalaali(date: Date): { jy: number; jm: number; jd: number };
  export function jalaaliMonthLength(jy: number, jm: number): number;
}
