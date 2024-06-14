'use client';

import { SessionProvider } from 'next-auth/react';
import { AppProgressBar } from 'next-nprogress-bar';
import { PropsWithChildren } from 'react';

import { ReactLenis } from '@studio-freight/react-lenis';

export default function ClientProviders({ children }: PropsWithChildren) {
  return (
    <ReactLenis root>
      <AppProgressBar
        height="4px"
        color="#771AC9"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <SessionProvider refetchOnWindowFocus refetchInterval={5000}>
        {children}
      </SessionProvider>
    </ReactLenis>
  );
}
