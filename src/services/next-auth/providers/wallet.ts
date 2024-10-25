import CredentialsProvider, {
  CredentialInput,
} from 'next-auth/providers/credentials';

import { AuthRequest } from '@/services/api/models';

import getMe from '../libs/get-me';
import loginWallet from '../libs/login-wallet';

const walletCredentials = CredentialsProvider<
  Record<keyof AuthRequest, CredentialInput>
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
    const { token } = await loginWallet(credentials);
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

export default walletCredentials;
