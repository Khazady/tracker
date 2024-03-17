import { getUser } from '@/lib/data/user';
import prisma from '@/lib/db';
import { loginUser } from '@/lib/schemes/user.scheme';
import { verifyPassword } from '@/lib/utils';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = loginUser.safeParse(credentials);
        if (validatedCredentials.success) {
          const { email, password } = validatedCredentials.data;
          const existingUser = await getUser(email);
          if (!existingUser) return null;

          const isValid = await verifyPassword(password, existingUser.password);
          if (isValid) return existingUser;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
