import { Suspense } from 'react';

import ErrorBoundary from '@/components/error-boundary/error-boundary';

import { Typography } from '@mui/material';

import PDARequest from './components/pda-request';

export default async function PDAPage() {
  return (
    <ErrorBoundary fallback={<Typography>Suspense error boundary</Typography>}>
      <Suspense fallback={<>Test</>}>
        <PDARequest />
      </Suspense>
    </ErrorBoundary>
  );
}
