'use client';

import Header from './components/header';
import LandingFooter from './components/landing-footer/landing-footer';
import { HeaderContextProvider } from './contexts/header-context';
import Cta from './home/components/cta';
import ForBusiness from './home/components/for-business';
import ForDevelopers from './home/components/for-developers';
import ForUsers from './home/components/for-users';
import Hero from './home/components/hero';
import Investors from './home/components/investors';
import Stats from './home/components/stats';
import UseCases from './home/components/use-cases';

export default function IndexPage() {
  return (
    <HeaderContextProvider>
      <Header />
      <Hero />
      <ForUsers />
      <ForBusiness />
      <UseCases />
      <ForDevelopers />
      <Stats />
      <Cta />
      <Investors />
      <LandingFooter variant="dark" />
    </HeaderContextProvider>
  );
}
