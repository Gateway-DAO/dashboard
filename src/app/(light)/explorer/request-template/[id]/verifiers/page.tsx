import { apiPublic } from '@/services/protocol/api';
import { PageProps } from '@/types/next';

import DataModelDetailHeader from '../components/header';

export default async function RequestTemplatesVerifiersPage({
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
    </>
  );
}
