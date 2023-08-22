"use client";
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';

import { chains, theme, wagmiConfig } from '../libs/rainbow-config';

export default function EvmProvider() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={theme}
        appInfo={{
          appName: 'Gateway DAO',
        }}
      >
        <ConnectButton />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
