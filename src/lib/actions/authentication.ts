'use server';

import { createUser } from '@/lib/schemes/user.scheme';
import { hashPassword } from '@/lib/utils';
import prisma from '~/db';

export type State = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: null | string;
};

export async function register(prevState: State, formData: FormData) {
  try {
    const validatedFields = createUser.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Invalid data. Failed to Create User.',
      };
    }
    const { email, password } = validatedFields.data;
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedFields.data.email },
    });
    if (existingUser) {
      return { message: 'User already exists.' };
    }
    const hashedPassword = await hashPassword(password);

    const newUser = {
      email,
      password: hashedPassword,
    };

    await prisma.user.create({ data: newUser }).catch((e) => console.log(e));

    return { message: 'Created User!' };
  } catch (error) {
    return { message: 'Database Error: Failed to Create User.' };
  }
}
