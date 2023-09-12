'use client';
import './styles/global.scss';

import Header from './components/header';
import { HeaderContextProvider } from './contexts/header-context';
import Hero from './home/components/hero';
import Info from './home/components/info';
import Lifecycle from './home/components/lifecycle';
import OurProtocol from './home/components/our-protocol';
import Pdas from './home/components/pdas';
import LenisManager from './utils/scroll';

export default function IndexPage() {
  LenisManager;

  return (
    <HeaderContextProvider>
      <Header />
      <Hero />
      <Pdas />
      <Lifecycle />
      <Info />
      <OurProtocol />
    </HeaderContextProvider>
  );
}
