'use client';
import { PropsWithChildren } from 'react';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { WagmiConfig } from 'wagmi';

import { chains, theme, wagmiConfig } from './rainbow-config';

export default function EvmProvider({ children }: PropsWithChildren) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={theme}
        appInfo={{
          appName: 'Gateway Network',
        }}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
