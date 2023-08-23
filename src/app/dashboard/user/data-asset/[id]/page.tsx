import { Suspense } from 'react';

import ErrorBoundary from '@/components/error-boundary/error-boundary';

import { Typography } from '@mui/material';

import PDAItem from './components/pda-item';

export default async function PDAPage() {
  return (
    <ErrorBoundary fallback={<Typography>Suspense error boundary</Typography>}>
      <Suspense fallback={<>Test</>}>
        <PDAItem />
      </Suspense>
    </ErrorBoundary>
  );
}
