'use client';

import {
  iconColumn,
  nameColumn,
} from '@/components/dashboard/full-asset-columns';
import type { ShortAssetType } from '@/lib/schemes/asset.scheme';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<ShortAssetType>[] = [
  iconColumn as ColumnDef<ShortAssetType>,
  nameColumn() as ColumnDef<ShortAssetType>,
];
