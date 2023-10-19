import { Metadata } from 'next';
import { Session } from 'next-auth';

import { datamodels } from '@/locale/en/datamodel';
import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';
import { getPrivateApi } from '@/services/protocol/api';
import { UserIdentifierType } from '@/services/protocol/types';

import { Typography } from '@mui/material';

import DataModelsTable from './components/data-models-table';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Created Data Models - Gateway Network',
  };
}

export default async function DashboardUserMyDataModels() {
  const privateApi = await getPrivateApi();
  const session = (await getGtwServerSession()) as Session;
  const dataModelsData =
    (
      await privateApi.dataModelsByUser({
        user: {
          type: UserIdentifierType.GatewayId,
          value: session.user.gatewayId as string,
        },
        skip: 0,
        take: 5,
      })
    )?.dataModels ?? [];

  const count = (
    await privateApi.dataModelsByUserCount({
      user: {
        type: UserIdentifierType.GatewayId,
        value: session.user.gatewayId as string,
      },
    })
  ).dataModelsCount;

  return (
    <>
      {dataModelsData && dataModelsData.length > 0 && (
        <DataModelsTable data={dataModelsData} totalCount={count} />
      )}
      {dataModelsData && dataModelsData.length === 0 && (
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
