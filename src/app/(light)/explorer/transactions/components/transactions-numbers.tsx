'use client';

import NumberCard from '@/components/number-card/number-card';
import { explorerQueries } from '@/constants/queries';
import { transaction } from '@/locale/en/transaction';
import { apiPublic } from '@/services/protocol-v3/api';
import { useQuery } from '@tanstack/react-query';

import { Stack } from '@mui/material';

export default function TransactionsNumbers() {
  const { data, isLoading } = useQuery({
    queryKey: [explorerQueries.transactions_stats],
    queryFn: () => apiPublic.explorer_transactions_stats(),
    select: (data) => data.getTransactionsExplorerStats,
  });

  return (
    <Stack direction="row" gap={2} mt={4} overflow="auto">
      <NumberCard
        dark
        label={transaction.cards.txs_count}
        value={data?.totalActivities as number}
        isLoading={isLoading}
      />
      <NumberCard
        label={transaction.cards.data_contributors}
        value={data?.uniqueIssuers as number}
        isLoading={isLoading}
      />
      <NumberCard
        label={transaction.cards.pda_count}
        value={data?.pdasIssued as number}
        isLoading={isLoading}
      />
      <NumberCard
        label={transaction.cards.did_count}
        value={data?.totalUsers as number}
        isLoading={isLoading}
      />
    </Stack>
  );
}
