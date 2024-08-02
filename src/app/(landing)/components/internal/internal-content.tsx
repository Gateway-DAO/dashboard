import { PropsWithChildren } from 'react';

import { Container } from '@mui/material';

export default function InternalContent({ children }: PropsWithChildren) {
  return (
    <Container
      component="main"
      sx={{
        py: {
          xs: 6,
          md: 11,
        },
      }}
    >
      {children}
    </Container>
  );
}
