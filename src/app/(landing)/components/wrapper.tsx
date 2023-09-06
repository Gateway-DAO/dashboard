import { ReactNode } from 'react';

import { Container } from '@mui/material';

type Props = {
  children?: ReactNode;
};

export default function Wrapper({ children }: Props) {
  return (
    <Container
      disableGutters
      sx={(theme) => ({
        maxWidth: 1152,
        position: 'relative',
        [theme.breakpoints.down('lg')]: {
          maxWidth: '90%',
        },
      })}
    >
      {children}
    </Container>
  );
}
