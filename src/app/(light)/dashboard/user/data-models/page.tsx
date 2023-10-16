import { Session } from 'next-auth';

import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';
import { getPrivateApi } from '@/services/protocol/api';

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
  // const count = (await (await privateApi).myDataRequestTemplatesCount())
  //   .myDataRequestTemplatesCount;

  return <DataModelsTable data={requestsData} totalCount={0} />;
}
