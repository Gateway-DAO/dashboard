import PdaCardSkeleton from '@/components/pda-card/pda-card-skeleton';

import { Box } from '@mui/material';

import AssetsHeader from './components/pdas-header';
import PDAsListContainer from './components/pdas-list-container';

export default function DataAssetsLoadingPage() {
  return (
    <>
      <AssetsHeader />
      <Box sx={{ pt: 5 }}>
        <PDAsListContainer>
          <PdaCardSkeleton />
          <PdaCardSkeleton />
          <PdaCardSkeleton />
          <PdaCardSkeleton />
          <PdaCardSkeleton />
          <PdaCardSkeleton />
        </PDAsListContainer>
      </Box>
    </>
  );
}
