'use client';
import { useCallback, useMemo, useState } from 'react';

import { Box, Chip, Stack } from '@mui/material';

import ClientCard from '../components/card';
import { Client } from '../type';

export default function ClientsSection({ clients }: { clients: Client[] }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const selectedClients = !selectedTags.length
    ? clients
    : clients.filter((client) =>
        client.tags.some((tag) => selectedTags.includes(tag))
      );

  const tags = useMemo(() => {
    const tags = new Set<string>();
    clients.forEach((client) => {
      client.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  const onSelectedTag = useCallback((tag: string) => {
    setSelectedTags((tags) => {
      if (!tags) {
        return [tag];
      }
      if (tags.includes(tag)) {
        return tags.filter((t) => t !== tag);
      }
      return [...tags, tag];
    });
  }, []);

  return (
    <>
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
        <Chip
          label="All"
          color={!selectedTags.length ? 'primary' : 'default'}
          onClick={() => setSelectedTags([])}
        />
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            color={selectedTags?.includes(tag) ? 'primary' : 'default'}
            onClick={() => onSelectedTag(tag)}
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
    </>
  );
}
