'use client';

import DataModelCard from '@/components/data-model-card/data-model-card';
import FeaturedSection from '@/components/featured-section/featured-section';
import { explorerQueries } from '@/constants/queries';
import { explorerDataModels } from '@/locale/en/datamodel';
import { apiPublic } from '@/services/protocol/api';
import { useQuery } from '@tanstack/react-query';

export default function DataModelsExplorerFeatured() {
  const dataModels = useQuery({
    queryKey: [explorerQueries.featured_data_models],
    queryFn: () => apiPublic.explorer_data_models_featured(),
  });
  return (
    <FeaturedSection
      title={explorerDataModels.featuredTitle}
      isLoading={dataModels.isLoading}
    >
      {dataModels.data?.dataModels.map((dataModel) => (
        <DataModelCard dataModel={dataModel} key={dataModel.id} />
      ))}
    </FeaturedSection>
  );
}
