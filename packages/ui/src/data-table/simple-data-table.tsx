'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../primitives/table';

export type SimpleColumn<T> = { key: keyof T | string; header: string; cell?: (row: T) => React.ReactNode };

/** جدول سراسری سبک — پایه برای مهاجرت به TanStack Table */
export function SimpleDataTable<T extends Record<string, unknown>>({
  columns,
  data,
}: {
  columns: SimpleColumn<T>[];
  data: T[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((c) => (
            <TableHead key={String(c.key)}>{c.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={String(row.id ?? i)}>
            {columns.map((c) => (
              <TableCell key={String(c.key)}>
                {c.cell ? c.cell(row) : String(row[c.key as keyof T] ?? '—')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
