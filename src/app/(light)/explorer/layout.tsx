import { PropsWithChildren } from 'react';

import { Container } from '@mui/material';

import ExplorerFooter from './components/footer/footer';
import Header from './components/header/header';

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <Container maxWidth="xl">
        <ExplorerFooter />
      </Container>
    </>
  );
}
