'use client';

import { PropsWithChildren } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { SectionContainer } from '../section-container/section-container';

import DataImageCardLoading from '../data-image-card/data-image-card-loading';

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
          <Button
            variant="text"
            sx={{ display: { xs: 'none', lg: 'block' } }}
            href={viewMore.href}
          >
            {viewMore.label}
          </Button>
        )}
      </Box>

      <Box
        sx={{
          gap: 2,
          display: 'grid',
          overflowX: 'auto',
          gridAutoFlow: 'column',
          gridTemplateColumns: {
            xs: 'repeat(auto-fill, minmax(1fr, auto))', // Auto-fill columns in the x direction on small screens            md: 'repeat(2, 1fr)',
            lg: `repeat(${columns}, 1fr)`,
          },
        }}
      >
        {isLoading && (
          <>
            {Array.from(Array(columns).keys()).map((_item, index) => (
              <DataImageCardLoading key={index}  />
            ))}
          </>
        )}
        {children}
      </Box>
      {viewMore && (
        <Button
          variant="text"
          sx={{ display: { lg: 'none' }, alignItems: 'start' }}
          href={viewMore.href}
        >
          {viewMore.label}
        </Button>
      )}
    </SectionContainer>
  );
}
