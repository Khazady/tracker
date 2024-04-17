'use client';

import Avatar from '@/components/ui/avatar/avatar';
import { AssetNameCell } from '@/components/ui/table/cells/asset-name';
import { TransactionWithPosition } from '@/lib/actions/transactions';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<TransactionWithPosition>[] = [
  {
    accessorKey: 'icon',
    header: undefined,
    size: 50,
    cell: ({ row }) => {
      const { name, icon } = row.original.position;
      return <Avatar url={icon} name={name} />;
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <AssetNameCell {...row.original.position} />,
  },
];
