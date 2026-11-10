'use client';

import jalaali from 'jalaali-js';

const statusColor: Record<string, string> = {
  Present: 'bg-emerald-500',
  Absent: 'bg-red-500',
  Leave: 'bg-blue-500',
  Holiday: 'bg-gray-400',
};

const statusFa: Record<string, string> = {
  Present: 'حاضر',
  Absent: 'غایب',
  Leave: 'مرخصی',
  Holiday: 'تعطیل',
};

const statuses = ['Present', 'Absent', 'Leave', 'Holiday'] as const;

export function JalaliAttendanceCalendar() {
  const now = new Date();
  const { jy, jm } = jalaali.toJalaali(now);
  const daysInMonth = jalaali.jalaaliMonthLength(jy, jm);

  const cells = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const status = statuses[day % statuses.length] ?? 'Present';
    return { day, status };
  });

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">
        {jy}/{jm} — تقویم جلالی
      </p>
      <DaysLegend />
      <div className="grid grid-cols-7 gap-2 max-w-lg">
        {cells.map((c) => (
          <span
            key={c.day}
            title={statusFa[c.status]}
            className={`h-10 rounded flex items-center justify-center text-xs text-white ${statusColor[c.status]}`}
          >
            {c.day}
          </span>
        ))}
      </div>
    </div>
  );
}

function DaysLegend() {
  return (
    <div className="flex flex-wrap gap-3 text-xs">
      {statuses.map((s) => (
        <span key={s} className="inline-flex items-center gap-1">
          <span className={`h-3 w-3 rounded ${statusColor[s]}`} />
          {statusFa[s]}
        </span>
      ))}
    </div>
  );
}
