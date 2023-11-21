'use client';

import { explorerQueries } from '@/constants/queries';
import { transaction } from '@/locale/en/transaction';
import { apiPublic } from '@/services/protocol/api';
import { Explorer_Home_StatsQuery } from '@/services/protocol/types';
import { numberToMoneyString } from '@/utils/money';
import { useQuery } from '@tanstack/react-query';

import { Box, Container, Stack, Typography } from '@mui/material';

import NumberCard from '../../../components/number-card/number-card';
import LastTransactionsTable from '../last-transactions-table/last-transactions-table';

export default function LastTransactionsSection() {
  const { data, isLoading } = useQuery({
    queryKey: [explorerQueries.home_stats],
    queryFn: () => apiPublic.explorer_home_stats(),
    select: (data: Explorer_Home_StatsQuery) => {
      return {
        ...data.getExplorerStats,
        totalEarnings: numberToMoneyString(data.getExplorerStats.totalEarnings),
      };
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
        <Typography variant="h5">{transaction.last_transactions}</Typography>
        <Stack
          sx={{ flexDirection: { xs: 'column', lg: 'row' } }}
          gap={2}
          mt={4}
        >
          <NumberCard
            dark
            label={transaction.cards.pdas}
            value={data?.pdasIssued as number}
            isLoading={isLoading}
          />
          <NumberCard
            dark
            label={transaction.cards.issuers}
            value={data?.uniqueIssuers as number}
            isLoading={isLoading}
          />
          <NumberCard
            dark
            label={transaction.cards.data_requests}
            value={data?.dataRequests as number}
            isLoading={isLoading}
          />
          <NumberCard
            dark
            label={transaction.cards.fees}
            value={data?.totalEarnings as string}
            isLoading={isLoading}
          />
        </Stack>
        <LastTransactionsTable />
      </Stack>
    </Box>
  );
}
