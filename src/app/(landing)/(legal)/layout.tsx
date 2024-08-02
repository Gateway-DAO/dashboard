import { PropsWithChildren } from 'react';

import { Container } from '@mui/material';

import Nav from '../components/nav/nav';

export default function LegalLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Nav color="black" />
      {children}
    </>
  );
}
