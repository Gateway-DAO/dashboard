import { PropsWithChildren } from 'react';

import { WalletProvider } from '@suiet/wallet-kit';

import '@suiet/wallet-kit/style.css';

export default function SuiProvider({ children }: PropsWithChildren) {
  return <WalletProvider>{children}</WalletProvider>;
}
