import { Metadata } from 'next';

import { datamodels } from '@/locale/en/datamodel';
import { getPrivateApi } from '@/services/protocol/api';
import { OrganizationIdentifierType } from '@/services/protocol/types';

import { Typography } from '@mui/material';

import DataModelsTable from './components/data-models-table';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Created Data Models - Gateway Network',
  };
}

export default async function DashboardOrgMyDataModels(props: any) {
  const privateApi = await getPrivateApi();
  const pathnameOrg = props.params?.username;
  const dataModelsData =
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
    await privateApi.dataModelsByOrgCount({
      organization: {
        type: OrganizationIdentifierType.GatewayId,
        value: pathnameOrg,
      },
    })
  ).dataModelsCount;

  return (
    <>
      {dataModelsData && dataModelsData.length > 0 && (
        <DataModelsTable data={dataModelsData} totalCount={count} />
      )}
      {dataModelsData && dataModelsData.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%' }}
        >
          {datamodels.empty}
        </Typography>
      )}
    </>
  );
}
