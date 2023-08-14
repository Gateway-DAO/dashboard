import CredentialsProvider from 'next-auth/providers/credentials';

import { hasuraPublicService } from '@/services/hasura/api';
import { SessionToken } from '@/types/user';

const loginEmail = async (
  email: string,
  code: number
): Promise<SessionToken> => {
  try {
    const res = await hasuraPublicService.login_email({
      email,
      code,
    });

    const { error } = (res as any) ?? {};

    if (error || !res.protocol.loginEmail) {
      return null;
    }

    const token = res.protocol.loginEmail;

    return token;
  } catch (e) {
    throw new Error(e);
  }
};

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
    return loginEmail(credentials.email, parseInt(credentials.code, 10));
  },
});

export default credentialEmail;
