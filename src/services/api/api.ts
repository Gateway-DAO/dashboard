import createFetchClient from 'openapi-fetch';

import type { paths } from './types';

type RemoveHeaderParams<T> = {
  [K in keyof T]: T[K] extends {
    parameters: infer P;
  }
    ? {
        parameters: P extends {
          header: any;
        }
          ? Omit<P, 'header'> & { header?: never }
          : P;
      } & Omit<T[K], 'parameters'>
    : T[K];
};

type RemoveHeaderParamsFromPaths = {
  [K in keyof paths]: RemoveHeaderParams<paths[K]>;
};
export const getAuthHeader = (token?: string) => ({
  Authorization: `Bearer ${token}`,
});

export const api = createFetchClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});

export const authApi = (token: string) =>
  createFetchClient<RemoveHeaderParamsFromPaths>({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    headers: getAuthHeader(token),
  });
