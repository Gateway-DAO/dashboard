'use client'

import { queryClientConfig } from '@/service/query-client'
import { ThemeProvider } from '@/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

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
