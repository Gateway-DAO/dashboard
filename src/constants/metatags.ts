const description =
  'Gateway: The Decentralized Private Computer. An integrated protocol to encrypt, store, manage, and compute private data. Experience a private and powerful solution for sensitive information.';

export const defaultMetatag = {
  title: {
    template: '%s | Gateway Protocol',
    default: 'Gateway Protocol',
  },
  description,
  keywords: [
    'Gateway',
    'decentralized data',
    'privacy',
    'security',
    'data ownership',
    'user control',
    'digital oil',
    'dataverse',
    'identity applications',
    'privacy ecosystem',
  ],
  openGraph: {
    title: 'Gateway Protocol',
    description,
    type: 'website',
    locale: 'en_US',
    url: 'https://mygateway.xyz/',
    siteName: 'Gateway Protocol',
    images: [
      {
        url: 'https://mygateway.xyz/social.png',
      },
    ],
  },
  twitter: {
    title: 'Gateway Protocol',
    card: 'summary_large_image',
    site: '@Gateway_xyz',
    description,
    images: [{ url: 'https://mygateway.xyz/social.png' }],
  },
};
