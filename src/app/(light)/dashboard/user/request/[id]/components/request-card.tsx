"use client";

import GTWAvatar from "@/components/gtw-avatar/gtw-avatar";

import { Box, Button, Divider, Stack, Typography, alpha } from "@mui/material";

export default function RequestCard() {
  return (
    <Box sx={{
      backgroundColor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
      borderRadius: 1
    }}>
      <Box sx={{ p: 2 }}>
        <Typography component="p" variant="caption" color="text.secondary" sx={{ mb: 2 }}>Requested by</Typography>
        <Stack direction="row" alignItems="center" gap={2}>
          <GTWAvatar name="chase" /> <Typography variant="h5">Chase</Typography>
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="h5">{"You're ready to proceed"}</Typography>
        <Typography >Chase is requesting to access your private data assets</Typography>
        <Stack direction="row" gap={1} sx={{ mt: 3 }}>
          <Button variant="contained" color="primary">Authorize</Button>
          <Button variant="outlined" color="primary">Reject</Button>
        </Stack>
      </Box>
    </Box>
  );
}
