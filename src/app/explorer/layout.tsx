import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import Footer from '@/components/footer/footer';

import ExplorerNavbar from './components/explorer-navbar';

export const metadata: Metadata = {
  title: {
    default: 'Gateway Explorer',
    template: '%s - Gateway Explorer',
  },
  description: `Explore transactions, data models, and request templates on our Gateway platform.`,
};

export default function ExplorerLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ExplorerNavbar />
      {children}
      <Footer color="transparent" />
    </>
  );
}
