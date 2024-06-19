'use client';
import { CardCellContainer } from '@/components/card-cell/card-cell';
import { explorerQueries } from '@/constants/queries';
import { apiPublic } from '@/services/protocol-v3/api';
import { numberToMoneyString } from '@/utils/money';
import { useQuery } from '@tanstack/react-query';

import {
  Box,
  Container,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import TransactionsTable from './transactions-table';

export default function TransactionsTableSection() {
  const { data: transactions, isLoading } = useQuery({
    queryKey: [explorerQueries.transactions, 0, 20],
    queryFn: () => apiPublic.explorer_transactions({ skip: 0, take: 20 }),
    select: (data) => data.activities,
  });

  const { data: numbers } = useQuery({
    queryKey: [explorerQueries.transactions_stats],
    queryFn: () => apiPublic.explorer_transactions_stats(),
    select: (data) => {
      return {
        ...data.getTransactionsExplorerStats,
        totalEarnings: numberToMoneyString(
          data.getTransactionsExplorerStats.totalEarnings
        ),
      };
    },
  });

  return (
    <Stack
      p={3}
      component={Container}
      maxWidth="xl"
      justifyContent="space-between"
    >
      {isLoading ? (
        <Stack
          divider={
            <Divider
              sx={{
                width: '100%',
              }}
            />
          }
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <CardCellContainer key={value}>
              <Box display="flex" gap={4}>
                <Typography flex={3}>
                  <Skeleton />
                </Typography>
                <Typography flex={1}>
                  <Skeleton />
                </Typography>
              </Box>
            </CardCellContainer>
          ))}
        </Stack>
      ) : (
        <TransactionsTable
          initialData={transactions ?? []}
          totalCount={numbers?.totalActivities as number}
        />
      )}
    </Stack>
  );
}
