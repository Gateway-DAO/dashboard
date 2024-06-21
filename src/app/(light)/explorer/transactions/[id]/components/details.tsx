'use client';
import React from 'react';

import { explorerQueries } from '@/constants/queries';
import { transaction_detail } from '@/locale/en/transaction';
import { apiPublic } from '@/services/protocol-v3/api';
import { ActivityAction, ActivityQuery } from '@/services/protocol-v3/types';
import { useQuery } from '@tanstack/react-query';

import {
  Box,
  Card,
  Chip,
  Container,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import ActionDetail from '../../../components/transactions/action-detail';
import CardRow from './card-row';
import TransactionTemplate from './general-template';
import TransactionData from './transaction-data';

type Props = {
  id: string;
};

export default function TransactionDetails({ id }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: [explorerQueries.transaction, id],
    queryFn: () => apiPublic.activity({ id }),
    select: (data) => data.activity,
  });

  return (
    <>
      <Container sx={{ pb: 4 }}>
        <Box sx={{ maxWidth: 777 }}>
          <Stack
            component={Card}
            variant="outlined"
            sx={{
              mb: 3,
              overflow: 'visible',
            }}
            divider={
              <Divider
                sx={{
                  width: '100%',
                }}
              />
            }
          >
            <CardRow title={transaction_detail.transaction_id}>
              <Typography variant="body1">
                {isLoading ? <Skeleton variant="text" width={400} /> : id}
              </Typography>
            </CardRow>
            <CardRow title={transaction_detail.action}>
              {isLoading ? (
                <Skeleton width={100} />
              ) : (
                <Chip
                  label={
                    <ActionDetail action={data?.action as ActivityAction} />
                  }
                />
              )}
            </CardRow>
            {data && <TransactionTemplate data={data} />}
          </Stack>
        </Box>
      </Container>
      {data?.metadata && (
        <TransactionData data={JSON.stringify(data.metadata)} />
      )}
    </>
  );
}
