import { NextAuthOptions } from 'next-auth';

import routes from '@/constants/routes';

import { AuthResponse } from '../api/models';
import getMe from './libs/get-me';
import newUserCredential from './providers/new-user';
import walletCredentials from './providers/wallet';

export const nextAuthConfig: NextAuthOptions = {
  providers: [walletCredentials, newUserCredential],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, ...props }) {
      console.log({ user, token, ...props });
      // We're retrieving the token from the provider
      if (user) {
        token = user as AuthResponse;
      }

      // TODO: Implement refresh token

      return token;
    },
    async session({ session, token }) {
      const user = await getMe(token.token);
      return {
        ...session,
        user,
      };
    },
  },
  pages: {
    signIn: routes.home,
  },
};
