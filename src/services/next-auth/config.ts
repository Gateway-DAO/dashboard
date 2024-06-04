import { NextAuthOptions } from 'next-auth';

import routes from '@/constants/routes';
import { LoginSessionV3 } from '@/types/user';

import getMe from './libs/get-me';
import credentialJwt from './providers/credential-jwt';

export const nextAuthConfig: NextAuthOptions = {
  providers: [credentialJwt],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // We're retrieving the token from the provider
      if (user) {
        token = user as LoginSessionV3;
      }
      return token;
    },
    async session({ session, token }) {
      const user = await getMe(token.token);
      return {
        ...session,
        user,
        token: token.token,
        privateKey: token.privateKey,
        data: token.data,
      } as any;
    },
  },
  pages: {
    signIn: routes.login,
  },
};
