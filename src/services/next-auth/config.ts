import { NextAuthOptions } from 'next-auth';

import routes from '@/constants/routes';
import jwt from 'jsonwebtoken';

import { AuthResponse } from '../api/models';
import getMe from './libs/get-me';
import credentialWallet from './providers/credential-wallet';

export const nextAuthConfig: NextAuthOptions = {
  providers: [credentialWallet],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      user;
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
