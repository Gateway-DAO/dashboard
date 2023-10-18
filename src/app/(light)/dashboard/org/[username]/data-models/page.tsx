import { getPrivateApi } from '@/services/protocol/api';
import { OrganizationIdentifierType } from '@/services/protocol/types';

import DataModelsTable from './components/data-models-table';

export default async function DashboardOrgDataModelsPage(props: any) {
  const privateApi = await getPrivateApi();
  const pathnameOrg = props.params?.username;

  const requestsData =
    (
      await privateApi.dataModelsByOrg({
        organization: {
          type: OrganizationIdentifierType.GatewayId,
          value: pathnameOrg,
        },
        skip: 0,
        take: 5,
      })
    )?.dataModels ?? [];

  const count = (
    await privateApi.dataModelsCountOrg({
      organization: {
        type: OrganizationIdentifierType.GatewayId,
        value: pathnameOrg,
      },
    })
  ).dataModelsCount;

  return <DataModelsTable data={requestsData} totalCount={count} />;
}
