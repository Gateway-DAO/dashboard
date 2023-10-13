import { Session } from 'next-auth';

import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';
import { getPrivateApi } from '@/services/protocol/api';

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
  const count = (await (await privateApi).myDataRequestTemplatesCount())
    .myDataRequestTemplatesCount;

  return <RequestTemplatesTable data={requestsData} totalCount={count} />;
}
