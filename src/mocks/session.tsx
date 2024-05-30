import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

import { OrganizationRole } from '@/services/protocol/types';

export const session: Session = {
  token: '12345',
  privateKey: '12345',
  user: {
    id: '12345',
    username: 'carl',
    usernameLastUpdated: null,
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
  <SessionProvider session={session}>{children}</SessionProvider>
);
