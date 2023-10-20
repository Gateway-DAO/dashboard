import { Metadata } from 'next';
import { Session } from 'next-auth';

import { datamodels } from '@/locale/en/datamodel';
import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';
import { getPrivateApi } from '@/services/protocol/api';
import { UserIdentifierType } from '@/services/protocol/types';

import { Typography } from '@mui/material';

import DataModelsTable from './components/request-templates-table';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Created Data Request Templates - Gateway Network',
  };
}

export default async function DashboardUserMyRequestTemplates() {
  const privateApi = await getPrivateApi();
  const session = (await getGtwServerSession()) as Session;
  const requestsData =
    (
      await privateApi.dataRequestTemplatesByUser({
        user: {
          type: UserIdentifierType.GatewayId,
          value: session.user.gatewayId as string,
        },
        skip: 0,
        take: 5,
      })
    )?.dataRequestTemplates ?? [];
  const count = (
    await privateApi.dataRequestTemplatesByUserCount({
      user: {
        type: UserIdentifierType.GatewayId,
        value: session.user.gatewayId as string,
      },
    })
  ).dataRequestTemplatesCount;

  return (
    <>
      {requestsData && requestsData.length > 0 && (
        <DataModelsTable data={requestsData} totalCount={count} />
      )}
      {requestsData && requestsData.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%' }}
        >
          {datamodels.empty}
        </Typography>
      )}
    </>
  );
}
