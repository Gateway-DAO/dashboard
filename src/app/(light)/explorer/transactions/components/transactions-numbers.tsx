'use client';

import NumberCard from '@/components/number-card/number-card';
import { explorerQueries } from '@/constants/queries';
import { transaction } from '@/locale/en/transaction';
import { apiPublic } from '@/services/protocol/api';
import { Explorer_Transactions_StatsQuery } from '@/services/protocol/types';
import { numberToMoneyString } from '@/utils/money';
import { useQuery } from '@tanstack/react-query';

import { Stack } from '@mui/material';

export default function TransactionsNumbers() {
  const { data, isLoading } = useQuery({
    queryKey: [explorerQueries.transactions_stats],
    queryFn: () => apiPublic.explorer_transactions_stats(),
    select: (data: Explorer_Transactions_StatsQuery) => {
      return {
        ...data.getTransactionsExplorerStats,
        totalEarnings: numberToMoneyString(
          data.getTransactionsExplorerStats.totalEarnings
        ),
      };
    },
  });
  return (
    <Stack direction="row" gap={2} mt={4} overflow="auto">
      <NumberCard
        dark
        label={transaction.title}
        isLoading={isLoading}
        value={data?.totalTransactions as number}
      />
      <NumberCard
        label={transaction.cards.pdas}
        isLoading={isLoading}
        value={data?.pdasIssued as number}
      />
      <NumberCard
        label={transaction.cards.data_contributors}
        isLoading={isLoading}
        value={data?.uniqueIssuers as number}
      />
      <NumberCard
        label={transaction.cards.data_requests}
        isLoading={isLoading}
        value={data?.dataRequests as number}
      />
      <NumberCard
        label={transaction.cards.fees}
        isLoading={isLoading}
        value={data?.totalEarnings as string}
      />
    </Stack>
  );
}
