'use client';

import { issuePda } from '@/locale/en/pda';

import { Stack, Typography } from '@mui/material';

import DataModelsFeatured from './featured-data-models/featured';

export default function IssuePdaContent() {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mt: 4,
          mb: {
            xs: 4,
            md: 5,
            lg: 6,
          },
        }}
      >
        <Stack>
          <Typography variant="body1" color="text.secondary">
            {issuePda.title}
          </Typography>
          <Typography variant="h3" sx={{ mb: 1 }}>
            {issuePda.subtitle}
          </Typography>
        </Stack>
      </Stack>
      <DataModelsFeatured />
    </>
  );
}
