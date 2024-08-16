import { PropsWithChildren } from 'react';

import Nav from '@/components/nav/nav';

export default function LegalLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Nav color="black" />
      {children}
    </>
  );
}
