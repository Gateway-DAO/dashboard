import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

import { GraphQLClient } from 'graphql-request';

import { getGtwServerSession } from '../next-auth/get-gtw-server-session';
import { getSdk, SdkFunctionWrapper } from './types';

export type Api = ReturnType<typeof getSdk>;

const headers = {
  'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
};

const glqAnonClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_API_ENDPOINT as string,
  {
    headers,
  }
);

export const apiPublic = getSdk(glqAnonClient);

export const userHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

const gqlClient = (token: string) =>
  new GraphQLClient(process.env.NEXT_PUBLIC_API_ENDPOINT as string, {
    headers: {
      ...headers,
      ...(token && userHeader(token)),
    },
  });

export const api = (token: string) => getSdk(gqlClient(token));

export const apiWithRefresh = (
  token: string,
  callback: (session: Session) => void
) => {
  const wrapper: SdkFunctionWrapper = async (action) => {
    try {
      const res = await action();
      return res;
    } catch (error: any) {
      const isExpiredToken =
        error?.response?.errors?.[0].extensions.code === 'invalid-jwt';
      if (isExpiredToken) {
        const session = await getSession();
        await callback(session!);
      }
      throw error;
    }
  };
  return getSdk(gqlClient(token), wrapper);
};

/**
 * Get a private api with authenticated session
 * @param session - if not provided, will try to get a session from the server
 * @returns api with authenticated session
 */
export async function getPrivateApi(session?: Session | null) {
  let propSession = session;
  if (!session) {
    propSession = await getGtwServerSession();
  }
  const token = propSession?.token;
  return api(token ?? '');
}

export async function getClientPrivateApi() {
  const session = await getSession();
  const token = session?.token;
  return api(token ?? '');
}
