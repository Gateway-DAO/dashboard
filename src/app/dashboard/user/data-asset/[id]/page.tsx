import { Suspense } from 'react';

import ErrorBoundary from '@/components/error-boundary/error-boundary';

import { Typography } from '@mui/material';

import PDAItem from './components/pda-item';
import PDASkeleton from './components/pda-skeleton';

export default async function PDAPage({ params }: { params: { id: string } }) {
  return (
    <ErrorBoundary fallback={<Typography>Suspense error boundary</Typography>}>
      <Suspense fallback={<PDASkeleton />}>
        <PDAItem id={params?.id} />
      </Suspense>
    </ErrorBoundary>
  );
}
