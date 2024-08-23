/* REASON: Import needs to exists so typescript can merge definitions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* REASON: We can only override interfaces like this */
/* eslint-disable @typescript-eslint/no-empty-interface */
import NextAuth, { Session, User, AdapterUser, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { TokenResponse, Account } from '@/services/api/models';

declare module 'next-auth' {
  interface Session {
    user: Account;
    token: string;
  }

  interface User extends Account, TokenResponse {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    token: string;
    user: Account;
  }
}
