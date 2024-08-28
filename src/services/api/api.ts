import createFetchClient from 'openapi-fetch';

import type { paths } from './types';

export const createAuthHeader = (token?: string) => ({
  Authorization: `Bearer ${token}`,
});

export const api = createFetchClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});

export const authApi = (token: string) =>
  createFetchClient<paths>({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    mode: 'no-cors',
    headers: {
      ...createAuthHeader(token),
    },
  });
