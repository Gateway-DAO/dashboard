import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

import Footer from '@/components/footer/footer';
import Nav from '@/components/nav/nav';

import { blogMetadata } from './utils';

export const metadata: Metadata = blogMetadata;
const FooterSubscription = dynamic(
  () => import('./components/footer-subscription')
);

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Nav color="black" />
      {children}
      <Footer slot={<FooterSubscription />} />
    </>
  );
}
