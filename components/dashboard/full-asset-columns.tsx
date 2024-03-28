'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SortableTableHeader from '@/components/ui/table/sortable-table-header';
import {
  formatDailyChange,
  formatMarketCap,
  formatPrice,
} from '@/lib/data/market-data/formatters';
import type { TableAsset } from '@/lib/schemes/asset.scheme';
import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import DailyChangeCell from './daily-change-cell';

export const iconColumn: ColumnDef<Pick<TableAsset, 'name' | 'icon'>> = {
  accessorKey: 'icon',
  header: '',
  size: 50,
  cell: ({ row }) => {
    const { icon: url, name } = row.original;
    return (
      <Avatar className="h-8 w-8">
        <AvatarImage src={url} alt={name} />
        <AvatarFallback>{name?.at(0)}</AvatarFallback>
      </Avatar>
    );
  },
};

export const columns: ColumnDef<TableAsset>[] = [
  iconColumn as ColumnDef<TableAsset>,
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
    header: ({ column }) => (
      <SortableTableHeader column={column} title="Name" />
    ),
    size: 200,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <SortableTableHeader
        className="text-right"
        column={column}
        title="Price"
      />
    ),
    cell: ({ row }) => {
      const formattedPrice = formatPrice(row.original.price);
      return <div className="text-right">{formattedPrice}</div>;
    },
    size: 150,
  },
  {
    accessorKey: 'change',
    header: ({ column }) => (
      <SortableTableHeader
        className="text-right"
        column={column}
        title="Daily"
      />
    ),
    cell: ({ row }) => {
      const formattedChange = formatDailyChange(row.original.change);
      return (
        <DailyChangeCell change={formattedChange} className="text-right" />
      );
    },
    size: 100,
  },
  {
    accessorKey: 'cap',
    header: ({ column }) => (
      <SortableTableHeader
        className="text-right"
        column={column}
        title="Market Cap"
      />
    ),
    cell: ({ row }) => {
      const cap: number = row.getValue('cap');
      const formattedCap = formatMarketCap(cap);
      return <div className="text-right">{formattedCap}</div>;
    },
    size: 100,
  },
];
