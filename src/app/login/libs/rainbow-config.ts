import '@rainbow-me/rainbowkit/styles.css';
import { palette } from "@/theme/config/palette"
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme as LightTheme,
  // darkTheme as DarkTheme,
  Theme
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { SimplePaletteColorOptions } from '@mui/material';

export const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [
    alchemyProvider({ apiKey: "process.env.ALCHEMY_ID" }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

const lightTheme = LightTheme({
  overlayBlur: 'small',
  accentColor: (palette.primary as SimplePaletteColorOptions).main,
});

export const theme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    // modalBackground: (palette.primary as SimplePaletteColorOptions).main,
  },
};
