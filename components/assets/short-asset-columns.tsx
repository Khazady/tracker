'use client';

import {
  iconColumn,
  nameColumn,
} from '@/components/dashboard/full-asset-columns';
import type { ShortTableAsset } from '@/lib/schemes/asset.scheme';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<ShortTableAsset>[] = [
  iconColumn as ColumnDef<ShortTableAsset>,
  nameColumn as ColumnDef<ShortTableAsset>,
];