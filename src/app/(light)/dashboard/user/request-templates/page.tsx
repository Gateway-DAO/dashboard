import { getPrivateApi } from '@/services/protocol/api';

import RequestTemplatesTable from './components/request-templates-table';

export default async function DashboardUserDataRequestTemplatesPage() {
  const privateApi = getPrivateApi();
  const count = (await (await privateApi).myDataRequestTemplatesCount())
    .myDataRequestTemplatesCount;

  return <RequestTemplatesTable data={[]} totalCount={count} />;
}
