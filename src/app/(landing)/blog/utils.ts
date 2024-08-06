import { Metadata } from 'next';

export const blogMetadata: Metadata = {
  title: 'Gateway Blog',
  description:
    'Gateway: Empowering a privacy-first, decentralized data ecosystem that revolutionizes data ownership, security, and control.',
  keywords:
    'Gateway, Gateway Blog, Decentralized data network, Privacy-focused, Secure data storage, User-controlled data, Data ownership, Digital oil, Dataverse, Identity-based applications, Data ecosystem',
  openGraph: {
    title: 'Gateway Blog',
    description:
      'Gateway: Empowering a privacy-first, decentralized data ecosystem that revolutionizes data ownership, security, and control.',
    type: 'website',
    locale: 'en_US',
    url: 'https://mygateway.xyz/blog',
    siteName: 'Gateway Protocol',
    images: [
      {
        url: 'https://mygateway.xyz/social.png',
      },
    ],
  },
  twitter: {
    title: 'Gateway Blog',
    card: 'summary',
    site: '@Gateway_xyz',
    description:
      'Gateway: Empowering a privacy-first, decentralized data ecosystem that revolutionizes data ownership, security, and control.',
    images: [{ url: 'https://mygateway.xyz/social.png' }],
  },
};
