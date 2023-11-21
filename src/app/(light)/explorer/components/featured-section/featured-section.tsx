'use client';

import { PropsWithChildren } from 'react';

import DataCardLoading from '@/components/data-card/data-card-loading';

import { Box, Button, Container, Typography } from '@mui/material';

type Props = {
  title: string;
  viewMore?: {
    href: string;
    label: string;
  };
  isLoading?: boolean;
};

export default function ExplorerFeaturedSection({
  title,
  viewMore,
  isLoading,
  children,
}: PropsWithChildren<Props>) {
  return (
    <Container
      sx={{
        py: 6,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography component="h3" variant="h5">
          {title}
        </Typography>
        {viewMore && (
          <Button variant="text" href={viewMore.href}>
            {viewMore.label}
          </Button>
        )}
      </Box>
      <Box
        sx={{
          gap: 2,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
        }}
      >
        {isLoading && (
          <>
            <DataCardLoading />
            <DataCardLoading />
            <DataCardLoading />
            <DataCardLoading />
          </>
        )}
        {children}
      </Box>
    </Container>
  );
}
