import CredentialsProvider, {
  CredentialInput,
} from 'next-auth/providers/credentials';

import { components } from '@/services/api/types';

import loginWallet from '../libs/login-wallet';

const walletCredentials = CredentialsProvider<
  Record<keyof components['schemas']['model.AuthRequest'], CredentialInput>
>({
  id: 'authenticate-wallet',
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
  },
  async authorize(credentials) {
    if (
      !credentials?.signature ||
      !credentials?.wallet_address ||
      !credentials?.message
    ) {
      throw new Error('Missing credentials');
    }
    return loginWallet(credentials);
  },
});

export default walletCredentials;
