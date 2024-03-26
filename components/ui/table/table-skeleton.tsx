'use client';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table/table-atoms';
import { cn } from '@/lib/utils';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DataTableHeader } from './data-table';

interface SkeletonTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  iconCellIndex?: number;
}

export default function TableSkeleton<TData, TValue>({
  columns,
  iconCellIndex,
}: SkeletonTableProps<TData, TValue>) {
  const table = useReactTable({
    data: Array(15).fill({}) as TData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <div className="rounded-md border">
      <Table>
        <DataTableHeader table={table} />
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell, index) => {
                const skeletonClasses = cn('h-8 w-full rounded-full', {
                  'w-8': iconCellIndex === index,
                  'w-full': iconCellIndex !== index,
                });
                return (
                  <TableCell key={cell.id}>
                    <Skeleton key={cell.id} className={skeletonClasses} />
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
