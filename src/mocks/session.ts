import { Session } from 'next-auth';

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
    accesses: null,
  },
};
