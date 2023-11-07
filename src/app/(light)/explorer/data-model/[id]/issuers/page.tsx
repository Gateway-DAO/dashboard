import { explorerDataModels } from '@/locale/en/datamodel';
import { apiPublic } from '@/services/protocol/api';
import { CONTAINER_PX } from '@/theme/config/style-tokens';
import { PageProps } from '@/types/next';

import { Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';

import DataModelDetailHeader from '../components/header';
import IssuersTable from './components/issuers-table';

export default async function DataModelIssuersPage({
  params: { id },
}: PageProps<{ id: string }>) {
  const { dataModel } = await apiPublic.explorer_data_model_detail_issuers({
    id,
  });

  const issuersByDataModel =
    (
      await apiPublic.explorer_issuers_by_data_model({
        id,
      })
    )?.issuersByDataModel ?? [];

  const count = 0;

  return (
    <>
      <DataModelDetailHeader
        id={dataModel.id}
        title={dataModel.title}
        tags={dataModel.tags!}
      />
      <Container sx={{ pb: 4 }}>
        {issuersByDataModel && issuersByDataModel.length > 0 && (
          <IssuersTable
            id={dataModel?.id as string}
            data={issuersByDataModel}
            totalCount={count}
          />
        )}
        {issuersByDataModel && issuersByDataModel.length === 0 && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: 'center', width: '100%' }}
          >
            {explorerDataModels.empty}
          </Typography>
        )}
      </Container>
    </>
  );
}
