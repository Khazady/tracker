'use client';

import {
  iconColumn,
  TableAsset,
} from '@/components/dashboard/full-asset-columns';
import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export type ShortTableAsset = Pick<TableAsset, 'id' | 'name' | 'icon'>;

export const columns: ColumnDef<ShortTableAsset>[] = [
  iconColumn,
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const name: string = row.getValue('name') || '-';
      const symbol: string = row.original.id || '-';
      return (
        <Link
          href={`/assets/${symbol}`}
          className="cursor-pointer font-semibold text-primary hover:underline"
        >
          {name}
        </Link>
      );
    },
  },
];