'use client';

import { HeaderContextProvider } from '@/app/(landing)/old/contexts/header-context';
import { DOCS_BASE_URL } from '@/constants/docs';

import Header from '../components/header';
import LandingFooter from '../components/landing-footer/landing-footer';
import Hero from './components/hero';
import TemplateDocsSection from './components/template-docs-section';

export default function BuildPage() {
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
            description: 'Easily define and standardize data fields.',
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
            description: 'How to create data request templates',
            href: `${DOCS_BASE_URL}docs/data-request`,
          },
          {
            title: 'Website Integration',
            description: 'How to integrate Gateway into your website',
            href: `${DOCS_BASE_URL}docs/data-proof`,
          },
        ]}
      />
      <LandingFooter variant="dark" />
    </HeaderContextProvider>
  );
}
