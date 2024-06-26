'use server';

import { getPosition, updatePosition } from '@/lib/actions/position';
import prisma from '@/lib/db';
import {
  createPositionScheme,
  CreatePositionType,
} from '@/lib/schemes/position.scheme';
import { Position, Transaction, TransactionType } from '@prisma/client';
import { auth } from 'auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type State = {
  message?: string;
  errors?: {
    name?: string[];
    units?: string[];
    buyInPrice?: string[];
    opened?: string[];
  };
};

type NonFormValues = {
  symbol: CreatePositionType['symbol'];
  assetId: CreatePositionType['assetId'];
  icon: CreatePositionType['icon'];
};

export async function createTransaction(
  nonFormValues: NonFormValues,
  prevState: State,
  formData: FormData,
) {
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

      symbol: nonFormValues.symbol,
      assetId: nonFormValues.assetId,
      icon: nonFormValues.icon,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
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
    revalidatePath('/portfolio', 'page');
    redirect('/portfolio');
    // return { message: 'Transaction created.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Create Transaction.' };
  }
}

export type TransactionWithPosition = Transaction & {
  position: Position;
};
export async function getAllTransactions(): Promise<TransactionWithPosition[]> {
  try {
    return await prisma.transaction.findMany({ include: { position: true } });
  } catch (error) {
    throw new Error('Failed to fetch portfolio positions.');
  }
}
