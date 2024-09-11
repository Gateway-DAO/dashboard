import { getServerSession, NextAuthOptions } from 'next-auth';

import routes from '@/constants/routes';

import { Account } from '../api/models';
import newUserCredential from './providers/new-user';
import walletCredentials from './providers/wallet';

export const nextAuthConfig: NextAuthOptions = {
  providers: [walletCredentials, newUserCredential],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as Account;
        token.token = (user as any).token;
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token.token;
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: routes.home,
  },
};

export async function getServerComponentSession() {
  const session = await getServerSession(nextAuthConfig);
  return session;
}
