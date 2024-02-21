import { PropsWithChildren } from 'react';

import { ThemeProvider } from '@/theme';

import ClientProviders from './client-provider';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider dark>
      <ClientProviders>{children}</ClientProviders>
    </ThemeProvider>
  );
}
