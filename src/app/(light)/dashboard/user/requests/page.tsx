import { getApiPrivate } from '@/services/protocol/api';

import RequestsTable from './components/requests-table';

export default async function DashboardUserDataRequestsPage() {
  const privateApi = await getApiPrivate();
  const requestsData =
    (await privateApi.myDataRequests({ skip: 0, take: 6 }))?.requestsReceived ??
    [];

  return <RequestsTable data={requestsData} />;
}
