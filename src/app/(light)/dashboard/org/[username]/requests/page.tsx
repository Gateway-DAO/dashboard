import { getPrivateApi } from '@/services/protocol/api';
import { getCurrentOrg } from '@/utils/currentOrg';

import RequestsTable from './components/requests-table';

export default async function OrganizationRequestsPage(props: any) {
  const privateApi = await getPrivateApi();
  const pathnameOrg = props.params?.username;

  const organization = await getCurrentOrg(pathnameOrg);
  const requestsData =
    (
      await privateApi.requestsByOrg({
        skip: 0,
        take: 5,
        orgId: organization?.id || '',
      })
    )?.requestsSent ?? [];

  const count = (
    await privateApi.requestsByOrgCount({ orgId: organization?.id ?? '' })
  ).requestsSentCount;

  return <RequestsTable data={requestsData} totalCount={count} />;
}
