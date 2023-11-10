import { explorerVerifiers } from '@/locale/en/request-template';
import { apiPublic } from '@/services/protocol/api';
import { PageProps } from '@/types/next';

import { Container, Typography } from '@mui/material';

import DataModelDetailHeader from '../components/header';
import VerifiersTable from './components/verifiers-table';

export default async function RequestTemplatesVerifiersPage({
  params: { id },
}: PageProps<{ id: string }>) {
  const { dataRequestTemplate } =
    await apiPublic.explorer_request_template_detail_overview({
      id,
    });
  const verifiersByDataRequestTemplate =
    (
      await apiPublic.explorer_verifiers_by_data_request_template({
        id,
      })
    )?.verifiersByDataRequestTemplate ?? [];

  const count = 0;

  return (
    <>
      <DataModelDetailHeader
        id={id}
        title={dataRequestTemplate?.name as string}
        tags={dataRequestTemplate!.tags!}
      />
      <Container sx={{ pb: 4 }}>
        {verifiersByDataRequestTemplate &&
          verifiersByDataRequestTemplate.length > 0 && (
            <VerifiersTable
              id={dataRequestTemplate?.id as string}
              data={verifiersByDataRequestTemplate}
              totalCount={count}
            />
          )}
        {verifiersByDataRequestTemplate &&
          verifiersByDataRequestTemplate.length === 0 && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: 'center', width: '100%' }}
            >
              {explorerVerifiers.empty}
            </Typography>
          )}
      </Container>
    </>
  );
}
