import { Metadata } from 'next';

import { getPrivateApi } from '@/services/protocol/api';

import RequestsTable from './components/requests-table';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Received Data Requests - Gateway Network',
  };
}

export default async function DashboardUserDataRequestsPage() {
  const privateApi = await getPrivateApi();
  const requestsData =
    (
      await privateApi.myRequestsReceived({
        skip: 0,
        take: 5,
      })
    )?.requestsReceived ?? [];
  const count = (await privateApi.requestsCount()).requestsReceivedCount;

  return <RequestsTable data={requestsData} totalCount={count} />;
}
