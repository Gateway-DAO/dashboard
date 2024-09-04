import createClient from 'openapi-react-query';

import { api } from './api';
export { getAuthHeader } from './api';

export const clientApi = createClient(api);
