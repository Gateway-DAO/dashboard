/* REASON: Import needs to exists so typescript can merge definitions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* REASON: We can only override interfaces like this */
/* eslint-disable @typescript-eslint/no-empty-interface */
import NextAuth, { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { SessionToken, SessionUser, Session as UserSession } from './user';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  type User = SessionToken;
  type Session = UserSession;
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  type DefaultJWT = SessionToken;
  type JWT = SessionToken;
  async function getToken(options: {
    req: NextApiRequest;
    secret: string;
  }): SessionToken | null;
}
