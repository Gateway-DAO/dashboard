import { NextAuthOptions } from 'next-auth';

import routes from '@/constants/routes';
import { LoginSessionV3 } from '@/types/user';

import getDecryptedData, { hasDecryptedData } from './libs/get-decrypted-data';
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
      const { me: user, ...protocolV3Data } = await getMe(token.token);
      await hasDecryptedData(token.token, token.privateKey);
      return {
        ...session,
        ...token,
        ...protocolV3Data,
        user,
      } as any;
    },
  },
  pages: {
    signIn: routes.login,
  },
};
