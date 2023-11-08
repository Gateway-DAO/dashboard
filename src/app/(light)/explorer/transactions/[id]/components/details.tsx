'use client';
import React from 'react';

import ExternalLink from '@/components/external-link/external-link';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { TextStatusChip } from '@/components/text-status-chip/text-status-chip';
import { DATE_FORMAT } from '@/constants/date';
import { explorerQueries } from '@/constants/queries';
import routes from '@/constants/routes';
import { transaction_detail } from '@/locale/en/transaction';
import { PdaStatus } from '@/services/protocol/types';
import { numberToMoneyString } from '@/utils/money';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

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

type Props = {
  id: string;
};

type User = {
  id: string;
  gatewayId?: string;
  name?: string;
  image?: string;
};

type Transaction = {
  type: string;
  pda_id: string;
  arweave_url: string;
  issuer: User;
  signed_by: User;
  data_model_id: string;
  created_at: string;
  cost: number;
  status: PdaStatus;
};

const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const fetchTransaction = async (): Promise<Transaction> => {
  await wait(1500);
  const mock: Transaction = {
    type: 'PDA issuance',
    pda_id: '6cfd080c-58c0-4c28-b34a-dc0bd11b2ec6',
    arweave_url: 'http://andrefelizardo.com.br',
    issuer: {
      id: 'c68d70c8-53fe-4f4c-a1a4-80064c3be0e1',
      gatewayId: 'spotify',
      name: 'Spotify',
    },
    signed_by: {
      id: 'd7a05292-2c01-4e45-ae96-56fa7f25ad6b',
      gatewayId: 'oxford',
    },
    data_model_id: '2cc6e362-c146-40c8-b1b8-6eace653121d',
    created_at: '2023-10-10T18:51:29.941Z',
    cost: 0.15,
    status: PdaStatus.Valid,
  };
  return mock;
};

type UserColum = {
  isLoading: boolean;
  user: User | undefined;
};

const UserColumn = ({ user, isLoading = true }: UserColum) => {
  return (
    <Stack direction="row" gap={1.5} alignItems="center">
      {isLoading ? (
        <Skeleton variant="circular" width={40} height={40} />
      ) : (
        <GTWAvatar name={user?.id} src={user?.image} />
      )}
      <Box>
        <Typography variant="subtitle1" lineHeight={1}>
          {isLoading ? (
            <Skeleton width={200} />
          ) : (
            user?.name ?? user?.gatewayId ?? user?.id
          )}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {isLoading ? (
            <Skeleton width={100} />
          ) : user?.name ? (
            `@${user?.gatewayId}`
          ) : (
            ''
          )}
        </Typography>
      </Box>
    </Stack>
  );
};

export default function TransactionDetails({ id }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: [explorerQueries.transaction, id],
    queryFn: async () => (await fetchTransaction()) as Transaction,
  });

  return (
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
            {data && (
              <ExternalLink
                iconSxProps={{ fontSize: 20, color: 'text.primary' }}
                href={data?.arweave_url as string}
                text=""
              />
            )}
          </CardRow>
          <CardRow title={transaction_detail.action}>
            {isLoading ? <Skeleton width={100} /> : <Chip label={data?.type} />}
          </CardRow>
          <CardRow title={transaction_detail.pda_id}>
            <Typography variant="body1">
              {isLoading ? (
                <Skeleton variant="text" width={300} />
              ) : (
                data?.pda_id
              )}
            </Typography>
          </CardRow>
          <CardRow title={transaction_detail.issuer}>
            <UserColumn user={data?.issuer} isLoading={isLoading} />
          </CardRow>
          <CardRow title={transaction_detail.signed_by}>
            <UserColumn user={data?.signed_by} isLoading={isLoading} />
          </CardRow>
          <CardRow title={transaction_detail.data_model_id}>
            <Typography variant="body1">
              {isLoading ? (
                <Skeleton variant="text" width={400} />
              ) : (
                data?.data_model_id
              )}
            </Typography>
            {data && (
              <ExternalLink
                iconSxProps={{ fontSize: 20, color: 'text.primary' }}
                href={routes.explorer.dataModel(data.data_model_id)}
                text=""
              />
            )}
          </CardRow>
          <CardRow title={transaction_detail.created_at}>
            <Typography variant="body1">
              {isLoading ? (
                <Skeleton variant="text" width={200} />
              ) : (
                dayjs(data?.created_at).format(DATE_FORMAT)
              )}
            </Typography>
          </CardRow>
          <CardRow title={transaction_detail.cost}>
            {isLoading ? (
              <Skeleton variant="text" width={100} />
            ) : (
              numberToMoneyString(data?.cost ?? 0)
            )}
          </CardRow>
          <CardRow title={transaction_detail.status}>
            {isLoading ? (
              <Skeleton width={30} />
            ) : (
              <TextStatusChip status={data?.status as PdaStatus} />
            )}
          </CardRow>
        </Stack>
      </Box>
    </Container>
  );
}
