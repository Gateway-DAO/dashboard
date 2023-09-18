import { NEGATIVE_CONTAINER_PX } from "@/theme/config/style-tokens";

import { Box, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";

import EmailsSection from "./account-sections/emails-section";
import SocialsSection from "./account-sections/socials-section";
import WalletsSection from "./account-sections/wallets-section";

export default function ConnectedAccounts() {
  return <Box sx={{
    ".MuiListItem-root": {
      minHeight: 72,
    }
  }}>
    <Typography variant="h5" sx={{ mb: 1 }}>Connected Accounts</Typography>
    <Typography variant="body1" color="text.secondary">These are the accounts you connected to your Gateway ID to log in and receive private data assets. You can disconnect or connect more accounts here.</Typography>
    <Stack divider={<Divider sx={{ mx: NEGATIVE_CONTAINER_PX }} />}>
      <EmailsSection />
      <WalletsSection />
      <SocialsSection />
    </Stack>
  </Box>;
}



