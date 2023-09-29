import { getPrivateApi } from '@/services/protocol/api';

import RequestsTable from './components/requests-table';

export default async function OrganizationRequestsPage() {
  const privateApi = await getPrivateApi();
  const requestsData =
    (await privateApi.myRequestsReceived({ skip: 0, take: 5 }))
      ?.requestsReceived ?? [];
  console.log('requestsData', requestsData);
  const count = (await privateApi.requestsCount()).requestsReceivedCount;

  return <RequestsTable data={requestsData} totalCount={count} />;
}
