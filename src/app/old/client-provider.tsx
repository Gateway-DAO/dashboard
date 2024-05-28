'use client';

import { SessionProvider } from 'next-auth/react';
import { AppProgressBar } from 'next-nprogress-bar';
import { PropsWithChildren, useState } from 'react';

import { queryClientConfig } from '@/services/query-client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function ClientProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider refetchOnWindowFocus refetchInterval={5000}>
        <AppProgressBar
          height="4px"
          color="#771AC9"
          options={{ showSpinner: false }}
          shallowRouting
        />
        <ReactQueryDevtools initialIsOpen={false} />

        {children}
      </SessionProvider>
    </QueryClientProvider>
  );
}
