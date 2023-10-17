'use client';

import { useEffect } from 'react';

import { HeaderContextProvider } from '@/app/(landing)/contexts/header-context';

import Hero from '../build/components/hero';
import Footer from '../components/footer';
import Header from '../components/header';
import LenisManager, { initializeLenis } from '../utils/scroll';
import TemplateDocsSection from './components/template-docs-section';
import { DOCS_BASE_URL } from '@/constants/docs';

export default function BuildPage() {
  useEffect(() => {
    initializeLenis();
    LenisManager?.start();
    return () => {
      LenisManager?.destroy();
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
          href: `${DOCS_BASE_URL}docs/issuers-1`,
        }}
        cards={[
          {
            title: 'Create Unique Data-Models',
            description: 'Easy create Data models that fits your needs',
            href: `${DOCS_BASE_URL}docs/data-model`,
          },
          {
            title: 'Automate Issuance',
            description: 'SDK integration step-by-step',
            href: `${DOCS_BASE_URL}docs/start-issuing`,
          },
          {
            title: 'Control PDA Status',
            description: 'How to Upgrade, Revoke, suspend and Update PDAs',
            href: `${DOCS_BASE_URL}docs/private-data-assets-pda`,
          },
          {
            title: 'Monetize Data-Sharing',
            description: 'How to monetize using our Verification System',
            href: `${DOCS_BASE_URL}docs/data-proof`,
          },
        ]}
      />

      <TemplateDocsSection
        title="Become a Verifier"
        button={{
          text: 'Open verifier docs',
          href: `${DOCS_BASE_URL}docs/verifiers`,
        }}
        cards={[
          {
            title: 'Creating a Data Request',
            description: 'Easily create Data models that fits your needs',
            href: `${DOCS_BASE_URL}docs/data-request`,
          },
          {
            title: 'Verification Widget Integration',
            description: 'How to integrate our widget into your platform',
            href: `${DOCS_BASE_URL}docs/data-proof`,
          },
        ]}
      />
      <Footer variant="dark" />
    </HeaderContextProvider>
  );
}
