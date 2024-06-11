'use client';

import { ThemeProvider } from '@/theme';

import Header from '../components/header';
import LandingFooter from '../components/landing-footer/landing-footer';
import { HeaderContextProvider } from '../contexts/header-context';
import Cta from '../home/components/cta';
import Investors from '../home/components/investors';

export default function EcosystemPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <HeaderContextProvider initialVariant="dark">
        <Header />
        {children}
        <Cta />
        <Investors />
        <LandingFooter variant="dark" />
      </HeaderContextProvider>
    </ThemeProvider>
  );
}
