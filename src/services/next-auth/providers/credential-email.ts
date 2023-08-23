import CredentialsProvider from 'next-auth/providers/credentials';

import { apiPublic } from '@/services/protocol/api';
import { SessionToken } from '@/types/user';

const loginEmail = async (
  email: string,
  code: number
): Promise<SessionToken | null> => {
  try {
    const res = await apiPublic.login_email({
      email,
      code,
    });

    const { error } = (res as any) ?? {};

    if(error) {
      throw new Error(error);
    }

    if (error || !res.loginEmail) {
      throw new Error("Couldn't login");
    }

    const token = res.loginEmail;

    return token;
  } catch (error: any) {
    throw new Error(error);
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
    return loginEmail(credentials!.email, parseInt(credentials!.code, 10));
  },
});

export default credentialEmail;
