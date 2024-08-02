'use client';
import { useState } from 'react';

import { Box } from '@mui/material';

import InternalContent from '../components/internal/internal-content';
import InternalHeader from '../components/internal/internal-header';
import Nav from '../components/nav/nav';
import { clients, ClientTag } from './content';

export default function Ecosystem() {
  const [selectedTag, setSelectedTag] = useState<'all' | ClientTag>('all');

  const selectedClients =
    selectedTag === 'all'
      ? clients
      : clients.filter((client) => client.tag === selectedTag);

  return (
    <>
      <Nav color="black" />
      <InternalHeader>Discover the Thriving Gateway Network</InternalHeader>
      <InternalContent>
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
          {/* {selectedClients.map((client) => (<C)} */}
        </Box>
      </InternalContent>
    </>
  );
}
