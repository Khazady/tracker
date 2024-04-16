'use client';

import Avatar from '@/components/ui/avatar/avatar';
import type { ShortAssetType } from '@/lib/schemes/asset.scheme';
import type { ColumnDef } from '@tanstack/react-table';
import { AssetNameCell } from '../ui/table/cells/asset-name';

export const columns: ColumnDef<ShortAssetType>[] = [
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
    cell: ({ row }) => <AssetNameCell {...row.original} />,
  },
];
