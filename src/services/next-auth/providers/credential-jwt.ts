import CredentialsProvider from 'next-auth/providers/credentials';

import getDecryptedData from '../libs/get-decrypted-data';

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
    const data = await getDecryptedData(token, privateKey);
    return {
      token,
      privateKey,
      data,
    };
  },
});

export default credentialJwt;
