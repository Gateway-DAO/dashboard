"use client";
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';

import { chains, theme, wagmiConfig } from '../libs/rainbow-config';

export default function EthConnect() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={theme}>
        <ConnectButton />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
