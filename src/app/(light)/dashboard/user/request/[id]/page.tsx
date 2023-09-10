import Link from "next/link";

import GTWAvatar from "@/components/gtw-avatar/gtw-avatar";
import routes from "@/constants/routes";
import { DataRequest, DataResourceStatus } from "@/services/protocol/types";
import { PageProps } from "@/types/next";
import { PartialDeep } from "type-fest";

import { Box, Stack, Typography, alpha } from "@mui/material";

const mockrequest: PartialDeep<DataRequest> = {
  id: "1",
  createdAt: "2021-10-13T14:00:00.000Z",
  status: DataResourceStatus.Accepted,
  proofs: [],
  userVerifier: {
    id: "1",
    gatewayId: "user"
  },
  dataRequestTemplate: {
    id: "121321213213",
  }
}

function RequestCard() {
  return (
    <Box sx={{}}>
      <Typography variant="caption">Requested by</Typography>
      <Stack direction="row" gap={2}>
        <GTWAvatar name="chase" /> <Typography>Chase</Typography>
      </Stack>
    </Box>
  )
}

export default function DashboardUserDataRequest({ params: { id } }: PageProps<{ id: string }>) {
  return (
    <>
      <Typography variant="h3" component="h2">
        {mockrequest.id}
      </Typography>
      <RequestCard />
      <p>Open <Link href={{
        query: {
          back: routes.dashboardUserRequest(id)
        },
        pathname: routes.dashboardUserProof("mock")
      }}>proof</Link></p>
    </>
  )
}
