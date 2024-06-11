import { NextRequest } from 'next/server';

import authenticatedMiddleware, {
  authenticatedMatcher,
} from './middlewares/authenticated';

export default async function middleware(req: NextRequest) {
  if (req.url.match(authenticatedMatcher)) {
    return (authenticatedMiddleware as any)(req);
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
