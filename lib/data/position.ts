import { Position } from '@prisma/client';

export function calculateNewBuyInPrice(
  existingPosition: Position,
  newPosition: Omit<Position, 'id'>,
) {
  const capitalInvested = calculateCapitalInvested(
    existingPosition.buyInPrice,
    existingPosition.units,
  );
  const newCapitalInvested = calculateCapitalInvested(
    newPosition.buyInPrice,
    newPosition.units,
  );
  const totalUnits = existingPosition.units + newPosition.units;
  return (capitalInvested + newCapitalInvested) / totalUnits;
}

export function calculateCapitalInvested(buyInPrice: number, units: number) {
  return buyInPrice * units;
}

export function calculateCurrentPosition(currentPrice: number, units: number) {
  return currentPrice * units;
}

export function calculateProfitLossCurrency(
  currentPosition: number,
  capitalInvested: number,
) {
  return currentPosition - capitalInvested;
}

export function calculateProfitLossPercent(
  profitLossCurrency: number,
  capitalInvested: number,
) {
  return (profitLossCurrency / capitalInvested) * 100;
}

export const calculatePositionFields = ({
  buyInPrice,
  current_price,
  units,
}: {
  buyInPrice: number;
  current_price: number;
  units: number;
}) => {
  const capitalInvested = calculateCapitalInvested(buyInPrice, units);
  const currentPosition = calculateCurrentPosition(current_price, units);
  const profitLossCurrency = calculateProfitLossCurrency(
    currentPosition,
    capitalInvested,
  );
  return {
    capitalInvested,
    currentPosition,
    profitLossCurrency,
    profitLossPercent: calculateProfitLossPercent(
      profitLossCurrency,
      capitalInvested,
    ),
  };
};
