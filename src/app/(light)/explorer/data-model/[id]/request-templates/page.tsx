import { apiPublic } from '@/services/protocol/api';
import { PageProps } from '@/types/next';

import DataModelDetailHeader from '../components/header';

export default async function DataModelRequestTemplates({
  params: { id },
}: PageProps<{ id: string }>) {
  const { dataModel } =
    await apiPublic.explorer_data_model_detail_request_templates({ id });

  return (
    <>
      <DataModelDetailHeader dataModel={dataModel} />
    </>
  );
}
