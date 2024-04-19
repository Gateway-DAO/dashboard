'use client';

import Loading from '@/components/loadings/loading/loading';

import { Box } from '@mui/material';

export default function LoadingPage() {
  return (
    <Box margin={10}>
      {' '}
      <Loading marginTop={50} />
    </Box>
  );
}
