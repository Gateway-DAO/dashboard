'use client';
import './styles/global.scss';
import { useEffect } from 'react';

import gsap from 'gsap';
import Flip from 'gsap/dist/Flip';

import Header from './components/header';
import Hero from './home/components/hero';
import Lifecycle from './home/components/lifecycle';
import Pdas from './home/components/pdas';
import LenisManager from './utils/scroll';

export default function IndexPage() {
  LenisManager;

  useEffect(() => {
    gsap.registerPlugin(Flip);
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <Pdas />
      <Lifecycle />
    </>
  );
}
