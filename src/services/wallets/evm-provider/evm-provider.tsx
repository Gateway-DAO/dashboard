'use client';
import { PropsWithChildren } from 'react';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';

import { config, theme } from './rainbow-config';

export default function EvmProvider({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider
        theme={theme}
        appInfo={{
          appName: 'Gateway Network',
        }}
      >
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  );
}
