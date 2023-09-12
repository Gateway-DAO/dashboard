import { requests } from "@/locale/en/request";
import { DataRequest, DataResourceStatus } from "@/services/protocol/types"
import { PartialDeep } from "type-fest";

import { Box, Typography } from "@mui/material";

import RequestsTable from "./components/requests-table";

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

const oneHundredMockRequests = Array.from({ length: 100 }, (_, i) => ({ ...mockrequest, id: `${i}` }))

export default function DashboardUserDataRequestsPage() {
  return (
    <Box sx={{ py: 2 }}>
      <Box
        sx={{
          mb: {
            xs: 4,
            md: 5,
            lg: 6,
          },
        }}
      >
        <Typography variant="h3" id="title-requests" sx={{ mb: 1 }}>
          {requests.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">{requests.subtitle}</Typography>
      </Box>
      <RequestsTable data={oneHundredMockRequests} />
    </Box>
  );
}
