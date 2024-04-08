'use client';

import Avatar from '@/components/ui/avatar/avatar';
import { Badge } from '@/components/ui/badge';
import SortableTableHeader from '@/components/ui/table/sortable-table-header';
import {
  formatDailyChange,
  formatMarketCap,
  formatPrice,
} from '@/lib/data/market-data/formatters';
import type { AssetType } from '@/lib/schemes/asset.scheme';
import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import DailyChangeCell from './daily-change-cell';

export const iconColumn: ColumnDef<Pick<AssetType, 'name' | 'icon'>> = {
  accessorKey: 'icon',
  header: undefined,
  size: 50,
  cell: ({ row }) => {
    const { icon, name } = row.original;
    return <Avatar url={icon} name={name} />;
  },
};

export function nameColumn(
  showHeader?: boolean,
): ColumnDef<Pick<AssetType, 'name' | 'id' | 'symbol'>> {
  return {
    accessorKey: 'name',
    header: showHeader ? 'Name' : undefined,
    cell: ({ row }) => {
      const { id, name, symbol } = row.original;

      if (!symbol) {
        return <p className=" font-semibold">{name}</p>;
      }

      return (
        <Link href={`/assets/${id}`} className="flex cursor-pointer flex-col">
          <span className="font-semibold text-primary hover:underline">
            {name}
          </span>
          <Badge variant="secondary" className="text-muted-foreground">
            {symbol}
          </Badge>
        </Link>
      );
    },
  };
}

export const columns: ColumnDef<AssetType>[] = [
  iconColumn as ColumnDef<AssetType>,
  nameColumn(true) as ColumnDef<AssetType>,
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
