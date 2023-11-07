'use client';

import Link from 'next/link';
import React from 'react';

import CardCell, { CardCellContainer } from '@/components/card-cell/card-cell';
import { TableCellContainer } from '@/components/containers/table-cell-container/table-cell-container';
import CopyButton from '@/components/copy-button/copy-button';
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

type Props = {
  id: string;
};

type Transaction = {
  type: string;
  pda_id: string;
};

const fetchTransaction = async (): Promise<Transaction> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mock: Transaction = {
        type: 'PDA issuance',
        pda_id: '6cfd080c-58c0-4c28-b34a-dc0bd11b2ec6',
      };
      resolve(mock);
    }, 1500);
  });
};

const CardCellRow = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <TableCellContainer>
      <CardCellContainer>
        <Stack direction="row" alignItems="center" pb={1}>
          <Typography variant="subtitle1" flex={1}>
            {title}
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            flex={2}
            gap={1}
          >
            {children}
          </Box>
        </Stack>
      </CardCellContainer>
    </TableCellContainer>
  );
};

export default function TransactionDetails({ id }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: [explorerQueries.transaction, id],
    queryFn: () => fetchTransaction() as unknown as Transaction,
  });

  return (
    <Container sx={{ pb: 4 }}>
      <Box sx={{ maxWidth: 896 }}>
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
          <CardCellRow title="Transaction ID">
            <Typography variant="body1">
              {isLoading ? <Skeleton variant="text" width={400} /> : id}
            </Typography>
            <CopyButton size="small" variant="text" text={id} />
          </CardCellRow>
          <CardCellRow title="Action">
            {isLoading ? <Skeleton width={100} /> : <Chip label={data?.type} />}
          </CardCellRow>
          <CardCellRow title="Private Data Asset ID">
            <Typography variant="body1">
              {isLoading ? (
                <Skeleton variant="text" width={300} />
              ) : (
                data?.pda_id
              )}
            </Typography>
          </CardCellRow>
        </Stack>
      </Box>
    </Container>
  );
}
