import { Suspense } from 'react';

import ErrorBoundary from '@/components/error-boundary/error-boundary';

import { Typography } from '@mui/material';

import PDAsList from './components/pdas-list';
import PDAsListSkeleton from './components/pdas-list-skeleton';

export default function DataAssetsPage() {
  return (
    <ErrorBoundary fallback={<Typography>Suspense error boundary</Typography>}>
      <Suspense fallback={<PDAsListSkeleton />}>
        <PDAsList />
      </Suspense>
    </ErrorBoundary>
  );
}
