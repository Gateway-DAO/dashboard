import { PropsWithChildren } from 'react';

import { Container } from '@mui/material';

import Header from './components/header/header';

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Container>
        <Header />
        {children}
      </Container>
    </>
  );
}
