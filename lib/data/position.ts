import { Position } from '@prisma/client';

export function calculateNewBuyInPrice(
  existingPosition: Position,
  newPosition: Omit<Position, 'id'>,
) {
  const invested = existingPosition.buyInPrice * existingPosition.units;
  const currentInvestment = newPosition.buyInPrice * newPosition.units;
  const totalUnits = existingPosition.units + newPosition.units;
  return (invested + currentInvestment) / totalUnits;
}
