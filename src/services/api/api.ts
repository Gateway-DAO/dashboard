import createFetchClient from 'openapi-fetch';

import type { paths } from './types';

type PathsWithoutParameters = {
  [K in keyof paths]: {
    [M in keyof paths[K]]: Omit<paths[K][M], 'parameters'>;
  };
};

// create another type called pathsWithoutAuth, which removes {[path]: {[post/get/put/delete/pacth]: {parameters}}} from path type

export const api = createFetchClient<PathsWithoutParameters>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});

export const authApi = (token: string) =>
  createFetchClient<PathsWithoutParameters>({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    mode: 'no-cors',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
