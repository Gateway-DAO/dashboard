import { NextAuthOptions } from 'next-auth';

import routes from '@/constants/routes';
import { SessionUpdate } from '@/types/session';
import { LoginSessionV3, SessionV3 } from '@/types/user';

import getDecryptedData from './libs/get-decrypted-data';
import getMe from './libs/get-me';
import credentialJwt from './providers/credential-jwt';

export const nextAuthConfig: NextAuthOptions = {
  providers: [credentialJwt],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 1 hour
  },
  jwt: {
    maxAge: 60 * 60, // 1 hour
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // We're retrieving the token from the provider
      if (user) {
        token = user as LoginSessionV3;
      }

      if (trigger === 'update' && token && session?.type) {
        const sessionUpdate: SessionUpdate = session;
        if (!token.injectData) {
          token.injectData = { pdas: [], shared: [] };
        }

        switch (sessionUpdate?.type) {
          case 'pdas':
            token.injectData.pdas = [
              ...sessionUpdate.pdas,
              ...token.injectData.pdas,
            ];
            break;
          case 'shared':
            token.injectData.shared = [
              ...sessionUpdate.pdas,
              ...token.injectData.shared,
            ];
            break;
          default:
            break;
        }
      }
      return token;
    },
    async session({ session, token }) {
      try {
        const { me: user, ...protocolV3Data } = await getMe(token.token);
        const data = await getDecryptedData(token.token, token.privateKey);
        return {
          ...session,
          ...token,
          ...protocolV3Data,
          ...data,
          ...(token.injectData?.pdas && {
            pdas: [...token.injectData?.pdas, ...data.pdas],
          }),
          ...(token.injectData?.shared && {
            shared: [...token.injectData?.shared, ...data.shared],
          }),
          user,
        } satisfies SessionV3 as any;
      } catch (e) {
        console.error('Error on get session', e);
        throw e;
      }
    },
  },
  pages: {
    signIn: routes.login,
  },
};
