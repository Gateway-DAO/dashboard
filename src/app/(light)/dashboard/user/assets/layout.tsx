import { PropsWithChildren } from 'react';

import { Box } from '@mui/material';

export default function DataAssetsLayout({ children }: PropsWithChildren) {
  return <Box sx={{ py: 2 }}>{children}</Box>;
}
