import { Suspense } from 'react';

import ErrorBoundary from '@/components/error-boundary/error-boundary';

import { Stack, Typography } from '@mui/material';

import PDAsList from './components/pdas-list';

export default function DataAssetsPage() {
  return (
    <Stack direction="row" flexWrap="wrap" gap={1}>
      <ErrorBoundary fallback={<Typography>Suspense error boundary</Typography>}>
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PDAsList />
        </Suspense>
      </ErrorBoundary>
    </Stack>
  );
}
