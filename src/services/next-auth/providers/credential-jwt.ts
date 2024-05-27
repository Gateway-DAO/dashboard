import CredentialsProvider from 'next-auth/providers/credentials';

const credentialJwt = CredentialsProvider({
  id: 'credential-jwt',
  credentials: {
    jwt: {
      label: 'jwt',
      type: 'text',
    },
  },
  authorize(credentials) {
    if (!credentials?.jwt) {
      return null;
    }
    return {
      protocol_id: '1234',
      refresh_token: '1234',
      token: credentials.jwt,
    };
  },
});

export default credentialJwt;
