import { Metadata } from 'next';

import { requestTemplates } from '@/locale/en/request-template';
import { getPrivateApi } from '@/services/protocol/api';
import { OrganizationIdentifierType } from '@/services/protocol/types';

import { Typography } from '@mui/material';

import DataModelsTable from './components/data-models-table';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Created Data Request Templates - Gateway Network',
  };
}

export default async function DashboardOrgMyDataRequestTemplates(props: any) {
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
  ).dataRequestTemplatesCount;

  return (
    <>
      {requestsData && requestsData.length > 0 && (
        <DataModelsTable data={requestsData} totalCount={count} />
      )}
      {requestsData && requestsData.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%' }}
        >
          {requestTemplates.empty}
        </Typography>
      )}
    </>
  );
}
