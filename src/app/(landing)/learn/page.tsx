'use client';

import { HeaderContextProvider } from '@/app/(landing)/contexts/header-context';
import LenisManager from '@/app/(landing)/utils/scroll';

import Header from '../components/header';
import Hero from './components/hero';

export default function BuildPage() {
  LenisManager;

  return (
    <HeaderContextProvider>
      <Header />
      <Hero />
    </HeaderContextProvider>
  );
}
