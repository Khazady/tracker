'use server';

import prisma from '@/lib/db';
import {
  updateUserProfileScheme,
  updateUserSettingsScheme,
} from '@/lib/schemes/user.scheme';
import { auth } from 'auth';
import s3 from '../s3';

export async function getUser(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export type ProfileState = {
  message?: string;
  errors?: {
    name?: string[];
    image?: string[];
  };
};

export type SettingsState = {
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
};

export async function updateUserProfile(
  prevState: ProfileState,
  formData: FormData,
) {
  const validatedFields = updateUserProfileScheme.safeParse({
    name: formData.get('name'),
    image: formData.get('image'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid data. Failed to Update User.',
    };
  }
  const { name, image } = validatedFields.data;

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { message: 'You must be signed in to perform this action' };
    }

    const extension = image.name.split('.').pop();
    const uniqueIdentifier = crypto.randomUUID();
    const fileName = `${name}-${uniqueIdentifier}.${extension}`;
    const bufferedImage = await image.arrayBuffer();

    s3.putObject({
      Bucket: 'khazady-tracker-bucket',
      Key: fileName,
      Body: Buffer.from(bufferedImage),
      ContentType: image.type,
    });

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
        image: fileName,
      },
    });
    return { message: 'User updated successfully' };
  } catch (error) {
    throw new Error('Failed to update user.');
  }
}

export async function updateUserSettings(
  prevState: SettingsState,
  formData: FormData,
) {
  const validatedFields = updateUserSettingsScheme.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid data. Failed to Update User.',
    };
  }
  const { email, password } = validatedFields.data;

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { message: 'You must be signed in to perform this action' };
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        email,
        password,
      },
    });
    return { message: 'User updated successfully' };
  } catch (error) {
    throw new Error('Failed to update user.');
  }
}
