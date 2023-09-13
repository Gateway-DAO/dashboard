import { getPrivateApi } from '@/services/protocol/api';

import RequestsTable from './components/requests-table';

export default async function DashboardUserDataRequestsPage() {
  const privateApi = await getPrivateApi();
  const requestsData =
    (await privateApi.myDataRequests({ skip: 0, take: 5 }))?.requestsReceived ??
    [];

  return <RequestsTable data={requestsData} />;
}
