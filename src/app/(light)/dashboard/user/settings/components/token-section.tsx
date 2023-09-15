"use client";

import CopyPaste from "@/components/copy-paste/copy-paste";
import { useSession } from "@/context/session-provider";

import { Stack, TextField, Typography } from "@mui/material";

export default function TokenSection() {
  const { session } = useSession();

  return (
    <Stack spacing={3} alignItems="flex-start" sx={{ pb: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>API Session Token</Typography>
      {/* <TextField disabled value={session.token} fullWidth sx={{ maxWidth: 500 }} InputProps={{
        endAdornment: <CopyPaste
      }} /> */}
      <CopyPaste limit={20} text={session.token} />
    </Stack>
  )
}
