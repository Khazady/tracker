'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SortedHeader from '@/components/ui/table/sorted-header';
import { formatMarketCap } from '@/lib/data/market-data/formatters';
import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import DailyChangeCell from './daily-change-cell';

export type TableAsset = {
  id?: string;
  name?: string;
  icon?: string;
  price?: string;
  change?: string;
  cap?: string;
};

export const columns: ColumnDef<TableAsset>[] = [
  {
    accessorKey: 'icon',
    header: '',
    cell: ({ row }) => {
      const url: string = row.getValue('icon');
      const name: string = row.getValue('name');
      return (
        <Avatar className="h-8 w-8">
          <AvatarImage src={url} alt={name} />
          <AvatarFallback>{name.at(0)}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: 'name',
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
    header: ({ column }) => <SortedHeader column={column} title="Name" />,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <SortedHeader align="right" column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const price: string = row.getValue('price') || '-';
      return <div className="text-right">{price}</div>;
    },
  },
  {
    accessorKey: 'change',
    header: ({ column }) => (
      <SortedHeader align="right" column={column} title="Daily" />
    ),
    cell: ({ row }) => {
      const change: string = row.getValue('change');
      return <DailyChangeCell change={change} className="text-right" />;
    },
  },
  {
    accessorKey: 'cap',
    header: ({ column }) => (
      <SortedHeader align="right" column={column} title="Market Cap" />
    ),
    cell: ({ row }) => {
      const cap: string = row.getValue('cap');

      const formattedCap = formatMarketCap(cap);
      return <div className="text-right">{formattedCap}</div>;
    },
    sortingFn: (rowA, rowB) => {
      const toNumber = (cap: string) =>
        Number(cap.replace('$', '').replace(/,/g, ''));
      const [a, b] = [
        toNumber(rowA.getValue('cap')),
        toNumber(rowB.getValue('cap')),
      ];

      return a - b;
    },
  },
];
