import CredentialsProvider from 'next-auth/providers/credentials';

import loginWallet from '../libs/login-wallet';

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
    publicKey: {
      label: 'signature',
      type: 'text',
      placeholder: '0x0',
    },
  },
  async authorize(credentials) {
    return loginWallet(
      credentials!.signature,
      credentials!.wallet,
      credentials?.publicKey
    );
  },
});

export default credentialWallet;
