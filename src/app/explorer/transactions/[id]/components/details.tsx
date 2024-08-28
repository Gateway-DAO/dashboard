'use client';
import React from 'react';

import ExternalLink from '@/components/external-link/external-link';
import { explorerQueries } from '@/constants/queries';

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

import CardRow from './card-row';
import TransactionData from './transaction-data';
import PDA from './types/pda';
import ActionDetail from '@/app/explorer/components/transaction/action-detail';
import {
  mockTransactionType,
  Transaction,
  mockTransactions,
  mockMetaData,
} from '@/services/api/models';

type Props = {
  id: string;
};

export default function TransactionDetails({ id }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: [explorerQueries.transaction, id],
    queryFn: async (): Promise<Transaction> => {
      const mockPromise = new Promise<Transaction>((resolve) => {
        const t = mockTransactions.find((t) => t.solanaTransactionId === id);
        resolve({
          createdAt: t!.createdAt,
          fee: t!.fee,
          signature: t!.signature,
          solanaTransactionId: t!.solanaTransactionId,
          source: t!.source,
          transactionId: t!.transactionId,
        });
      });
      return mockPromise;
    },
  });

  const { data: transactionData } = useQuery({
    queryKey: [explorerQueries.transaction_arweave],
    queryFn: async (): Promise<typeof mockMetaData> => {
      const mockPromise = new Promise<typeof mockMetaData>((resolve) => {
        setTimeout(() => {
          resolve(mockMetaData);
        }, 1000);
      });
      return mockPromise;
    },
  });

  // this will also refactor in future depending on cases
  const displayDetails = (data: any) => {
    return <PDA data={data} />;
  };

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
            {data && displayDetails(data)}
          </Stack>
        </Box>
      </Container>
      {transactionData && (
        <TransactionData data={JSON.stringify(transactionData)} />
      )}
      {data && (
        <ExternalLink
          iconSxProps={{ fontSize: 20, color: 'primary.main' }}
          href={data?.transactionId as string}
          text="View on Solscan"
          textSxProps={{ color: 'primary.main', ml: 7 }}
        />
      )}
    </>
  );
}
