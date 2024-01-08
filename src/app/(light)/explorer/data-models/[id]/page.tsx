import { Metadata } from 'next';

import { apiPublic } from '@/services/protocol/api';
import { PageProps } from '@/types/next';

import DataModelContent from './components/data-model-content';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { dataModel } = await apiPublic.explorer_data_model_detail_overview({
    id: params.id,
  });
  return {
    title: `Gateway Data Model - ${dataModel?.title ?? params.id}`,
    description: `Details and stats from how users are using this data model.`,
  };
}

export default async function DataModelPage({
  params: { id },
}: PageProps<{ id: string }>) {
  const { dataModel } = await apiPublic.explorer_data_model_detail_overview({
    id,
  });

  return <DataModelContent dataModel={dataModel} />;
}
