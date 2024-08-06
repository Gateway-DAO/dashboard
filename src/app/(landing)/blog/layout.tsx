import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import Nav from '../components/nav/nav';
import { blogMetadata } from './utils';

export const metadata: Metadata = blogMetadata;

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Nav color="black" />
      {children}
    </>
  );
}
