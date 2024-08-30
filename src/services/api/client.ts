import createClient from 'openapi-react-query';

import { api } from './api';
export { createAuthHeader } from './api';

export const clientApi = createClient(api);
