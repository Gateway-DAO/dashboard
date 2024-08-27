'use client';
import Link from 'next/link';

import { CardCellContainer } from '@/components/card-cell/card-cell';
import { DATE_FORMAT } from '@/constants/date';
import routes from '@/constants/routes';
import { Transaction, mockTransactions } from '@/services/api/models';
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
          <Typography flex={3}>Transaction ID</Typography>
          <Typography sx={{ mr: { xs: 10, lg: 20 } }}>Date</Typography>
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

                  <Typography sx={{ mr: 20 }}>
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
                  <Typography
                    flex={3}
                    variant="body1"
                    gutterBottom={false}
                    sx={{
                      width: { xs: '112px' },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {transaction.solanaTransactionId}
                  </Typography>

                  <Typography
                    sx={{ mr: { lg: 3 }, width: { xs: '183px' } }}
                    variant="body1"
                    gutterBottom={false}
                  >
                    {dayjs(transaction.createdAt).format(DATE_FORMAT)}
                  </Typography>
                </Box>
              </CardCellContainer>
            ))}
          </>
        )}

        <CardCellContainer alignItems="flex-start">
          <Button variant="text" href={routes.explorer.transactions}>
            View all transactions
          </Button>
        </CardCellContainer>
      </Stack>
    </Stack>
  );
}
