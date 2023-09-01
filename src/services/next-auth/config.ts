import { NextAuthOptions } from 'next-auth';

import routes from '@/constants/routes';
import { SessionToken } from '@/types/user';
import jwt from 'jsonwebtoken';

import getMe from './libs/get-me';
import refreshToken from './libs/refresh-token';
import credentialEmail from './providers/credential-email';
import credentialWallet from './providers/credential-wallet';

export const nextAuthConfig: NextAuthOptions = {
  providers: [credentialEmail, credentialWallet],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // We're retrieving the token from the provider
      if (user) {
        token = user as SessionToken;
      }

      const parsedToken = jwt.decode(token.token, { json: true });

      if (parsedToken!.exp! < Date.now() / 1000) {
        const refreshedToken = await refreshToken(token);
        return refreshedToken;
      }
      return token;
    },
    async session({ session, token }) {
      const user = await getMe(token.token);
      return {
        ...session,
        ...(token.error && { error: token.error }),
        ...(token ?? {}),
        user,
      };
    },
  },
  pages: {
    signIn: routes.auth,
  },
};
