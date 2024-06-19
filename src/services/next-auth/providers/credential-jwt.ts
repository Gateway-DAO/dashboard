import CredentialsProvider from 'next-auth/providers/credentials';

import getMe from '../libs/get-me';

const credentialJwt = CredentialsProvider({
  id: 'credential-jwt',
  credentials: {
    token: {
      label: 'token',
      type: 'text',
    },
    privateKey: {
      label: 'privateKey',
      type: 'text',
    },
  },
  async authorize(credentials) {
    if (!credentials?.token || !credentials?.privateKey) {
      return null;
    }
    const { token, privateKey } = credentials;
    //TODO: Temporary solution to validate the token during login
    const { me: user, ...protocolV3Data } = await getMe(token);
    return {
      ...protocolV3Data,
      user,
      token,
      privateKey,
      injectData: {
        pdas: [],
        shared: [],
      },
    };
  },
});

export default credentialJwt;
