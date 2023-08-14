import { NextAuthOptions } from 'next-auth';

import jwt from 'jsonwebtoken';

import { SessionToken } from '../../types/user';
import { hasuraPublicService } from '../hasura/api';
import credentialEmail from './providers/credential-email';
import credentialWallet from './providers/credential-wallet';

const callRefresh = async (token: SessionToken): Promise<SessionToken> => {
  try {
    const res = await hasuraPublicService.refresh({
      refresh_token: token.refresh_token,
    });

    const { error } = (res as any) ?? {};

    if (error || !res.protocol.refreshToken) {
      throw error;
    }

    const newToken = res.protocol.refreshToken;

    return newToken;
  } catch (e) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

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

      if (parsedToken.exp < Date.now() / 1000) {
        const refreshedToken = await callRefresh(token);
        return refreshedToken;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        ...(token.error && { error: token.error }),
        ...(token ?? {}),
      };
    },
  },
};
