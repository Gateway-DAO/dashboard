import { getPrivateApi } from '@/services/protocol/api';

import RequestTemplatesTable from './components/request-templates-table';

export default async function DashboardOrgDataRequestTemplatesPage(props: any) {
  const privateApi = await getPrivateApi();
  const pathnameOrg = props.params?.username;

  const requestsData =
    (
      await privateApi.dataRequestTemplatesByOrg({
        orgCreatorId: pathnameOrg,
        skip: 0,
        take: 5,
      })
    )?.dataRequestTemplates ?? [];

  const count = (
    await privateApi.myDataRequestTemplatesCountOrg({
      orgGatewayId: pathnameOrg,
    })
  ).myDataRequestTemplatesCount;

  return <RequestTemplatesTable data={requestsData} totalCount={count} />;
}
