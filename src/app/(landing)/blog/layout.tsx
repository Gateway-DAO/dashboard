import { PropsWithChildren } from 'react';

import { Container } from '@mui/material';

import Nav from '../components/nav/nav';

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Nav color="black" />
      {children}
    </>
  );
}
