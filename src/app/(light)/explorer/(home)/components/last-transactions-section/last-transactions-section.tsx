'use client';

import NumberCard from '@/components/number-card/number-card';
import { explorerQueries } from '@/constants/queries';
import { transaction } from '@/locale/en/transaction';
import { apiPublic } from '@/services/protocol-v3/api';
import { useQuery } from '@tanstack/react-query';

import { Box, Container, Stack, Typography } from '@mui/material';

import LastTransactionsTable from '../last-transactions-table/last-transactions-table';

export default function LastTransactionsSection() {
  const { data, isLoading } = useQuery({
    queryKey: [explorerQueries.transactions_stats],
    queryFn: () => apiPublic.explorer_transactions_stats(),
    select: (data) => data.getTransactionsExplorerStats,
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
        <Typography variant="h5">{transaction.last_transactions}</Typography>
        <Stack
          sx={{ flexDirection: { xs: 'column', lg: 'row' } }}
          gap={2}
          mt={4}
        >
          <NumberCard
            dark
            label={transaction.cards.txs_count}
            value={data?.totalActivities as number}
            isLoading={isLoading}
          />
          <NumberCard
            dark
            label={transaction.cards.data_contributors}
            value={data?.uniqueIssuers as number}
            isLoading={isLoading}
          />
          <NumberCard
            dark
            label={transaction.cards.pda_count}
            value={data?.pdasIssued as number}
            isLoading={isLoading}
          />
          <NumberCard
            dark
            label={transaction.cards.did_count}
            value={data?.totalUsers as number}
            isLoading={isLoading}
          />
        </Stack>
        <LastTransactionsTable />
      </Stack>
    </Box>
  );
}
