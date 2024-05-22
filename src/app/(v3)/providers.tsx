import { PropsWithChildren } from 'react';

import Notistack from '@/components/notistack/notistack';
import { ThemeProvider } from '@/theme';

import ClientProviders from './client-provider';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ClientProviders>
      <ThemeProvider>
        <Notistack>{children}</Notistack>
      </ThemeProvider>
    </ClientProviders>
  );
}
