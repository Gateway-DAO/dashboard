import { PropsWithChildren } from 'react';

import { Container } from '@mui/material';

import ExplorerFooter from './components/footer/footer';
import ExplorerNavbar from './components/navbar/navbar';

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ExplorerNavbar />
      {children}
      <Container sx={{ py: 3 }}>
        <ExplorerFooter />
      </Container>
    </>
  );
}
