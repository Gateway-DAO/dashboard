'use client';
import { useEffect, useState } from 'react';

import ProofCardInfo from '@/app/(light)/dashboard/user/proof/[id]/components/proof-card-info';
import ProofCardTitle from '@/app/(light)/dashboard/user/proof/[id]/components/proof-card-title';
import { common } from '@/locale/en/common';
import { pda } from '@/locale/en/pda';

import { CheckOutlined } from '@mui/icons-material';
import LinkIcon from '@mui/icons-material/Link';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';

import IssuePdaFormSuccessSkeleton from './issue-pda-form-successfully-skeleton';

type Props = {
  id: string;
};

export default function IssuePdaFormSuccessfully({ id }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  // TODO: Remove MOCK
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // TODO: Remove MOCK
  const proof = {
    id,
    title: 'Chase',
    issuance_date: '2018-04-04T16:00:00.000Z',
    status: 'Valid',
    activities: [
      {
        type: 'Issued',
        txHash: 'txhash.com',
        timestamp: '2018-04-04T16:00:00.000Z',
      },
      {
        type: 'Revoked',
        txHash: 'txhash.com',
        timestamp: '2018-04-04T16:00:00.000Z',
      },
    ],
    sharing_cost: 0,
  };

  return (
    <>
      {loading ? (
        <IssuePdaFormSuccessSkeleton />
      ) : (
        <Stack>
          <Box sx={{ position: 'absolute', top: { xs: 24, md: 48 } }}>
            <Avatar
              sx={{ backgroundColor: 'success.main', color: 'action.active' }}
            >
              <CheckOutlined />
            </Avatar>
          </Box>
          <Typography fontSize={34} sx={{ mb: 6 }}>
            {pda.share.successfully_title}
          </Typography>
          <ProofCardTitle proof={proof} />
          <ProofCardInfo proof={proof} />
          <Button
            variant="contained"
            id="share-pda-button-check-now"
            sx={{ mb: 1.5 }}
          >
            {common.actions.check_now}
          </Button>
          <Button
            variant="outlined"
            id="share-pda-button-copy-url"
            sx={{ mb: 3 }}
          >
            <LinkIcon sx={{ mr: 1 }} />
            {common.actions.copy_url}
          </Button>
        </Stack>
      )}
    </>
  );
}
