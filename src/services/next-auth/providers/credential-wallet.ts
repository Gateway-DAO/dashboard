import CredentialsProvider from 'next-auth/providers/credentials';

import { apiPublic } from '@/services/protocol/api';
import { SessionToken } from '@/types/user';

const loginWallet = async (
  signature: string,
  wallet: string
): Promise<SessionToken | null> => {
  try {
    const res = await apiPublic.login_wallet({
      signature,
      wallet,
    });


    const { error } = (res as any) ?? {};

    if(error) {
      throw new Error(error);
    }

    if (error || !res.loginWallet) {
      throw new Error("Couldn't login");
    }

    const token = res.loginWallet;

    return token;
  } catch (error: any) {
    throw new Error(error);
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
    return loginWallet(credentials!.signature, credentials!.wallet);
  },
});

export default credentialWallet;
