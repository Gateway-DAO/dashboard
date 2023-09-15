"use client";

import CopyButton from "@/components/copy-button/copy-button";
import { useSession } from "@/context/session-provider";
import { settings } from "@/locale/en/settings";

import { Box, Stack, TextField, Typography } from "@mui/material";

export default function DeveloperPortal() {
  const { session } = useSession();

  return (
    <Stack spacing={3} alignItems="flex-start" sx={{ pb: 2 }}>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>{settings.developer_portal.title}</Typography>
        <Typography>{settings.developer_portal.description}</Typography>
      </Box>
      <CopyButton text={session.token} />
    </Stack>
  )
}
