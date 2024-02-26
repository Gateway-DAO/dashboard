'use client';

import Header from './components/header';
import LandingFooter from './components/landing-footer/landing-footer';
import { HeaderContextProvider } from './contexts/header-context';
import Hero from './home/components/hero';
import ForUsers from './home/components/for-users';
import ForBusiness from './home/components/for-business';
import ForDevelopers from './home/components/for-developers';
import Investors from './home/components/investors';
import Stats from './home/components/stats';

export default function IndexPage() {
  return (
    <HeaderContextProvider>
      <Header />
      <Hero />
      <ForUsers />
      <ForBusiness />
      <ForDevelopers />
      <Stats />
      <Investors />
      <LandingFooter variant="dark" />
    </HeaderContextProvider>
  );
}
