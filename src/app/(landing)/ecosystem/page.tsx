import { Metadata } from 'next';

import { defaultMetatag } from '@/constants/metatags';

import InternalContent from '../components/internal/internal-content';
import InternalHeader from '../components/internal/internal-header';
import Nav from '../components/nav/nav';
import clients from './data.json';
import ClientsSection from './sections/clients';

export const metadata: Metadata = {
  ...defaultMetatag,
  title: 'Gateway Ecosystem',
  description:
    'Gateway: Empowering a privacy-first, decentralized data ecosystem that revolutionizes data ownership, security, and control.',
  keywords: ['Gateway Ecosystem', ...defaultMetatag.keywords],
  openGraph: {
    ...defaultMetatag.openGraph,
    title: 'Gateway Ecosystem',
    url: 'https://mygateway.xyz/ecosystem',
  },
  twitter: {
    ...defaultMetatag.twitter,
    title: 'Gateway Ecosystem',
    card: 'summary',
  },
};

export default function Ecosystem() {
  return (
    <>
      <Nav color="black" />
      <InternalHeader>Discover the Thriv ing Gateway Network</InternalHeader>
      <InternalContent>
        <ClientsSection clients={clients} />
      </InternalContent>
    </>
  );
}
