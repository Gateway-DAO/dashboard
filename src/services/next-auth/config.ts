import { getServerSession, NextAuthOptions } from 'next-auth';

import routes from '@/constants/routes';

import { Account } from '../api/models';
import getMe from './libs/get-me';
import newUserCredential from './providers/new-user';
import walletCredentials from './providers/wallet';

const parseToken = (
  token: string
): {
  did: string;
  wallet_address: string;
  exp: string;
} => {
  const splittedToken = token.split('.')?.[1];
  if (!splittedToken) {
    throw new Error('Invalid token');
  }
  const decodedJwt = JSON.parse(
    Buffer.from(token.split('.')?.[1] ?? '', 'base64').toString()
  );
  return decodedJwt;
};

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
        const decodedJwt = parseToken(token.token);
        token.wallet_address = decodedJwt.wallet_address;
      }
      if (trigger === 'update') {
        if (session.user) {
          token.user = {
            ...token.user,
            ...session.user,
          };
        }

        if (process.env.NODE_ENV === 'development' && session.token) {
          token.token = session.token;
        }
      }
      return token;
    },
    async session({ session, token }) {
      const user = await getMe(token.token);
      session.user = user;
      session.token = token.token;
      session.wallet_address = token.wallet_address;
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
