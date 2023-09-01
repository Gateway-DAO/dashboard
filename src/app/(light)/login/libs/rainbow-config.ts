"use client";
import '@rainbow-me/rainbowkit/styles.css';
import { brandColors } from '@/theme/config/brand';
import {
  getDefaultWallets,
  lightTheme as LightTheme,
  // darkTheme as DarkTheme,
  Theme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [alchemyProvider({ apiKey: 'process.env.ALCHEMY_ID' }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Gateway Network',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});

const lightTheme = LightTheme({
  overlayBlur: 'small',
  accentColor: brandColors.primary,
});

export const theme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    // modalBackground: (palette.primary as SimplePaletteColorOptions).main,
  },
};
