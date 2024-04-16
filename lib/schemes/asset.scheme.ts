import { z } from 'zod';

export const assetScheme = z.object({
  id: z.string(),
  name: z.string(),
  symbol: z.string(),
  icon: z.string().optional(),
  price: z.number(),
  change: z.number(),
  cap: z.number(),
});

export type AssetType = z.TypeOf<typeof assetScheme>;

export type ShortAssetType = Pick<AssetType, 'id' | 'name' | 'icon' | 'symbol'>;
