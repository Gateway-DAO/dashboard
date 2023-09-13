'use client';
import './styles/global.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    </HeaderContextProvider>
  );
}
