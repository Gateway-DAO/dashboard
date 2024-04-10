'use client';
import Header from '../components/header';
import LandingFooter from '../components/landing-footer/landing-footer';
import { HeaderContextProvider } from '../contexts/header-context';
import Cta from '../home/components/cta';
import Investors from '../home/components/investors';

export default function Blog({ children }: { children: React.ReactNode }) {
  return (
    <HeaderContextProvider initialVariant="dark">
      <Header />
      
      {children}
      <Cta />
      <Investors />
      <LandingFooter variant="dark" />
    </HeaderContextProvider>
  );
}
