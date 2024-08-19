'use client';

import { SessionProvider } from 'next-auth/react';
import { AppProgressBar } from 'next-nprogress-bar';
import { PropsWithChildren, useState } from 'react';

import Notistack from '@/components/notistack/notistack';
import { queryClientConfig } from '@/services/query-client';
import { ThemeProvider } from '@/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <SessionProvider refetchOnWindowFocus refetchInterval={5000}>
          <AppProgressBar
            height="4px"
            color="#771AC9"
            options={{ showSpinner: false }}
            shallowRouting
          />
          <ReactQueryDevtools initialIsOpen={false} />

          <Notistack>{children}</Notistack>
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
