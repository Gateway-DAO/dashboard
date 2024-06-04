import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

import { OrganizationRole } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

export const session: PartialDeep<Session> = {
  token: '12345',
  privateKey: '12345',
  user: {
    id: '12345',
    username: 'carl',
    accesses: [
      {
        organization: {
          did: '12345',
          name: 'gateway',
          image: '',
          usernameUpdatedAt: '',
          verified: true,
        },
        role: OrganizationRole.Admin,
      },
    ],
  },
};

export const MockSession = ({ children }: PropsWithChildren) => (
  <SessionProvider session={session as Session}>{children}</SessionProvider>
);
