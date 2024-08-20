'use client';
import Link from 'next/link';

import { CardCellContainer } from '@/components/card-cell/card-cell';
import { DATE_FORMAT } from '@/constants/date';
import routes from '@/constants/routes';
import { transaction } from '@/locale/en/transaction';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import {
  Card,
  Typography,
  Divider,
  Button,
  Stack,
  Box,
  Skeleton,
} from '@mui/material';
import { Transaction, mockTransactions } from '@/services/api/mock-types';

export default function LastTransactionsTable() {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['last-transactions'],
    queryFn: async (): Promise<Transaction[]> => {
      const mockPromise = new Promise<Transaction[]>((resolve) => {
        setTimeout(() => {
          resolve(mockTransactions);
        }, 1000);
      });

      return mockPromise;
    },
  });
  
  return (
    <Stack
      component={Card}
      sx={{
        mt: 4,
        mb: 3,
        overflow: 'visible',
      }}
      variant="outlined"
    >
      <CardCellContainer mb={1}>
        <Box display="flex">
          <Typography flex={3}>{transaction.home_table.columns.id}</Typography>
          <Typography flex={1}>
            {transaction.home_table.columns.action}
          </Typography>
          <Typography flex={1}>
            {transaction.home_table.columns.date}
          </Typography>
        </Box>
      </CardCellContainer>
      <Stack
        divider={
          <Divider
            sx={{
              width: '100%',
            }}
          />
        }
      >
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <CardCellContainer key={value}>
                <Box display="flex" gap={4}>
                  <Typography flex={3}>
                    <Skeleton />
                  </Typography>
                  <Box flex={1}>
                    <Skeleton />
                  </Box>
                  <Typography flex={1}>
                    <Skeleton />
                  </Typography>
                </Box>
              </CardCellContainer>
            ))}
          </>
        ) : (
          <>
            {transactions?.map((transaction) => (
              <CardCellContainer key={transaction.transactionId}>
                <Box
                  component={Link}
                  href={routes.explorer.transaction(
                    transaction.solanaTransactionId
                  )}
                  display="flex"
                  sx={{
                    '&': {
                      textDecoration: 'none',
                      color: 'inherit',
                    },
                  }}
                >
                  <Typography flex={3}>
                    {transaction.solanaTransactionId}
                  </Typography>

                  <Typography flex={1}>
                    {dayjs(transaction.createdAt).format(DATE_FORMAT)}
                  </Typography>
                </Box>
              </CardCellContainer>
            ))}
          </>
        )}

        <CardCellContainer alignItems="flex-start">
          <Button variant="text" href={routes.explorer.transactions}>
            {transaction.home_table.view_more}
          </Button>
        </CardCellContainer>
      </Stack>
    </Stack>
  );
}
