import { Metadata } from 'next';

import { getPrivateApi } from '@/services/protocol/api';
import { OrganizationIdentifierType } from '@/services/protocol/types';

import { Typography } from '@mui/material';

import RequestTemplatesTable from './components/request-templates-table';

export const metadata: Metadata = {
  title: 'Data Request Templates - Gateway Network',
};

export default async function DashboardOrgDataRequestTemplatesPage(props: any) {
  const privateApi = await getPrivateApi();
  const pathnameOrg = props.params?.username;

  const requestsData =
    (
      await privateApi.dataRequestTemplatesByOrg({
        organization: {
          type: OrganizationIdentifierType.GatewayId,
          value: pathnameOrg,
        },
        skip: 0,
        take: 5,
      })
    )?.dataRequestTemplates ?? [];

  const count = (
    await privateApi.dataRequestTemplatesByOrgCount({
      organization: {
        type: OrganizationIdentifierType.GatewayId,
        value: pathnameOrg,
      },
    })
  ).myDataRequestTemplatesCount;

  return (
    <>
      {requestsData && requestsData.length > 0 ? (
        <RequestTemplatesTable data={requestsData} totalCount={count} />
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%' }}
        >
          No data request templates yet
        </Typography>
      )}
    </>
  );
}
