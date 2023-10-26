import { apiPublic } from '@/services/protocol/api';
import { PageProps } from '@/types/next';

import DataModelDetailHeader from '../components/header';

export default async function DataModelIssuersPage({
  params: { id },
}: PageProps<{ id: string }>) {
  const { dataModel } = await apiPublic.explorer_data_model_detail_issuers({
    id,
  });

  return (
    <>
      <DataModelDetailHeader dataModel={dataModel} />
    </>
  );
}
