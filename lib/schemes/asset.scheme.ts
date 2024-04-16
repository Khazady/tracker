import { z } from 'zod';

export const assetScheme = z.object({
  id: z.string(),
  name: z.string(),
  symbol: z.string(),
  icon: z.string().url().optional(),
  price: z.number().positive(),
  change: z.number(),
  cap: z.number(),
});

export type AssetType = z.TypeOf<typeof assetScheme>;

export type ShortAssetType = Pick<AssetType, 'id' | 'name' | 'icon' | 'symbol'>;
