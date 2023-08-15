import { PropsWithChildren } from "react";

import GTWTab from "@/components/tabs/gtw-tab";
import GTWTabs from "@/components/tabs/gtw-tabs-links";
import { NEGATIVE_CONTAINER_PX } from "@/theme/config/style-tokens";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function DataAssetsLayout({ children }: PropsWithChildren) {

  return (
    <>
      <Typography variant="h3">My data access</Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', ml: NEGATIVE_CONTAINER_PX }}>
        <GTWTabs>
          <GTWTab label="Private" href="/dashboard/user/data-assets" />
          <GTWTab label="Shared With" href="/dashboard/user/data-assets/shared-with" />
        </GTWTabs>
      </Box>
      {children}
    </>
  )
}
