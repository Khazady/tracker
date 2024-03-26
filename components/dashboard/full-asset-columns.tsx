'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import TableHeader from '@/components/ui/table/table-header';
import {
  formatDailyChange,
  formatMarketCap,
  formatPrice,
} from '@/lib/data/market-data/formatters';
import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import DailyChangeCell from './daily-change-cell';

export type TableAsset = {
  // format number values on UI level for correct sorting
  id?: string;
  name?: string;
  icon?: string;
  price?: number;
  change?: number;
  cap?: number;
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
      const { id: symbol, name = '-' } = row.original;

      if (!symbol) {
        return <p className=" font-semibold">{name}</p>;
      }

      return (
        <Link
          href={`/assets/${symbol}`}
          className="cursor-pointer font-semibold text-primary hover:underline"
        >
          {name}
        </Link>
      );
    },
    header: ({ column }) => <TableHeader column={column} title="Name" />,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <TableHeader className="text-right" column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const formattedPrice = formatPrice(row.original.price);
      return <div className="text-right">{formattedPrice}</div>;
    },
  },
  {
    accessorKey: 'change',
    header: ({ column }) => (
      <TableHeader className="text-right" column={column} title="Daily" />
    ),
    cell: ({ row }) => {
      const formattedChange = formatDailyChange(row.original.change);
      return (
        <DailyChangeCell change={formattedChange} className="text-right" />
      );
    },
  },
  {
    accessorKey: 'cap',
    header: ({ column }) => (
      <TableHeader className="text-right" column={column} title="Market Cap" />
    ),
    cell: ({ row }) => {
      const cap: number = row.getValue('cap');
      const formattedCap = formatMarketCap(cap);
      return <div className="text-right">{formattedCap}</div>;
    },
  },
];
