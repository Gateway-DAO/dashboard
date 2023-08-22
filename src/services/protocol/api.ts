import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

import { GraphQLClient } from 'graphql-request';

import { getSdk, SdkFunctionWrapper } from './types';

export type Api = ReturnType<typeof getSdk>;

const headers = {
  'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
}

const glqAnonClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_API_ENDPOINT as string,
  {
    headers
  }
);

export const apiPublic = getSdk(glqAnonClient);

export const userHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

const gqlClient = (token?: string) =>
  new GraphQLClient(process.env.NEXT_PUBLIC__ENDPOINT as string, {
    headers: {
      ...headers,
      ...(token ? userHeader(token) : {}),
    }
  });

export const api = (token: string) =>
  getSdk(gqlClient(token));

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
