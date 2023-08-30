import { getServerSession as nextAuthGetServerSession } from 'next-auth';

import { nextAuthConfig } from './config';

export const getServerSession = () => nextAuthGetServerSession(nextAuthConfig);
