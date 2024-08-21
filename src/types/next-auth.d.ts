/* REASON: Import needs to exists so typescript can merge definitions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* REASON: We can only override interfaces like this */
/* eslint-disable @typescript-eslint/no-empty-interface */
import NextAuth, { Session, User, AdapterUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { AuthResponse, Account } from '@/services/api/models';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  type User = AuthResponse;
  type AdapterUser = AuthResponse;
  type Session = Account;
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  type DefaultJWT = AuthResponse;
  type JWT = AuthResponse;
}
