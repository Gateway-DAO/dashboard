import CredentialsProvider, {
  CredentialInput,
} from 'next-auth/providers/credentials';

import { components } from '@/services/api/types';

import loginWallet from '../libs/login-wallet';
import newUser from '../libs/new-user';

const newUserCredential = CredentialsProvider<
  Record<
    keyof components['schemas']['model.AccountCreateRequest'],
    CredentialInput
  >
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
    return newUser(credentials);
  },
});

export default newUserCredential;
