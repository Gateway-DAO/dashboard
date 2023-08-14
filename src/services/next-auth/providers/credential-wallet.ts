import CredentialsProvider from 'next-auth/providers/credentials';

import { hasuraPublicService } from '@/services/hasura/api';
import { SessionToken } from '@/types/user';

const loginWallet = async (
  signature: string,
  wallet: string
): Promise<SessionToken> => {
  try {
    const res = await hasuraPublicService.login_wallet({
      signature,
      wallet,
    });

    const { error } = (res as any) ?? {};

    if (error || !res.protocol.loginWallet) {
      return null;
    }

    const token = res.protocol.loginWallet;

    return token;
  } catch (e) {
    throw new Error(e);
  }
};

const credentialWallet = CredentialsProvider({
  id: 'credential-wallet',
  credentials: {
    wallet: {
      label: 'wallet',
      type: 'text',
      placeholder: '0x0',
    },
    signature: {
      label: 'signature',
      type: 'text',
      placeholder: '0x0',
    },
  },
  async authorize(credentials) {
    return loginWallet(credentials.signature, credentials.wallet);
  },
});

export default credentialWallet;
