'use client';

import ExplorerFeaturedSection from '@/app/(light)/explorer/components/featured-section/featured-section';
import { issuePda } from '@/locale/en/pda';
import { apiPublic } from '@/services/protocol/api';
import { useQuery } from '@tanstack/react-query';

import DataModelCard from './data-model-card';

export default function DataModelsFeatured() {
  const dataModels = useQuery({
    queryKey: ['data-models-featured'],
    queryFn: () => apiPublic.explorer_data_models_featured(),
  });
  return (
    <ExplorerFeaturedSection
      title={issuePda.featured}
      isLoading={dataModels.isLoading}
    >
      {dataModels.data?.dataModels.map((dataModel) => (
        <DataModelCard
          dataModel={dataModel}
          image="/images/signup-background.png"
          key={dataModel.id}
        />
      ))}
    </ExplorerFeaturedSection>
  );
}
