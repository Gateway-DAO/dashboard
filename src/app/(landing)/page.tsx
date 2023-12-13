'use client';

import Header from './components/header';
import LandingFooter from './components/landing-footer/landing-footer';
import { HeaderContextProvider } from './contexts/header-context';
import Hero from './home/components/hero';
import Info from './home/components/info';
import Investors from './home/components/investors';
import Lifecycle from './home/components/lifecycle';
import OurNetwork from './home/components/our-network';
import OurProtocol from './home/components/our-protocol';
import Pdas from './home/components/pdas';
import Stats from './home/components/stats';

export default function IndexPage() {
  return (
    <HeaderContextProvider>
      <Header />
      <Hero />
      <Pdas />
      <Lifecycle />
      <Info />
      <OurProtocol />
      <OurNetwork />
      <Stats />
      <Investors />
      <LandingFooter variant="dark" />
    </HeaderContextProvider>
  );
}
