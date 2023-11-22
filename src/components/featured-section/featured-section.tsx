'use client';

import { PropsWithChildren } from 'react';

import DataImageCardLoading from '@/components/data-image-card/data-image-card-loading';

import { Box, Button, Typography } from '@mui/material';

import { SectionContainer } from '../section-container/section-container';

type Props = {
  title: string;
  viewMore?: {
    href: string;
    label: string;
  };
  isLoading?: boolean;
  withContainer?: boolean;
  columns?: number;
};

export default function FeaturedSection({
  title,
  viewMore,
  isLoading,
  children,
  withContainer = true,
  columns = 4,
}: PropsWithChildren<Props>) {
  return (
    <SectionContainer withContainer={withContainer}>
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
            lg: `repeat(${columns}, 1fr)`,
          },
        }}
      >
        {isLoading && (
          <>
            {Array.from(Array(columns).keys()).map((_item, index) => (
              <DataImageCardLoading key={index} />
            ))}
          </>
        )}
        {children}
      </Box>
    </SectionContainer>
  );
}
