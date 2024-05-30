import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

import { GraphQLClient } from 'graphql-request';

import { getGtwServerSession } from '../next-auth/get-gtw-server-session';
import { getSdk } from './types';

export type Api = ReturnType<typeof getSdk>;

const headers = {
  'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
};

export const tokenHeader = (token?: string) => ({
  ...headers,
  ...(token && userHeader(token)),
});

const glqAnonClient = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_API_V3_ENDPOINT}/graphql`,
  {
    headers,
  }
);

export const apiPublic = getSdk(glqAnonClient);

export const userHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

const gqlClient = (token: string) =>
  new GraphQLClient(`${process.env.NEXT_PUBLIC_API_V3_ENDPOINT}/graphql`, {
    headers: tokenHeader(token),
  });

export const api = (token: string) => getSdk(gqlClient(token));

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
