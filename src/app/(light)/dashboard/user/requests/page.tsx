import { requests } from "@/locale/en/request";
import { getApiPrivate } from "@/services/protocol/api";
import { DataRequest, DataResourceStatus } from "@/services/protocol/types"
import { PartialDeep } from "type-fest";

import { Box, Typography } from "@mui/material";

import RequestsTable from "./components/requests-table";

export default async function DashboardUserDataRequestsPage() {
  const privateApi = await getApiPrivate();
  const requestsData = (await privateApi.requests())?.dataRequests ?? [];

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
      <RequestsTable data={requestsData} />
    </Box>
  );
}
