import { explorerDataModelRequestTemplates } from '@/locale/en/datamodel';
import { apiPublic } from '@/services/protocol/api';
import { PageProps } from '@/types/next';

import { Typography } from '@mui/material';
import { Container } from '@mui/system';

import DataModelDetailHeader from '../components/header';
import RequestTemplatesTable from './components/request-templates-table';

export default async function DataModelRequestTemplates({
  params: { id },
}: PageProps<{ id: string }>) {
  const { dataModel } =
    await apiPublic.explorer_data_model_detail_request_templates({ id });

  const requestTemplatesByDataModel =
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
        {requestTemplatesByDataModel &&
          requestTemplatesByDataModel.length > 0 && (
            <RequestTemplatesTable
              id={dataModel?.id as string}
              data={requestTemplatesByDataModel}
              totalCount={count}
            />
          )}
        {requestTemplatesByDataModel &&
          requestTemplatesByDataModel.length === 0 && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: 'center', width: '100%' }}
            >
              {explorerDataModelRequestTemplates.empty}
            </Typography>
          )}
      </Container>
    </>
  );
}
