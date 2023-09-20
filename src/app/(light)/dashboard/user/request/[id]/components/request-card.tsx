'use client';

import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';

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

  const acceptDataRequest = useMutation({
    mutationKey: [mutations.create_proof_from_request],
    mutationFn: (data: Create_Proof_From_RequestMutationVariables) => {
      return privateApi?.create_proof_from_request(data);
    },
    onSuccess: () => router.refresh(),
    onError: () => enqueueSnackbar(errorMessages.ERROR_TRYING_TO_ISSUE_A_PROOF),
  });

  return (
    <>
      {acceptDataRequest.isLoading && <Loading />}
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    acceptDataRequest.mutate({ requestId: requestId })
                  }
                >
                  {common.actions.accept}
                </Button>
                <Button variant="outlined" color="primary">
                  {common.actions.reject}
                </Button>
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
