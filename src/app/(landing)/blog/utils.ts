import { Metadata } from 'next';

import { defaultMetatag } from '@/constants/metatags';

export const blogMetadata = {
  ...defaultMetatag,
  title: 'Gateway Blog',
  keywords: ['Gateway Blog', ...defaultMetatag.keywords],
  openGraph: {
    ...defaultMetatag.openGraph,
    title: 'Gateway Blog',
    url: 'https://mygateway.xyz/blog',
  },
  twitter: {
    ...defaultMetatag.twitter,
    title: 'Gateway Blog',
    card: 'summary',
  },
};
