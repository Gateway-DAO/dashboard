'use client';
import { CardCellContainer } from '@/components/card-cell/card-cell';
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
import { mockTransactions, Transaction } from '@/services/api/models';

export default function TransactionsTableSection() {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions', 0, 20],
    queryFn: async (): Promise<Transaction[]> => {
      const mockPromise = new Promise<Transaction[]>((resolve) => {
        setTimeout(() => {
          resolve(mockTransactions.slice(0, 20));
        }, 1000);
      });

      return mockPromise;
    },
  });

  const { data: numbers } = useQuery({
    queryKey: ['transactions-stats'],
    queryFn: async (): Promise<number> => {
      const mockPromise = new Promise<number>((resolve) => {
        setTimeout(() => {
          resolve(mockTransactions.length);
        }, 1000);
      });

      return mockPromise;
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
          totalCount={numbers as number}
        />
      )}
    </Stack>
  );
}
