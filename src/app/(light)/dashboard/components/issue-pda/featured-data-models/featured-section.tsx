'use client';

import { PropsWithChildren } from 'react';

import DataCardLoading from '@/components/data-card/data-card-loading';

import { Box, Typography } from '@mui/material';

type Props = {
  title: string;
  isLoading?: boolean;
};

export default function FeaturedSection({
  title,
  isLoading,
  children,
}: PropsWithChildren<Props>) {
  return (
    <>
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
      </Box>
      <Box
        sx={{
          gap: 2,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
        }}
      >
        {isLoading && (
          <>
            <DataCardLoading />
            <DataCardLoading />
            <DataCardLoading />
          </>
        )}
        {children}
      </Box>
    </>
  );
}
