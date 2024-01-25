import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

import { OrganizationRole } from '@/services/protocol/types';

export const session: Session = {
  protocol_id: '12345',
  refresh_token: '12345',
  token: '12345',
  user: {
    id: '12345',
    displayName: 'Carl Terry',
    email: 'carl@terry.com',
    profilePicture: null,
    gatewayId: 'carl',
    authentications: null,
    gatewayIdLastupdate: null,
    accesses: [
      {
        organization: {
          id: '12345',
          name: 'gateway',
          image: '',
          gatewayId: 'gateway',
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
