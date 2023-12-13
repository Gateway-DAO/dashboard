'use client';
import Link from 'next/link';

import FinancialActionDetail from '@/app/(light)/dashboard/components/wallet/action-detail';
import { CardCellContainer } from '@/components/card-cell/card-cell';
import { DATE_FORMAT } from '@/constants/date';
import { explorerQueries } from '@/constants/queries';
import routes from '@/constants/routes';
import { transaction } from '@/locale/en/transaction';
import { apiPublic } from '@/services/protocol/api';
import { Last_TransactionsQuery } from '@/services/protocol/types';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import {
  Card,
  Typography,
  Divider,
  Chip,
  Button,
  Stack,
  Box,
  Skeleton,
} from '@mui/material';

import ActionDetail from '../../../components/transactions/action-detail';

export default function LastTransactionsTable() {
  const { data: transactions, isLoading } = useQuery({
    queryKey: [explorerQueries.last_transactions],
    queryFn: () => apiPublic.last_transactions(),
    select: (data: Last_TransactionsQuery) => data.transactions,
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
              <CardCellContainer key={transaction.id}>
                <Box
                  component={Link}
                  href={routes.explorer.transaction(transaction.id)}
                  display="flex"
                  sx={{
                    '&': {
                      textDecoration: 'none',
                      color: 'inherit',
                    },
                  }}
                >
                  <Typography flex={3}>{transaction.id}</Typography>
                  <Box flex={1}>
                    <Chip
                      label={<ActionDetail action={transaction.action} />}
                    />
                  </Box>
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
