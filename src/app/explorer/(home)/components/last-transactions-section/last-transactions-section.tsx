'use client';

import NumberCard from '@/components/number-card/number-card';
import { mockExplorerHomeStats } from '@/services/api/mocks';
import { ExplorerHomeStats } from '@/services/api/models';
import { useQuery } from '@tanstack/react-query';

import { Box, Container, Stack, Typography } from '@mui/material';

import LastTransactionsTable from '../last-transactions-table/last-transactions-table';

export default function LastTransactionsSection() {
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
    <Box
      sx={{
        pt: 6,
        pb: 6,
        bgcolor: 'primary.light',
      }}
    >
      <Stack component={Container} maxWidth="xl">
        <Typography variant="h5">Last transactions</Typography>
        <Stack
          sx={{ flexDirection: { xs: 'column', lg: 'row' } }}
          gap={2}
          mt={4}
        >
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
        <LastTransactionsTable />
      </Stack>
    </Box>
  );
}
