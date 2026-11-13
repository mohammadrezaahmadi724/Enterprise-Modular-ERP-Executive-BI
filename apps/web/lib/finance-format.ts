/** نمایش مبلغ: API بر حسب ریال — UI فارسی غالباً تومان */
export function irrToTomanDisplay(irr: number): { short: string; full: string; billions?: string } {
  const toman = irr / 10;
  const full = new Intl.NumberFormat('fa-IR').format(Math.round(toman));
  if (toman >= 1_000_000_000) {
    const billions = (toman / 1_000_000_000).toFixed(2).replace(/\.00$/, '');
    const faBillions = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 2 }).format(
      Number(billions),
    );
    return { short: faBillions, full, billions: faBillions };
  }
  return { short: full, full };
}

export function formatIrrTable(irr: number): string {
  return new Intl.NumberFormat('fa-IR').format(Math.round(irr / 10));
}
