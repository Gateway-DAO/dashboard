'use client';

import { PropsWithChildren, useState } from 'react';

import Notistack from '@/components/notistack/notistack';
import { queryClientConfig } from '@/services/query-client';
import { ThemeProvider } from '@/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Providers({ children }: PropsWithChildren<{}>) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Notistack>{children}</Notistack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
