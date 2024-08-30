'use client';

import NumberCard from '@/components/number-card/number-card';
import { useQuery } from '@tanstack/react-query';

import { Stack } from '@mui/material';
import {
  ExplorerHomeStats,
  mockExplorerHomeStats,
} from '@/services/api/models';

export default function TransactionsNumbers() {
  const { data, isLoading } = useQuery({
    queryKey: ['explorer_home_stats'],
    queryFn: async (): Promise<ExplorerHomeStats> => {
      const mockPromise = new Promise<ExplorerHomeStats>((resolve) => {
        setTimeout(() => {
          resolve(mockExplorerHomeStats);
        }, 1000);
      });

      return mockPromise;
    },
  });

  return (
    <Stack direction="row" gap={2} mt={4} overflow="auto">
      <NumberCard
        dark
        label="Transactions"
        value={data?.transactionsCount as number}
        isLoading={isLoading}
      />
      <NumberCard
        dark
        label="Data contributers"
        value={data?.uniqueIssuers as number}
        isLoading={isLoading}
      />
      <NumberCard
        dark
        label="Data assets"
        value={data?.pdasIssued as number}
        isLoading={isLoading}
      />
      <NumberCard
        dark
        label="DIDs created"
        value={data?.totalUsers as number}
        isLoading={isLoading}
      />
    </Stack>
  );
}
