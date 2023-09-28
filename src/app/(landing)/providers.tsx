'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { PropsWithChildren } from 'react';

import { ThemeProvider } from '@/theme';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider dark>
      <ProgressBar
        height="4px"
        color="#771AC9"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </ThemeProvider>
  );
}
