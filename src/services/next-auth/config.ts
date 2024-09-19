import { getServerSession, NextAuthOptions } from 'next-auth';

import routes from '@/constants/routes';

import { Account } from '../api/models';
import getMe from './libs/get-me';
import newUserCredential from './providers/new-user';
import walletCredentials from './providers/wallet';

export const nextAuthConfig: NextAuthOptions = {
  providers: [walletCredentials, newUserCredential],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user as Account;
        token.token = (user as any).token;
      }
      if (trigger === 'update') {
        token.user = {
          ...token.user,
          ...session,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token.token;
      const user = await getMe(token.token);
      session.user = user;
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
