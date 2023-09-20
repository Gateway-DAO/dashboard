'use client';

import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import { useState } from 'react';

import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import Loading from '@/components/loadings/loading/loading';
import { mutations } from '@/constants/queries';
import routes from '@/constants/routes';
import { useGtwSession } from '@/context/gtw-session-provider';
import { common } from '@/locale/en/common';
import { errorMessages } from '@/locale/en/errors';
import { request } from '@/locale/en/request';
import {
  Create_Proof_From_RequestMutationVariables,
  DataResourceStatus,
  Reject_RequestMutationVariables,
} from '@/services/protocol/types';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { Box, Button, Divider, Stack, Typography, alpha } from '@mui/material';

type Props = {
  requester: string;
  status: DataResourceStatus;
  requestId: string;
  proofId?: string;
};

export default function RequestCard({
  requester,
  status,
  proofId,
  requestId,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { privateApi } = useGtwSession();
  const router = useRouter();
  const [loadingAfter, setLoadingAfter] = useState(false);

  const acceptDataRequest = useMutation({
    mutationKey: [mutations.create_proof_from_request],
    mutationFn: (data: Create_Proof_From_RequestMutationVariables) => {
      return privateApi?.create_proof_from_request(data);
    },
    onSuccess: () => router.refresh(),
    onError: () => enqueueSnackbar(errorMessages.ERROR_TRYING_TO_ISSUE_A_PROOF),
    onSettled: () => {
      setLoadingAfter(true);
      setTimeout(() => setLoadingAfter(false), 2000);
    },
  });

  const rejectDataRequest = useMutation({
    mutationKey: [mutations.reject_data_request],
    mutationFn: (data: Reject_RequestMutationVariables) => {
      return privateApi?.reject_request(data);
    },
    onSuccess: () => router.refresh(),
    onError: () =>
      enqueueSnackbar(errorMessages.ERROR_TRYING_TO_REJECT_A_REQUEST),
    onSettled: () => {
      setLoadingAfter(true);
      setTimeout(() => setLoadingAfter(false), 2000);
    },
  });

  return (
    <>
      {(loadingAfter ||
        acceptDataRequest.isLoading ||
        rejectDataRequest.isLoading) && <Loading fullScreen />}

      <Box
        sx={{
          backgroundColor: (theme) => {
            const color =
              status === DataResourceStatus.Rejected
                ? theme.palette.error.main
                : theme.palette.primary.main;
            const focusOpacity =
              status === DataResourceStatus.Rejected
                ? theme.palette.action.disabledOpacity
                : theme.palette.action.focusOpacity;
            return alpha(color, focusOpacity);
          },
          borderRadius: 1,
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            component="p"
            variant="caption"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {request.request_card.title}
          </Typography>
          <Stack direction="row" alignItems="center" gap={2}>
            <GTWAvatar name="chase" />{' '}
            <Typography variant="h5">{requester}</Typography>
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          {status === DataResourceStatus.Pending && (
            <>
              <Typography variant="h5">
                {request.request_card.content.pending.title}
              </Typography>
              <Typography>
                {request.request_card.content.pending.description(requester)}
              </Typography>
              <Stack direction="row" gap={1} sx={{ mt: 3 }}>
                <LoadingButton
                  variant="contained"
                  color="primary"
                  isLoading={acceptDataRequest.isLoading}
                  onClick={() => acceptDataRequest.mutate({ requestId })}
                >
                  {common.actions.accept}
                </LoadingButton>
                <LoadingButton
                  isLoading={rejectDataRequest.isLoading}
                  variant="outlined"
                  color="primary"
                  onClick={() => rejectDataRequest.mutate({ requestId })}
                >
                  {common.actions.reject}
                </LoadingButton>
              </Stack>
            </>
          )}
          {status === DataResourceStatus.Rejected && (
            <>
              <Typography variant="h5">
                {request.request_card.content.rejected.title}
              </Typography>
              <Typography>
                {request.request_card.content.rejected.description(requester)}
              </Typography>
              <Stack direction="row" gap={1} sx={{ mt: 3 }}>
                <Button variant="outlined" color="inherit">
                  {common.actions.learn_more}
                </Button>
              </Stack>
            </>
          )}
          {status === DataResourceStatus.Accepted && (
            <>
              <Typography variant="h5">
                {request.request_card.content.accepted.title}
              </Typography>
              <Typography>
                {request.request_card.content.accepted.description(requester)}
              </Typography>
              <Stack direction="row" gap={1} sx={{ mt: 3 }}>
                <Button
                  component={Link}
                  href={routes.dashboardUserProof(proofId ?? '')}
                  variant="contained"
                  color="primary"
                >
                  {common.actions.check_data_proof}
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
