import { z } from 'zod';

export const assetScheme = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().optional(),
  price: z.number(),
  change: z.number(),
  cap: z.number(),
});

export type TableAsset = z.TypeOf<typeof assetScheme>;

export type ShortTableAsset = Pick<TableAsset, 'id' | 'name' | 'icon'>;
