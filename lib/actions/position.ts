'use server';

import { calculateNewBuyInPrice } from '@/lib/data/position';
import prisma from '@/lib/db';
import { CreatePositionType } from '@/lib/schemes/position.scheme';
import { Position } from '@prisma/client';

export type State = {
  message: string;
  symbol: CreatePositionType['symbol'];
  assetId: CreatePositionType['assetId'];
};

export async function getPosition(assetId: Position['assetId']) {
  try {
    return await prisma.position.findUnique({
      where: { assetId },
    });
  } catch (error) {
    throw new Error('Failed to fetch position.');
  }
}

export async function getAllPositions(): Promise<Position[]> {
  try {
    return await prisma.position.findMany();
  } catch (error) {
    throw new Error('Failed to fetch portfolio positions.');
  }
}

export async function updatePosition(
  existingPosition: Position,
  newPosition: Omit<Position, 'id'>,
) {
  const summarizedUnits = existingPosition.units + newPosition.units;
  const calculatedBuyInPrice = calculateNewBuyInPrice(
    existingPosition,
    newPosition,
  );
  const opened =
    newPosition.opened < existingPosition.opened
      ? newPosition.opened
      : existingPosition.opened;

  try {
    return await prisma.position.update({
      where: { id: existingPosition.id },
      data: {
        units: summarizedUnits,
        buyInPrice: calculatedBuyInPrice,
        opened,
      },
    });
  } catch (error) {
    throw new Error('Failed to fetch position.');
  }
}
