import { PropsWithChildren } from 'react';

import MainNavbar from '../../components/main-navbar';

export default function LegalLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MainNavbar color="black" />
      {children}
    </>
  );
}
