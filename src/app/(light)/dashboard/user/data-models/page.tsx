import { Session } from 'next-auth';

import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';
import { getPrivateApi } from '@/services/protocol/api';
import { UserIdentifierType } from '@/services/protocol/types';

import DataModelsTable from './components/data-models-table';

export default async function DashboardUserDataModelsPage() {
  const privateApi = await getPrivateApi();
  const session = (await getGtwServerSession()) as Session;
  const requestsData =
    (
      await privateApi.dataModels({
        user: {
          type: UserIdentifierType.GatewayId,
          value: session.user.gatewayId as string,
        },
        skip: 0,
        take: 5,
      })
    )?.dataModels ?? [];

  const count = (
    await privateApi.dataModelsCount({
      user: {
        type: UserIdentifierType.GatewayId,
        value: session.user.gatewayId as string,
      },
    })
  ).dataModelsCount;

  return <DataModelsTable data={requestsData} totalCount={count} />;
}
