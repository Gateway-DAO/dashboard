import { Metadata } from 'next';
import { Session } from 'next-auth';

import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';
import { getPrivateApi } from '@/services/protocol/api';
import { UserIdentifierType } from '@/services/protocol/types';

import RequestsTable from './components/requests-table';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Received Data Requests - Gateway Network',
  };
}

export default async function DashboardUserDataRequestsPage() {
  const privateApi = await getPrivateApi();
  const session = (await getGtwServerSession()) as Session;
  const requestsData =
    (
      await privateApi.myRequestsReceived({
        skip: 0,
        take: 5,
      })
    )?.requestsReceived ?? [];
  const count = (
    await privateApi.requestsCount({
      verifier: {
        type: UserIdentifierType.GatewayId,
        value: session.user.gatewayId as string,
      },
    })
  ).requestsReceivedCount;

  return <RequestsTable data={requestsData} totalCount={count} />;
}
