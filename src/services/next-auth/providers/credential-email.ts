import CredentialsProvider from 'next-auth/providers/credentials';

import loginEmail from '../libs/login-email';

const credentialEmail = CredentialsProvider({
  id: 'credential-email',
  credentials: {
    email: {
      label: 'email',
      type: 'text',
      placeholder: 'john@example.com',
    },
    code: {
      label: 'code',
      type: 'text',
      placeholder: '1234',
    },
  },
  async authorize(credentials) {
    return loginEmail(credentials!.email, parseInt(credentials!.code, 10));
  },
});

export default credentialEmail;
