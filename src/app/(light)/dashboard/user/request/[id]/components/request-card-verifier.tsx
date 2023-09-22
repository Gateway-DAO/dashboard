'use client';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { request } from '@/locale/en/request';
import { DataResourceStatus } from '@/services/protocol/types';

import { Box, Divider, Stack, Typography, alpha } from '@mui/material';

type Props = {
  recipient: string;
  status: DataResourceStatus;
  profilePicture?: string;
  // requestId: string;
  // proofId?: string;
  // requestValidData: PartialDeep<
  //   DataRequestValidDataQuery['findValidPDAsForRequest']
  // > | null;
  // isOwner: boolean;
};

export default function RequestCardVerfierView({
  status,
  recipient,
  profilePicture,
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
    </Box>
  );
}
