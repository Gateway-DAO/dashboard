import { PropsWithChildren } from 'react';

import { Typography } from '@mui/material';

export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <Typography color="error" mt={1}>
      {children}
    </Typography>
  );
}
