import { apiPublic } from '@/services/protocol/api';
import { PageProps } from '@/types/next';

import { Container } from '@mui/system';

import DataModelDetailHeader from '../components/header';
import PlaygroundWrapper from './components/playground-wrapper';

export default async function RequestTemplatesPlaygroundPage({
  params: { id },
}: PageProps<{ id: string }>) {
  const { dataRequestTemplate } =
    await apiPublic.explorer_request_template_detail_verifiers({
      id,
    });

  return (
    <>
      <DataModelDetailHeader
        id={dataRequestTemplate?.id as string}
        title={dataRequestTemplate?.name as string}
        tags={dataRequestTemplate!.tags!}
      />
      <Container sx={{ pb: 4 }}>
        <PlaygroundWrapper id={dataRequestTemplate?.id as string} />
      </Container>
    </>
  );
}
