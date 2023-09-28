'use client';

import { useEffect } from 'react';

import Footer from './components/footer';
import Header from './components/header';
import { HeaderContextProvider } from './contexts/header-context';
import Hero from './home/components/hero';
import Info from './home/components/info';
import Investors from './home/components/investors';
import Lifecycle from './home/components/lifecycle';
import OurNetwork from './home/components/our-network';
import OurProtocol from './home/components/our-protocol';
import Pdas from './home/components/pdas';
import Stats from './home/components/stats';
import LenisManager from './utils/scroll';

export default function IndexPage() {
  LenisManager;

  useEffect(() => {
    document.documentElement.setAttribute('class', 'lenis lenis-smooth');
  }, []);

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
      <Footer variant="dark" />
    </HeaderContextProvider>
  );
}
