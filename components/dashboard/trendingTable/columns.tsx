'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { ColumnDef } from '@tanstack/react-table';

export type TableAsset = {
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
    header: 'Name',
  },
  {
    accessorKey: 'price',
    header: () => <div className="text-right">Price</div>,
  },
  {
    accessorKey: 'change',
    header: 'Daily',
  },
  {
    accessorKey: 'cap',
    header: 'Market Cap',
  },
];
