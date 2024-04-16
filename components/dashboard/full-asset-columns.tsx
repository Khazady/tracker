'use client';

import Avatar from '@/components/ui/avatar/avatar';
import SortableTableHeader from '@/components/ui/table/sortable-table-header';
import {
  formatDailyChange,
  formatMarketCap,
  formatPrice,
} from '@/lib/data/market-data/formatters';
import type { AssetType } from '@/lib/schemes/asset.scheme';
import type { ColumnDef } from '@tanstack/react-table';
import { AssetNameCell } from '../ui/table/cells/asset-name';
import DailyChangeCell from './daily-change-cell';

export const columns: ColumnDef<AssetType>[] = [
  {
    accessorKey: 'icon',
    header: undefined,
    size: 50,
    cell: ({ row }) => {
      const { icon, name } = row.original;
      return <Avatar url={icon} name={name} />;
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <AssetNameCell {...row.original} />,
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
