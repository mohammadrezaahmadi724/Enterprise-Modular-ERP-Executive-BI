'use client';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Button } from '../components/button';
import { Input } from '../primitives/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../primitives/table';

export type ErpColumnDef<T> = {
  accessorKey: keyof T & string;
  header: string;
  cell?: (row: T) => React.ReactNode;
  enableSorting?: boolean;
};

export function ErpDataTable<T extends Record<string, unknown>>({
  columns,
  data,
  globalFilterPlaceholder = 'جستجو…',
  pageSize = 10,
  renderRowActions,
}: {
  columns: ErpColumnDef<T>[];
  data: T[];
  globalFilterPlaceholder?: string;
  pageSize?: number;
  renderRowActions?: (row: T) => React.ReactNode;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const defs = useMemo<ColumnDef<T>[]>(() => {
    const base = columns.map((c) => ({
      accessorKey: c.accessorKey,
      header: c.header,
      enableSorting: c.enableSorting ?? true,
      cell: c.cell
        ? ({ row }: { row: { original: T } }) => c.cell!(row.original)
        : ({ row }: { row: { original: T } }) => String(row.original[c.accessorKey] ?? '—'),
    }));
    if (renderRowActions) {
      base.push({
        id: '_actions',
        header: 'عملیات',
        enableSorting: false,
        cell: ({ row }) => renderRowActions(row.original),
      });
    }
    return base;
  }, [columns, renderRowActions]);

  const table = useReactTable({
    data,
    columns: defs,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Input
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder={globalFilterPlaceholder}
          className="max-w-md"
        />
        <p className="text-xs text-muted-foreground">
          {table.getFilteredRowModel().rows.length} رکورد · صفحه {table.getState().pagination.pageIndex + 1} از{' '}
          {Math.max(table.getPageCount(), 1)}
        </p>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((h) => (
                <TableHead
                  key={h.id}
                  className={h.column.getCanSort() ? 'cursor-pointer select-none' : undefined}
                  onClick={h.column.getToggleSortingHandler()}
                >
                  {flexRender(h.column.columnDef.header, h.getContext())}
                  {h.column.getIsSorted() === 'asc' ? ' ▲' : h.column.getIsSorted() === 'desc' ? ' ▼' : ''}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          قبلی
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
}
