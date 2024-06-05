/* REASON: Import needs to exists so typescript can merge definitions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* REASON: We can only override interfaces like this */
/* eslint-disable @typescript-eslint/no-empty-interface */
import NextAuth, { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { LoginSessionV3, SessionV3 } from './user';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  type User = LoginSessionV3;
  type Session = SessionV3;
  type DefaultSession = SessionV3;
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  type DefaultJWT = LoginSessionV3;
  type JWT = LoginSessionV3;
  async function getToken(options: {
    req: NextApiRequest;
    secret: string;
  }): LoginSessionV3 | null;
}
