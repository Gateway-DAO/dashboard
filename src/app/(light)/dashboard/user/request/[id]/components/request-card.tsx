"use client";

import Link from "next/link";

import GTWAvatar from "@/components/gtw-avatar/gtw-avatar";
import routes from "@/constants/routes";
import { common } from "@/locale/en/common";
import { request } from "@/locale/en/request";
import { DataResourceStatus } from "@/services/protocol/types";

import { Box, Button, Divider, Stack, Typography, alpha } from "@mui/material";

type Props = {
  requester: string,
  status: DataResourceStatus,
  proofId?: string
}

export default function RequestCard({
  requester,
  status,
  proofId
}: Props) {

  return (
    <Box sx={{
      backgroundColor: (theme) => {
        const color = status === DataResourceStatus.Rejected ? theme.palette.error.main : theme.palette.primary.main;
        const focusOpacity = status === DataResourceStatus.Rejected ? theme.palette.action.disabledOpacity : theme.palette.action.focusOpacity;
        return alpha(color, focusOpacity)
      },
      borderRadius: 1
    }}>
      <Box sx={{ p: 2 }}>
        <Typography component="p" variant="caption" color="text.secondary" sx={{ mb: 2 }}>{request.request_card.title}</Typography>
        <Stack direction="row" alignItems="center" gap={2}>
          <GTWAvatar name="chase" /> <Typography variant="h5">{requester}</Typography>
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        {status === DataResourceStatus.Pending && (<>
          <Typography variant="h5">{request.request_card.content.pending.title}</Typography>
          <Typography >{request.request_card.content.pending.description(requester)}</Typography>
          <Stack direction="row" gap={1} sx={{ mt: 3 }}>
            <Button variant="contained" color="primary">{common.actions.accept}</Button>
            <Button variant="outlined" color="primary">{common.actions.reject}</Button>
          </Stack>
        </>)}
        {status === DataResourceStatus.Rejected && (<>
          <Typography variant="h5">{request.request_card.content.rejected.title}</Typography>
          <Typography >{request.request_card.content.rejected.description(requester)}</Typography>
          <Stack direction="row" gap={1} sx={{ mt: 3 }}>
            <Button variant="outlined" color="inherit">{common.actions.learn_more}</Button>
          </Stack>
        </>)}
        {status === DataResourceStatus.Accepted && (<>
          <Typography variant="h5">{request.request_card.content.accepted.title}</Typography>
          <Typography >{request.request_card.content.accepted.description(requester)}</Typography>
          <Stack direction="row" gap={1} sx={{ mt: 3 }}>
            <Button component={Link} href={routes.dashboardUserProof(proofId ?? "")} variant="contained" color="primary">{common.actions.check_data_proof}</Button>
          </Stack>
        </>)}
      </Box>
    </Box>
  );
}
