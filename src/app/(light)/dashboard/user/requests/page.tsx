import { requests } from '@/locale/en/request';
import { getApiPrivate } from '@/services/protocol/api';

import { Typography } from '@mui/material';

import RequestsTable from './components/requests-table';

export default async function DashboardUserDataRequestsPage() {
  const privateApi = await getApiPrivate();
  const requestsData = (await privateApi.requests())?.dataRequests ?? [];

  return (
    <>
      {requestsData && requestsData.length > 0 && (
        <RequestsTable data={requestsData} />
      )}
      {requestsData && requestsData.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%' }}
        >
          {requests.empty}
        </Typography>
      )}
    </>
  );
}
