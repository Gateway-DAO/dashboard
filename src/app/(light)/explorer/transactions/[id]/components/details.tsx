'use client';
import React from 'react';

import ExternalLink from '@/components/external-link/external-link';
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
import TransactionData from './transaction-data';
import DataModelCreation from './types/data-model-creation';
import OrgCreation from './types/org-creation';
import PDA from './types/pda';
import ProofCreation from './types/proof-creation';
import RequestCreation from './types/request-creation';
import RequestTemplateCreation from './types/request-template-creation';
import UserCreation from './types/user-creation';

type Props = {
  id: string;
};

export default function TransactionDetails({ id }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: [explorerQueries.transaction, id],
    queryFn: () => apiPublic.activity({ id }),
    select: (data) => data.activity,
  });

  // const { data: transactionData } = useQuery({
  //   queryKey: [explorerQueries.transaction_arweave, data?.arweaveUrl],
  //   queryFn: async () => {
  //     const response = await fetch(data?.arweaveUrl as string);
  //     if (!response.ok) {
  //       throw new Error('Network error to get arweave data');
  //     }

  //     return response.json();
  //   },
  //   enabled: !!data?.arweaveUrl,
  // });

  console.log(data);

  const displayDetails = (data: ActivityQuery['activity']) => {
    switch (data.action) {
      case ActivityAction.UserCreate:
        console.log('hello');
        return <UserCreation data={data} />;
      case ActivityAction.OrganizationCreate:
        return <OrgCreation data={data} />;
      case ActivityAction.OrganizationUpdate:
        return <OrgCreation data={data} />;
      case ActivityAction.PdaIssuance:
        return <PDA data={data} />;
      case ActivityAction.PdaUpdate:
        return <PDA data={data} />;
      case ActivityAction.PdaStatusChange:
        return <PDA data={data} />;
      // case ActivityAction.RequestCreate:
      //   return <RequestCreation data={data} />;
      // case ActivityAction.RequestStatusChange:
      //   return <RequestCreation data={data} />;
      // case ActivityAction.RequestTemplateCreate:
      //   return <RequestTemplateCreation data={data} />;
      // case ActivityAction.DatamodelCreate:
      //   return <DataModelCreation data={data} />;
      // case ActivityAction.ProofCreate:
      //   return <ProofCreation data={data} />;
      // case ActivityAction.ProofStatusChange:
      //   return <ProofCreation data={data} />;
    }
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
            <CardRow title={transaction_detail.transaction_id}>
              <Typography variant="body1">
                {isLoading ? <Skeleton variant="text" width={400} /> : id}
              </Typography>
              {/* {data && (
                <ExternalLink
                  iconSxProps={{ fontSize: 20, color: 'text.primary' }}
                  href={data?.arweaveUrl as string}
                  text=""
                />
              )} */}
            </CardRow>
            {/* <CardRow title={transaction_detail.action}>
              {isLoading ? (
                <Skeleton width={100} />
              ) : (
                <Chip
                  label={
                    <ActionDetail action={data?.action as TransactionAction} />
                  }
                />
              )}
            </CardRow> */}
            {data && displayDetails(data)}
          </Stack>
        </Box>
      </Container>
      {/* {transactionData && (
        <TransactionData data={JSON.stringify(transactionData)} />
      )} */}
    </>
  );
}
