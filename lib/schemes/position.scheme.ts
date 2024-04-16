import { assetScheme } from '@/lib/schemes/asset.scheme';
import { Position } from '@prisma/client';
import { z } from 'zod';

export const positionScheme = z.object({
  assetId: assetScheme.shape.id,

  icon: assetScheme.shape.icon,

  name: z.string().min(1, 'Name is required'),

  symbol: assetScheme.shape.symbol,
  units: z.number().positive(),

  capitalInvested: z.number().positive(),
  buyInPrice: z.number().positive(),

  opened: z.coerce.date(),

  currentPosition: z.number().positive(),
  currentPrice: assetScheme.shape.price,

  profitLossCurrency: z.number(),
  profitLossPercent: z.number(),
});

export const createPositionScheme = positionScheme.omit({
  icon: true,
  capitalInvested: true,
  currentPosition: true,
  profitLossCurrency: true,
  profitLossPercent: true,
});

export type CreatePositionType = Position;
// z.TypeOf<typeof createPositionScheme>;

export type PositionWithMarkedData = z.TypeOf<typeof positionScheme>;
