'use client'

import { PropsWithChildren, useState } from 'react'

import { queryClientConfig } from '@/services/query-client'
import { ThemeProvider } from '@/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Providers({ children }: PropsWithChildren<{}>) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig))

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
