import { Metadata } from 'next';

import InternalContent from '../components/internal/internal-content';
import InternalHeader from '../components/internal/internal-header';
import Nav from '../components/nav/nav';
import clients from './data.json';
import ClientsSection from './sections/clients';

export const metadata: Metadata = {
  title: 'Gateway Ecosystem',
  description:
    'Gateway: Empowering a privacy-first, decentralized data ecosystem that revolutionizes data ownership, security, and control.',
  keywords:
    'Gateway, Gateway Ecosystem, Decentralized data network, Privacy-focused, Secure data storage, User-controlled data, Data ownership, Digital oil, Dataverse, Identity-based applications, Data ecosystem',
  openGraph: {
    title: 'Gateway Ecosystem',
    url: 'https://mygateway.xyz/ecosystem',
  },
  twitter: {
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
