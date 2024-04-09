import { Position } from '@prisma/client';
import { z } from 'zod';

export const positionScheme = z.object({
  assetId: z.string(),

  icon: z.string().url().optional(),
  name: z.string().min(1, 'Name is required'),

  symbol: z.string(),
  units: z.number().positive(),

  capitalInvested: z.number().positive(),
  buyInPrice: z.number().positive(),

  opened: z.coerce.date(),

  currentPosition: z.number(),

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
