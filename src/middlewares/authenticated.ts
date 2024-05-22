import { withAuth } from 'next-auth/middleware';

import routes from '@/constants/routes';

const authenticatedMiddleware = withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: routes.login,
  },
});

export default authenticatedMiddleware;

export const authenticatedMatcher = '/dashboard/(.*)';
