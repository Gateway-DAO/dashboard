'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import ProofCardInfo from '@/app/(light)/dashboard/user/proof/[id]/components/proof-card-info';
import ProofCardTitle from '@/app/(light)/dashboard/user/proof/[id]/components/proof-card-title';
import { queries } from '@/constants/queries';
import routes from '@/constants/routes';
import { useSession } from '@/context/session-provider';
import { common } from '@/locale/en/common';
import { errorMessages } from '@/locale/en/errors';
import { pda } from '@/locale/en/pda';
import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { CheckOutlined } from '@mui/icons-material';
import LinkIcon from '@mui/icons-material/Link';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';

import IssuePdaFormSuccessSkeleton from './issue-pda-form-successfully-skeleton';

type Props = {
  id: string;
};

export default function IssuePdaFormSuccessfully({ id }: Props) {
  const { privateApi } = useSession();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { data, isFetching, isLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [queries.proof, id],
    queryFn: () =>
      privateApi?.proof({
        id,
      }),
    select: (data) => data?.proof,
  });

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      enqueueSnackbar(common.general.success_copy_message);
    } catch (err) {
      enqueueSnackbar(errorMessages.UNEXPECTED_ERROR, { variant: 'error' });
    }
  };

  return (
    <>
      {isFetching || isLoading ? (
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
          <ProofCardTitle proof={data} />
          <ProofCardInfo proof={data} />
          <Button
            variant="contained"
            id="share-pda-button-check-now"
            sx={{ mb: 1.5 }}
            onClick={() => router.push(routes.dashboardUserProof(id))}
          >
            {common.actions.check_now}
          </Button>
          <Button
            variant="outlined"
            id="share-pda-button-copy-url"
            sx={{ mb: 3 }}
            onClick={() =>
              copy(`${window.location.origin}${routes.dashboardUserProof(id)}`)
            }
          >
            <LinkIcon sx={{ mr: 1 }} />
            {common.actions.copy_url}
          </Button>
        </Stack>
      )}
    </>
  );
}
