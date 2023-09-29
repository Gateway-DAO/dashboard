'use client';

import Link from 'next/link';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import routes from '@/constants/routes';
import { common } from '@/locale/en/common';
import { request } from '@/locale/en/request';
import { DataResourceStatus } from '@/services/protocol/types';

import { Box, Button, Divider, Stack, Typography, alpha } from '@mui/material';

type Props = {
  recipient: string;
  status: DataResourceStatus;
  profilePicture?: string;
  proofId?: string;
};

export default function RequestCardVerfierView({
  status,
  recipient,
  profilePicture,
  proofId,
}: Props) {
  return (
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
          {request.request_card_verifier.title}
        </Typography>
        <Stack direction="row" alignItems="center" gap={2}>
          <GTWAvatar name={recipient} src={profilePicture} />{' '}
          <Typography variant="h5">{recipient}</Typography>
        </Stack>
      </Box>
      {status === DataResourceStatus.Rejected && (
        <>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography variant="h5">
              {request.request_card_verifier.content.rejected.title}
            </Typography>
            <Typography>
              {request.request_card_verifier.content.rejected.description(
                recipient
              )}
            </Typography>
          </Box>
        </>
      )}
      {status === DataResourceStatus.Accepted && (
        <>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography variant="h5">
              {request.request_card_verifier.content.accepted.title}
            </Typography>
            <Typography>
              {request.request_card_verifier.content.accepted.description(
                recipient
              )}
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
          </Box>
        </>
      )}
    </Box>
  );
}
