'use server';

import { getPosition, State, updatePosition } from '@/lib/actions/position';
import prisma from '@/lib/db';
import { createPositionScheme } from '@/lib/schemes/position.scheme';
import { TransactionType } from '@prisma/client';
import { auth } from 'auth';

export async function createTransaction(prevState: State, formData: FormData) {
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

    const newTransaction = {
      transactionType: TransactionType.BUY, // todo: add input later
      units: validatedFields.data.units,
      buyInPrice: validatedFields.data.buyInPrice,
      timestamp: validatedFields.data.opened,
    };

    const existingPosition = await getPosition(validatedFields.data.assetId);

    if (existingPosition) {
      // Create transaction and update existing position
      await prisma.transaction.create({
        data: {
          ...newTransaction,
          position: {
            connect: {
              id: existingPosition.id,
            },
          },
        },
      });
      await updatePosition(existingPosition, newPosition);
    } else {
      // Create transaction and create new position
      await prisma.transaction.create({
        data: {
          ...newTransaction,
          position: {
            create: newPosition,
          },
        },
      });
    }

    return { message: 'Transaction created.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Create Transaction.' };
  }
}
