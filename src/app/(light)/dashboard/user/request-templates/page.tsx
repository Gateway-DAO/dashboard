import { Session } from 'next-auth';

import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';
import { getPrivateApi } from '@/services/protocol/api';

import { Typography } from '@mui/material';

import RequestTemplatesTable from './components/request-templates-table';

export default async function DashboardUserDataRequestTemplatesPage() {
  const privateApi = await getPrivateApi();
  const session = (await getGtwServerSession()) as Session;
  const requestsData =
    (
      await privateApi.dataRequestTemplates({
        creatorID: session.user.gatewayId,
        skip: 0,
        take: 5,
      })
    )?.dataRequestTemplates ?? [];
  const count = (await privateApi.myDataRequestTemplatesCount())
    .myDataRequestTemplatesCount;

  return (
    <>
      {requestsData && requestsData.length > 0 ? (
        <RequestTemplatesTable data={requestsData} totalCount={count} />
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%' }}
        >
          No data request templates yet
        </Typography>
      )}
    </>
  );
}
