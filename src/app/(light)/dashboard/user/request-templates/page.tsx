import { Metadata } from 'next';
import { Session } from 'next-auth';

import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';
import { getPrivateApi } from '@/services/protocol/api';
import { UserIdentifierType } from '@/services/protocol/types';

import { Typography } from '@mui/material';

import RequestTemplatesTable from './components/request-templates-table';

export const metadata: Metadata = {
  title: 'Data Request Templates - Gateway Network',
};

export default async function DashboardUserDataRequestTemplatesPage() {
  const privateApi = await getPrivateApi();
  const session = (await getGtwServerSession()) as Session;
  const requestsData =
    (
      await privateApi.dataRequestTemplates({
        user: {
          type: UserIdentifierType.GatewayId,
          value: session.user.gatewayId as string,
        },
        skip: 0,
        take: 5,
      })
    )?.dataRequestTemplates ?? [];
  const count = (
    await privateApi.dataRequestTemplatesCount({
      user: {
        type: UserIdentifierType.GatewayId,
        value: session.user.gatewayId as string,
      },
    })
  ).myDataRequestTemplatesCount;

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
