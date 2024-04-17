'use client';

import Avatar from '@/components/ui/avatar/avatar';
import { AssetNameCell } from '@/components/ui/table/cells/asset-name';
import ChangeCell from '@/components/ui/table/cells/change-cell';
import SortableTableHeader from '@/components/ui/table/sortable-table-header';
import {
  formatChangePercentage,
  formatPrice,
} from '@/lib/data/market-data/formatters';
import { PositionWithCurrentPrice } from '@/lib/schemes/position.scheme';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<PositionWithCurrentPrice>[] = [
  {
    accessorKey: 'icon',
    header: undefined,
    size: 50,
    cell: ({ row }) => {
      const { name, icon } = row.original;
      return <Avatar url={icon} name={name} />;
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <AssetNameCell {...row.original} id={row.original.assetId} />
    ),
  },
  {
    accessorKey: 'capitalInvested',
    header: ({ column }) => (
      <SortableTableHeader
        className="text-right"
        column={column}
        title="Buy in"
      />
    ),
    cell: ({ row }) => {
      const { buyInPrice, capitalInvested } = row.original;
      const formattedPrice = formatPrice(buyInPrice);
      const formattedCapitalInvested = formatPrice(capitalInvested);
      return (
        <div>
          <div className="text-right">{formattedCapitalInvested}</div>
          <div className="text-right text-muted-foreground">
            {formattedPrice}
          </div>
        </div>
      );
    },
    size: 150,
  },
  {
    accessorKey: 'currentPosition',
    header: ({ column }) => (
      <SortableTableHeader
        className="text-right"
        column={column}
        title="Position"
      />
    ),
    cell: ({ row }) => {
      const { currentPrice, currentPosition } = row.original;
      const formattedPrice = formatPrice(currentPrice);
      const formattedPosition = formatPrice(currentPosition);
      return (
        <div>
          <div className="text-right">{formattedPosition}</div>
          <div className="text-right text-muted-foreground">
            {formattedPrice}
          </div>
        </div>
      );
    },
    size: 150,
  },
  {
    accessorKey: 'profitLossPercent',
    header: ({ column }) => (
      <SortableTableHeader className="text-right" column={column} title="P/L" />
    ),
    cell: ({ row }) => {
      const { profitLossCurrency, profitLossPercent } = row.original;
      const formattedProfitPercent = formatChangePercentage(profitLossPercent);
      const formattedProfitCurrency = formatPrice(profitLossCurrency);
      return (
        <div>
          <ChangeCell change={formattedProfitCurrency} className="text-right" />
          <ChangeCell
            change={formattedProfitPercent}
            isArrowFormat
            className="text-right"
          />
        </div>
      );
    },
    size: 150,
  },
];
