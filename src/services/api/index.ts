import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';

import type { paths } from './types.ts';

const fetchClient = createFetchClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});

const api = createClient(fetchClient);

export default api;
