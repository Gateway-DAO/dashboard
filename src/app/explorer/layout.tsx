import { PropsWithChildren } from 'react';

import Footer from '@/components/footer/footer';

import ExplorerNavbar from './components/explorer-navbar';

export default function ExplorerLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ExplorerNavbar />
      {children}
      <Footer color="transparent" />
    </>
  );
}
