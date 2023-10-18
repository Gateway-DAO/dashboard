import { Session } from 'next-auth';

import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';
import { getPrivateApi } from '@/services/protocol/api';

import { Typography } from '@mui/material';

import DataModelsTable from './components/data-models-table';

export default async function DashboardUserDataModelsPage() {
  const privateApi = await getPrivateApi();
  const session = (await getGtwServerSession()) as Session;
  const requestsData =
    (
      await privateApi.dataModels({
        creatorUserId: session.user.id,
        skip: 0,
        take: 5,
      })
    )?.dataModels ?? [];

  const count = (await privateApi.myDataModelsCount()).myDataModelsCount;

  return (
    <>
      {requestsData && requestsData.length > 0 ? (
        <DataModelsTable data={requestsData} totalCount={count} />
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%' }}
        >
          No data models yet
        </Typography>
      )}
    </>
  );
}
