import NextAuth from 'next-auth';

import { nextAuthConfig } from '@/services/next-auth/config';

const handler = NextAuth(nextAuthConfig);

export { handler as GET, handler as POST };
