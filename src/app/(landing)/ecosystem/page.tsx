'use client';
import { Metadata } from 'next';
import { useMemo, useState } from 'react';

import { Box, Chip, Stack } from '@mui/material';

import InternalContent from '../components/internal/internal-content';
import InternalHeader from '../components/internal/internal-header';
import Nav from '../components/nav/nav';
import ClientCard from './components/card';
import clients from './data.json';

export const metadata: Metadata = {
  title: 'Gateway Ecosystem',
  description:
    'Gateway: Empowering a privacy-first, decentralized data ecosystem that revolutionizes data ownership, security, and control.',
  keywords:
    'Gateway, Gateway Ecosystem, Decentralized data network, Privacy-focused, Secure data storage, User-controlled data, Data ownership, Digital oil, Dataverse, Identity-based applications, Data ecosystem',
  openGraph: {
    title: 'Gateway Ecosystem',
    description:
      'Gateway: Empowering a privacy-first, decentralized data ecosystem that revolutionizes data ownership, security, and control.',
    type: 'website',
    locale: 'en_US',
    url: 'https://mygateway.xyz/ecosystem',
    siteName: 'Gateway Protocol',
    images: [
      {
        url: 'https://mygateway.xyz/social.png',
      },
    ],
  },
  twitter: {
    title: 'Gateway Ecosystem',
    card: 'summary',
    site: '@Gateway_xyz',
    description:
      'Gateway: Empowering a privacy-first, decentralized data ecosystem that revolutionizes data ownership, security, and control.',
    images: [{ url: 'https://mygateway.xyz/social.png' }],
  },
};

export default function Ecosystem() {
  const [selectedTag, setSelectedTag] = useState<'All' | string>('All');

  const selectedClients =
    selectedTag === 'All'
      ? clients
      : clients.filter((client) => client.tags.includes(selectedTag));

  const tags = useMemo(() => {
    const tags = new Set<string>(['All']);
    clients.forEach((client) => {
      client.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  return (
    <>
      <Nav color="black" />
      <InternalHeader>Discover the Thriv ing Gateway Network</InternalHeader>
      <InternalContent>
        <Stack
          direction="row"
          gap={1}
          sx={{
            flexWrap: 'nowrap',
            overflowX: 'auto',
            mx: {
              xs: -3,
              sm: -6,
              lg: 0,
            },
            px: {
              xs: 3,
              sm: 6,
              lg: 0,
            },
            mb: {
              xs: 4,
              md: 6,
            },
          }}
        >
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              color={tag === selectedTag ? 'primary' : 'default'}
              onClick={() => setSelectedTag(tag)}
            />
          ))}
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr',
            },
          }}
        >
          {selectedClients.map((client) => (
            <ClientCard key={client.name} {...client} />
          ))}
        </Box>
      </InternalContent>
    </>
  );
}
