import { Suspense } from 'react';

import BackButton from '@/components/buttons/back-button';
import ErrorBoundary from '@/components/error-boundary/error-boundary';
import TopBarContainer from '@/components/top-bar-container/top-bar-container';

import { Typography } from '@mui/material';

import PDAItem from './components/pda-item';
import PDASkeleton from './components/pda-skeleton';

export default async function PDAPage({ params }: { params: { id: string } }) {
  return (
    <ErrorBoundary fallback={<Typography>Suspense error boundary</Typography>}>
      <Suspense fallback={<PDASkeleton />}>
        <>
          <TopBarContainer>
            <BackButton />
          </TopBarContainer>
          <PDAItem id={params?.id} />
        </>
      </Suspense>
    </ErrorBoundary>
  );
}
