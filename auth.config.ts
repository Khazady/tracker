import type { NextAuthConfig } from 'next-auth';

const protectedPages = ['dashboard', 'portfolio', 'settings', 'profile'];

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtected = protectedPages.some((page) =>
        nextUrl.pathname.startsWith(`/${page}`),
      );
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      const isOnRegister = nextUrl.pathname.startsWith('/register');
      if (isOnProtected) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        if (isOnLogin || isOnRegister) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
      }
      return true;
    },
    session: async ({ session, token, trigger }) => {
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
  providers: [], // Add providers in auth.ts
} satisfies NextAuthConfig;
