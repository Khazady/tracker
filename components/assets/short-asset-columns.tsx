'use client';

import { iconColumn } from '@/components/dashboard/full-asset-columns';
import type { ShortTableAsset } from '@/lib/schemes/asset.scheme';
import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const columns: ColumnDef<ShortTableAsset>[] = [
  iconColumn as ColumnDef<ShortTableAsset>,
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
