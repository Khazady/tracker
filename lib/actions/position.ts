'use server';

import { calculateNewBuyInPrice } from '@/lib/data/position';
import prisma from '@/lib/db';
import {
  createPositionScheme,
  CreatePositionType,
} from '@/lib/schemes/position.scheme';
import { Position } from '@prisma/client';
import { auth } from 'auth';

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

export async function createPosition(prevState: State, formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { message: 'You must be signed in to perform this action' };
    }

    const validatedFields = createPositionScheme.safeParse({
      name: formData.get('name'),
      units: Number(formData.get('units')),
      buyInPrice: Number(formData.get('buyInPrice')),
      opened: formData.get('opened'),

      symbol: prevState.symbol,
      assetId: prevState.assetId,
    });
    if (!validatedFields.success) {
      return {
        // errors: validatedFields.error.flatten().fieldErrors,
        message: 'Invalid data. Failed to Create Position.',
      };
    }

    const newPosition = { ...validatedFields.data, ownerId: session.user.id };

    const existingPosition = await getPosition(validatedFields.data.assetId);
    if (existingPosition) {
      const totalUnits = existingPosition.units + validatedFields.data.units;
      const newBuyInPrice = calculateNewBuyInPrice(
        existingPosition,
        newPosition,
      );
      const response = await prisma.position.update({
        where: { assetId: existingPosition.assetId },
        data: {
          units: totalUnits,
          buyInPrice: newBuyInPrice,
        },
      });
      console.log(response, 'adjusted');
      return { message: 'Position adjusted.' };
    }
    const response = await prisma.position.create({ data: newPosition });
    //todo: connect user model with new posts also (connect query)

    console.log(response, 'created');

    return { message: 'Position created.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Create Position.' };
  }
}
