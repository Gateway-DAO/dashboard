'use client';

import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren, useState } from 'react';

import Notistack from '@/components/notistack/notistack';
import { queryClientConfig } from '@/services/query-client';
import { ThemeProvider } from '@/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider refetchOnWindowFocus refetchInterval={5000}>
        <ThemeProvider>
          <Notistack>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
          </Notistack>
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
