import createFetchClient from 'openapi-fetch';

import type { paths } from './types';

export const api = createFetchClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  mode: 'no-cors',
});
