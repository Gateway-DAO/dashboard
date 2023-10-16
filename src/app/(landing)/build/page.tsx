'use client';

import { useEffect } from 'react';

import { HeaderContextProvider } from '@/app/(landing)/contexts/header-context';

import Hero from '../build/components/hero';
import Footer from '../components/footer';
import Header from '../components/header';
import LenisManager from '../utils/scroll';
import TemplateDocsSection from './components/template-docs-section';

export default function BuildPage() {
  useEffect(() => {
    LenisManager?.start();
    return () => {
      LenisManager?.stop();
    };
  }, []);

  return (
    <HeaderContextProvider>
      <Header />
      <Hero />
      <TemplateDocsSection
        title="Become an Issuer"
        button={{
          text: 'Open issuer docs',
          href: '/',
        }}
        cards={[
          {
            title: 'Create Unique Data-Models',
            description: 'Easy create Data models that fits your needs',
            href: '/',
          },
          {
            title: 'Automate Issuance',
            description: 'SDK integration step-by-step',
            href: '/',
          },
          {
            title: 'Control PDA Status',
            description: 'How to Upgrade, Revoke, suspend and Update PDAs',
            href: '/',
          },
          {
            title: 'Monetize Data-Sharing',
            description: 'How to monetize using our Verification System',
            href: '/',
          },
        ]}
      />

      <TemplateDocsSection
        title="Become a Verifier"
        button={{
          text: 'Open verifier docs',
          href: '/',
        }}
        cards={[
          {
            title: 'Creating a Data Request',
            description: 'Easily create Data models that fits your needs',
            href: '/',
          },
          {
            title: 'Verification Widget Integration',
            description: 'How to integrate our widget into your platform',
            href: '/',
          },
        ]}
      />
      <Footer variant="dark" />
    </HeaderContextProvider>
  );
}
