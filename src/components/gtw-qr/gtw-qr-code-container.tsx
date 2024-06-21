import { PropsWithChildren } from 'react';

import { Box } from '@mui/material';

export default function GtwQrCodeContainer({ children }: PropsWithChildren) {
  return (
    <Box
      p={2}
      border="1px solid"
      borderColor="divider"
      display="inline-block"
      borderRadius={1.5}
      width={380}
    >
      {children}
    </Box>
  );
}
