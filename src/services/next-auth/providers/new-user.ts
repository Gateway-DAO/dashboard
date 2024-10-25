import CredentialsProvider, {
  CredentialInput,
} from 'next-auth/providers/credentials';

import { AccountCreateRequest } from '@/services/api/models';

import getMe from '../libs/get-me';
import newUser from '../libs/new-user';

const newUserCredential = CredentialsProvider<
  Record<keyof AccountCreateRequest, CredentialInput>
>({
  id: 'new-user',
  credentials: {
    wallet_address: {
      label: 'wallet',
      type: 'text',
      placeholder: '0x0',
    },
    signature: {
      label: 'signature',
      type: 'text',
      placeholder: 'signature',
    },
    message: {
      label: 'message',
      type: 'text',
      placeholder: 'message',
    },
    username: {
      label: 'username',
      type: 'text',
      placeholder: 'username',
    },
  },
  async authorize(credentials) {
    if (
      !credentials?.signature ||
      !credentials?.wallet_address ||
      !credentials?.message ||
      !credentials?.username
    ) {
      throw new Error('Missing new user credentials');
    }
    const { token } = await newUser(credentials);
    if (!token) {
      throw new Error('Can`t generate token');
    }
    const user = await getMe(token);
    return {
      ...user,
      token,
    };
  },
});

export default newUserCredential;
